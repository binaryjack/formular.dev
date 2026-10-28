---
name: pirsig-audit
description: Audit source files against Pirsig AST invariants and 1:1 Isometric Spec Fidelity under COE v4.
---
<?xml version="1.0" encoding="UTF-8"?>
<codernic_skill id="pirsig-audit" kind="workflow" version="0.1.0">
  <mental_model>
    Operational workflow for auditing source files against Codernic Pirsig sovereign AST
    quality invariants: line count bounds, zero-stub policy, strict typing, and zero warnings.
  </mental_model>
  <workflow>
    <step order="1" name="Structural Bounds Audit">
      <action>Verify line count limits: max 200 lines per file (target &lt;= 190) and max 40 lines per function (target &lt;= 38).</action>
      <command>codernic-pirsig-audit --path &lt;path&gt; --json</command>
    </step>
    <step order="2" name="Isometric Spec Fidelity Audit">
      <action>Confirm 1:1 REQ-* bijection, file-set equality, and nomenclature fidelity against specs.</action>
      <command>codernic-pirsig-audit --isometric --json</command>
    </step>
    <step order="3" name="Anti-Vaporware and De-stubbing Scan">
      <action>Verify zero todo!(), unimplemented!(), any, or mock responses.</action>
      <command>codernic-pirsig-audit --stubs --json</command>
    </step>
    <step order="4" name="Zero-Warning Compilation Gate">
      <action>Execute build compiler pass with zero warning tolerance.</action>
      <command>pnpm run build</command>
    </step>
  </workflow>
  <invariants>
    <invariant id="INV-PIRSIG-BOUNDS">Max 200 lines per file, max 40 lines per function.</invariant>
    <invariant id="INV-ZERO-STUB">Absolute ban on todo!(), unimplemented!(), any, or mock responses.</invariant>
    <invariant id="INV-ZERO-WARNINGS">Zero compiler and linter warnings.</invariant>
    <invariant id="INV-ZERO-MCP">Zero MCP calls; invoke native CLI tools with --json output only.</invariant>
  </invariants>
  <verification>
    <step name="build">pnpm run build</step>
    <step name="skill-verify">coc-pm skill verify .agents/skills/pirsig-audit/SKILL.md --json</step>
  </verification>
</codernic_skill>
