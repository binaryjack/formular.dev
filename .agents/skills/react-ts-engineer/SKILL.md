---
name: react-ts-engineer
description: React, TypeScript, Atomic Design, and Feature-Sliced Design standards and validation workflows.
---
<?xml version="1.0" encoding="UTF-8"?>
<codernic_skill id="react-ts-engineer" kind="workflow" version="0.1.0">
  <mental_model>
    Operational workflow for React and TypeScript development adhering to strict typing,
    Atomic Design principles, Feature-Sliced Design, and zero compiler warnings.
  </mental_model>
  <workflow>
    <step order="1" name="Strict TypeScript Validation">
      <action>Enforce strict TypeScript: zero any, explicit parameters, and exhaustive pattern matching.</action>
      <command>pnpm run build</command>
    </step>
    <step order="2" name="React Component Architecture">
      <action>Enforce component rules: never use React.FC, explicit props interface, direct props destructuring.</action>
      <command>pnpm test</command>
    </step>
  </workflow>
  <invariants>
    <invariant id="INV-STRICT-TS">Zero any types, zero untyped stubs, explicit return types.</invariant>
    <invariant id="INV-REACT-RULES">Never use React.FC; explicit interfaces for all component props.</invariant>
    <invariant id="INV-PIRSIG-BOUNDS">Max 200 lines per file, max 40 lines per function, zero warnings.</invariant>
    <invariant id="INV-ZERO-MCP">Zero MCP calls; invoke native CLI commands only.</invariant>
  </invariants>
  <verification>
    <step name="build">pnpm run build</step>
    <step name="skill-verify">coc-pm skill verify .agents/skills/react-ts-engineer/SKILL.md --json</step>
  </verification>
</codernic_skill>
