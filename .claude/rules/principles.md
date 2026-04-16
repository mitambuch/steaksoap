---
paths: ["**"]
---

# Core Principles (always loaded)

Four principles adapted from Andrej Karpathy's guidelines on LLM coding failures.
Apply every change. Benchmark: would an experienced engineer ship this?

## 1. Think Before Coding

Don't assume. Don't hide confusion. Surface tradeoffs.

- State your assumptions upfront before acting.
- If a request has multiple valid interpretations, present them — don't pick silently.
- If something is unclear, pause and ask one focused question.
- Better to spend 30 seconds clarifying than 30 minutes rebuilding.

## 2. Simplicity First

Minimum code that solves the problem. Nothing speculative.

- No unrequested features, no abstractions for single-use cases.
- No flexibility the spec doesn't require.
- No error handling for conditions that can't occur — only validate at system boundaries.
- If code could be half as long and still correct, rewrite it.

## 3. Surgical Changes

Touch only what you must. Clean up only your own mess.

- Don't refactor working code surrounding your change.
- Don't "improve" formatting or naming outside scope.
- Remove only imports/functions **your** changes made dead.
- Pre-existing dead code stays until someone asks to prune it.

## 4. Goal-Driven Execution

Define success criteria. Loop until verified.

- Transform vague requests into verifiable checks.
- State how you'll validate the change before making it.
- For complex work: outline the steps with a verification method per step.
- Don't declare done until the verification fires green.

## Applying to trivial tasks

Typos, variable renames, single-file comment adds: use judgment.
These principles are guardrails, not gates — proportional to the change's blast radius.

## Why this file exists

LLMs under context fatigue drift toward overengineering, assumption-making, and scope creep.
Loading these principles every task is the cheapest intervention that measurably reduces drift.
