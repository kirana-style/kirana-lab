# Documentation

This project is the shadcn/ui component set rebuilt on StyleX, with a design
system layered on top that keeps Tailwind's vocabulary.

> **StyleX is the compiler, Panda is the inspiration for the API, and Tailwind is
> the vocabulary.**

## Read in this order

| Document                                             | What it answers                                                         |
| ---------------------------------------------------- | ----------------------------------------------------------------------- |
| [architecture.md](architecture.md)                   | How the system is layered, and _why_ each decision went that way        |
| [porting-from-tailwind.md](porting-from-tailwind.md) | The mental shift, the utility-by-utility mapping, and the pitfalls      |
| [catalogue.md](catalogue.md)                         | What already exists, and how to use it instead of rebuilding it         |
| [workflows.md](workflows.md)                         | Adding a component, removing one, verifying it, keeping these docs true |

Reference material, vendored from the StyleX project and kept as-is:

- [stylex-authoring.md](stylex-authoring.md) — the official authoring guide
- [stylex-installation.md](stylex-installation.md) — the official setup guide

## The one rule about these docs

**They are part of the deliverable, not a report on it.** A change that adds a
token, a recipe, a marker, or a pattern is not finished until the relevant
document and the skill at `.agents/skills/stylex-design-system/` say so.

The point is that the next person — or the next agent — can extend this system
instead of inventing a second one beside it. Every time someone re-derives a
pattern that already exists, the codebase grows a second way of doing the same
thing, and the two drift.

None of this is settled. If you find a better pattern, change it _and_ change the
docs, and say what it replaces.
