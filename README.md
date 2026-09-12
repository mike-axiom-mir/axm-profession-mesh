# AXM Profession Mesh

AXM Profession Mesh is the transport, discovery, verification, caching, and synchronization layer for Professional Packages produced and registered by **AXM Profession Fabric**.

> **Transport authority is not profession authority.**

The Mesh may discover, verify, move, cache, mirror, negotiate, and propose changes to Professional Packages. It may not silently define a profession, promote a package to canon, overwrite local professional truth, or convert popularity into authority.

## Boundary

```text
PROFESSION FABRIC
  defines + validates + versions + registers Professional Packages
        |
        v
PROFESSION MESH
  discovers + verifies + transfers + caches + negotiates + proposes
        |
        v
CONSUMERS
  humans / AI models / Walmi / machine intelligences / software / deterministic flows / institutions
```

The Fabric registry answers: **what exists, what version, what does it export, what evidence backs it?**

The Mesh answers: **where can I get it, is it byte-identical to what was advertised, can I use it, how do I update or roll it back, and how do I propose improvements back?**

## Founding rules

- Content is addressed by cryptographic digest, not by mutable name alone.
- A remote package is untrusted until locally verified.
- Verification of bytes is not verification of professional competence.
- Mesh popularity, node count, download count, or publisher reputation cannot promote professional status by themselves.
- A node may pin, reject, quarantine, or roll back packages locally.
- Remote changes arrive as candidates/proposals, never silent canon rewrites.
- Private project state is not required for public Professional Package distribution.
- Partial capability requests are allowed only through declared package exports.
- Offline/local operation remains valid; the Mesh is an optional distribution layer, not a runtime dependency.

## Invariant Lab evidence consumer v0.2

The Mesh now has one deliberately narrow cross-repository evidence input: the exact `axm.invariant-lab.counterexample/v0.1` FAIL/HOLD packet produced by **AXM Invariant Lab**.

`src/invariant-evidence.mjs` consumes content-addressed packet bytes and preserves the producer result verbatim:

- `FAIL` remains `FAIL` and gives the receiving Mesh policy a `quarantine` disposition;
- `HOLD` remains `HOLD` and gives the receiving Mesh policy a `hold` disposition;
- neither result can return candidate acceptance;
- every packet authority field must remain `false`;
- unsupported fields/statuses and digest mismatch fail closed.

The local `quarantine` / `hold` value is a **Mesh receiving policy**, not a rewrite of the producer result and not a declaration that a profession is correct or incorrect. The packet cannot auto-accept a package, apply a proposal, create profession status, merge, promote, execute, or declare CANON.

`INVARIANT_LAB_CONSUMER.json` pins the exact producer commit, packet Git blob, schema Git blob, and packet SHA-256 used by the retained consumer fixture. This is real cross-repo evidence use but remains bounded to that declared packet contract.

## Current milestone

**Transport Contract v0.1 + bounded invariant evidence intake v0.2** — establish verifiable envelopes, node advertisements, capability requests, proposal-back packets, deterministic validation, and one evidence-only cross-repo admission signal before implementing live peer discovery or transfer protocols.

## Non-claims

This repository does not yet implement a global P2P network, public trust network, package marketplace, or autonomous update system. It defines the boundaries those systems must preserve first.
