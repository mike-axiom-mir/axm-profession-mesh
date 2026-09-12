import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sha256Bytes, sha256CanonicalJson } from '../src/content-address.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const required = [
  'schemas/package-envelope.schema.json',
  'schemas/node-advertisement.schema.json',
  'schemas/capability-request.schema.json',
  'schemas/proposal-envelope.schema.json'
];

for (const file of required) {
  const schema = read(file);
  assert.equal(schema.$schema, 'https://json-schema.org/draft/2020-12/schema');
  assert.equal(schema.type, 'object');
}

const bytes = Buffer.from('profession-package-test','utf8');
assert.equal(sha256Bytes(bytes).length, 64);
assert.equal(sha256Bytes(bytes), sha256Bytes(Buffer.from('profession-package-test','utf8')));
assert.notEqual(sha256Bytes(bytes), sha256Bytes(Buffer.from('profession-package-test-2','utf8')));

const a = { b: 2, a: 1, nested: { z: true, a: false } };
const b = { nested: { a: false, z: true }, a: 1, b: 2 };
assert.equal(sha256CanonicalJson(a), sha256CanonicalJson(b));

const envelopeSchema = read('schemas/package-envelope.schema.json');
assert.equal(envelopeSchema.properties.authority_boundary.const, 'transport-does-not-grant-profession-authority');
const proposalSchema = read('schemas/proposal-envelope.schema.json');
assert.equal(proposalSchema.properties.authority_boundary.const, 'proposal-only-no-auto-apply');

console.log('Profession Mesh foundation PASS: transport objects and content-address primitives preserve authority boundary.');
