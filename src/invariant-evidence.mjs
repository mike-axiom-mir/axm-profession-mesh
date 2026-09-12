import { sha256Bytes } from './content-address.mjs';

export const INVARIANT_PACKET_SCHEMA = 'axm.invariant-lab.counterexample/v0.1';
export const EVIDENCE_AUTHORITY_BOUNDARY = 'evidence-only-no-mesh-or-profession-authority';

const TOP_LEVEL_KEYS = [
  'authority', 'bound', 'claim', 'invariant', 'limitations', 'model', 'schema', 'status', 'trace'
];
const AUTHORITY_KEYS = ['canon', 'execution', 'merge', 'promotion'];
const TRACE_KEYS = ['after', 'before', 'transition'];

function requireExactKeys(value, expected, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError(`${label} must be an object`);
  }
  const actual = Object.keys(value).sort();
  const wanted = [...expected].sort();
  if (actual.length !== wanted.length || actual.some((key, index) => key !== wanted[index])) {
    throw new TypeError(`${label} contains unsupported or missing fields`);
  }
}

function requireNonEmptyString(value, label) {
  if (typeof value !== 'string' || value.length === 0) {
    throw new TypeError(`${label} must be a non-empty string`);
  }
}

export function consumeInvariantEvidence(rawBytes, { expectedSha256 } = {}) {
  const bytes = Buffer.isBuffer(rawBytes) ? rawBytes : Buffer.from(rawBytes);
  if (typeof expectedSha256 !== 'string' || !/^[0-9a-f]{64}$/.test(expectedSha256)) {
    throw new TypeError('expectedSha256 must be a lowercase sha256 hex digest');
  }

  const packetSha256 = sha256Bytes(bytes);
  if (packetSha256 !== expectedSha256) {
    throw new Error('invariant evidence content digest mismatch');
  }

  let packet;
  try {
    packet = JSON.parse(bytes.toString('utf8'));
  } catch (error) {
    throw new TypeError(`invalid invariant evidence JSON: ${error.message}`);
  }

  requireExactKeys(packet, TOP_LEVEL_KEYS, 'packet');
  if (packet.schema !== INVARIANT_PACKET_SCHEMA) {
    throw new TypeError('unsupported invariant evidence schema');
  }
  requireNonEmptyString(packet.model, 'model');
  requireNonEmptyString(packet.claim, 'claim');
  requireNonEmptyString(packet.invariant, 'invariant');
  if (!Number.isInteger(packet.bound) || packet.bound < 0) {
    throw new TypeError('bound must be a non-negative integer');
  }
  if (!['FAIL', 'HOLD'].includes(packet.status)) {
    throw new TypeError('status must remain FAIL or HOLD');
  }
  if (!Array.isArray(packet.limitations) || packet.limitations.some(item => typeof item !== 'string')) {
    throw new TypeError('limitations must be an array of strings');
  }
  if (!Array.isArray(packet.trace)) {
    throw new TypeError('trace must be an array');
  }
  for (const [index, step] of packet.trace.entries()) {
    requireExactKeys(step, TRACE_KEYS, `trace[${index}]`);
    if (typeof step.transition !== 'string') {
      throw new TypeError(`trace[${index}].transition must be a string`);
    }
    for (const field of ['before', 'after']) {
      if (!step[field] || typeof step[field] !== 'object' || Array.isArray(step[field])) {
        throw new TypeError(`trace[${index}].${field} must be an object`);
      }
    }
  }

  requireExactKeys(packet.authority, AUTHORITY_KEYS, 'authority');
  for (const key of AUTHORITY_KEYS) {
    if (packet.authority[key] !== false) {
      throw new TypeError(`authority.${key} must remain false`);
    }
  }

  const candidateDisposition = packet.status === 'FAIL' ? 'quarantine' : 'hold';
  return {
    schema: 'axm.profession-mesh.invariant-evidence/v0.1',
    sourceSchema: packet.schema,
    sourceStatus: packet.status,
    model: packet.model,
    invariant: packet.invariant,
    claim: packet.claim,
    bound: packet.bound,
    traceLength: packet.trace.length,
    limitations: [...packet.limitations],
    packetSha256,
    candidateDisposition,
    mayAcceptCandidate: false,
    authorityBoundary: EVIDENCE_AUTHORITY_BOUNDARY,
    truthBoundary: 'The source FAIL/HOLD status is preserved verbatim. Mesh disposition is local evidence policy only; this result cannot establish profession truth, accept a package, apply a proposal, or grant authority.'
  };
}
