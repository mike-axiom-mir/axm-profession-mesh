# Profession Mesh Architecture v0.1

## Responsibilities

The Mesh owns distribution mechanics only:

1. **Discovery** — locate nodes/packages/capabilities.
2. **Advertisement** — expose bounded metadata needed for discovery.
3. **Verification** — verify content digests, envelope structure, and declared compatibility metadata.
4. **Transfer** — move exact package bytes or declared package slices.
5. **Caching / mirroring** — retain verified artifacts without changing their identity.
6. **Version negotiation** — compare available versions/digests against local policy.
7. **Rollback support** — retain or recover previously accepted content-addressed versions.
8. **Proposal-back transport** — carry explicit improvement proposals and evidence references upstream.

## Explicit non-responsibilities

The Mesh does not own:

- professional body design;
- professional evidence standards;
- profession status promotion;
- institution governance;
- model selection;
- user product-state authority;
- global reputation truth;
- automatic canon.

## Core objects

### Package Envelope
Binds package identity/version to a content digest and declared exports. It does not contain professional truth by itself.

### Node Advertisement
Says what a node is willing to serve and which protocol/features it supports. It must not expose private local state by default.

### Capability Request
Requests one declared capability/export from one package/version constraint. The receiver may decline or answer from cache/local state.

### Proposal Envelope
Carries a bounded proposed change or evidence packet toward a package's upstream governance. It never applies itself.

## Update lifecycle

```text
ADVERTISE -> DISCOVER -> REQUEST -> TRANSFER -> VERIFY BYTES
    -> CHECK LOCAL POLICY -> CANDIDATE -> LOCAL ACCEPT / HOLD / REJECT
```

Professional/evidence verification may occur after byte verification and is a separate gate.

## Future transport adapters

Potential adapters may include LAN, direct P2P, relay-assisted P2P, removable/offline bundles, HTTPS mirrors, local filesystem, and institution-internal channels. Adapters must preserve the same envelopes and authority boundary.
