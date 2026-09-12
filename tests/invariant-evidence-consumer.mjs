import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { consumeInvariantEvidence, EVIDENCE_AUTHORITY_BOUNDARY } from '../src/invariant-evidence.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'INVARIANT_LAB_CONSUMER.json'), 'utf8'));
const fixture = fs.readFileSync(path.join(root, 'fixtures/invariant-lab-counterexample-v0.1.json'));
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');

assert.equal(manifest.producerRepo, 'mike-axiom-mir/axm-invariant-lab');
assert.equal(manifest.packetBlob, '02eeddfd12351ff6b7647bc412db3695ee45e5b3');
assert.equal(manifest.schemaBlob, 'cc9f1fde4855a56557ad6338c7595a99fc71cb21');
assert.equal(sha256(fixture), manifest.packetSha256);

const consumed = consumeInvariantEvidence(fixture, { expectedSha256: manifest.packetSha256 });
assert.equal(consumed.sourceStatus, 'FAIL');
assert.equal(consumed.candidateDisposition, 'quarantine');
assert.equal(consumed.mayAcceptCandidate, false);
assert.equal(consumed.authorityBoundary, EVIDENCE_AUTHORITY_BOUNDARY);
assert.equal(consumed.packetSha256, manifest.packetSha256);
assert.equal(consumed.invariant, 'INV-01-no-silent-authority-escalation');

const holdPacket = JSON.parse(fixture.toString('utf8'));
holdPacket.status = 'HOLD';
holdPacket.trace = [];
const holdBytes = Buffer.from(`${JSON.stringify(holdPacket)}\n`, 'utf8');
const held = consumeInvariantEvidence(holdBytes, { expectedSha256: sha256(holdBytes) });
assert.equal(held.sourceStatus, 'HOLD');
assert.equal(held.candidateDisposition, 'hold');
assert.equal(held.mayAcceptCandidate, false);

const escalated = JSON.parse(fixture.toString('utf8'));
escalated.authority.execution = true;
const escalatedBytes = Buffer.from(`${JSON.stringify(escalated)}\n`, 'utf8');
assert.throws(
  () => consumeInvariantEvidence(escalatedBytes, { expectedSha256: sha256(escalatedBytes) }),
  /authority.execution must remain false/
);

const promoted = JSON.parse(fixture.toString('utf8'));
promoted.status = 'PASS';
const promotedBytes = Buffer.from(`${JSON.stringify(promoted)}\n`, 'utf8');
assert.throws(
  () => consumeInvariantEvidence(promotedBytes, { expectedSha256: sha256(promotedBytes) }),
  /status must remain FAIL or HOLD/
);

const extra = JSON.parse(fixture.toString('utf8'));
extra.meshAuthority = true;
const extraBytes = Buffer.from(`${JSON.stringify(extra)}\n`, 'utf8');
assert.throws(
  () => consumeInvariantEvidence(extraBytes, { expectedSha256: sha256(extraBytes) }),
  /unsupported or missing fields/
);

assert.throws(
  () => consumeInvariantEvidence(fixture, { expectedSha256: '0'.repeat(64) }),
  /content digest mismatch/
);

console.log('Profession Mesh invariant evidence consumer PASS: FAIL/HOLD preserved, candidate acceptance forbidden, authority escalation rejected.');
