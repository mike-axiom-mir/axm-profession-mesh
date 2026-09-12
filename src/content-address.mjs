import { createHash } from 'node:crypto';

export function sha256Bytes(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

export function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export function sha256CanonicalJson(value) {
  return sha256Bytes(Buffer.from(canonicalJson(value), 'utf8'));
}
