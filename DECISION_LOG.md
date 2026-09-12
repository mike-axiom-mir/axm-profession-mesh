# AXM Profession Mesh — Decision Log

Prefer append/supersede over silent rewrite.

## 2026-09-12 — Mesh boundary

**Decision:** Profession Mesh is transport/discovery infrastructure. It does not define or promote professional truth.

**Consequence:** Transport authority is not profession authority.

## 2026-09-12 — Content-addressed identity

**Decision:** Transferred package artifacts are identified by cryptographic content digest in addition to package id/version.

**Consequence:** Mutable names cannot silently substitute different bytes.

## 2026-09-12 — Local acceptance

**Decision:** Remote updates are candidates. Receiving nodes retain explicit local accept/hold/reject/pin/rollback control.

**Consequence:** There is no network-level newest-wins or popularity-wins rule.

## 2026-09-12 — Proposal-back

**Decision:** Local discoveries can be transported upstream only as explicit proposals/evidence packets.

**Consequence:** Experience does not silently mutate profession canon.

## 2026-09-12 — Offline validity

**Decision:** Mesh connectivity is optional. Professional Packages must remain usable from local verified copies when their own runtime dependencies allow it.

**Consequence:** Mesh outage or refusal cannot become mandatory centralized control.
