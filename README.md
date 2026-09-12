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

## Current milestone

**Transport Contract v0.1** — establish verifiable envelopes, node advertisements, capability requests, proposal-back packets, and deterministic validation before implementing live peer discovery or transfer protocols.

## Non-claims

This repository does not yet implement a global P2P network, public trust network, package marketplace, or autonomous update system. It defines the boundaries those systems must preserve first.
