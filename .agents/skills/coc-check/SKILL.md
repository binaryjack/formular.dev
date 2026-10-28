---
name: coc-check
description: Inspect and verify Codernic Managed Package (COC) dependencies, registry health, and standalone fallback.
---
<?xml version="1.0" encoding="UTF-8"?>
<codernic_skill id="coc-check" kind="workflow" version="0.1.0">
  <mental_model>
    Operational workflow for verifying Codernic Managed Package (COC) dependencies, boundary
    integrity, BLAKE3 checksums, and standalone package manager fallback.
  </mental_model>
  <workflow>
    <step order="1" name="Package Integrity Validation">
      <action>Validate installed packages against cryptographic hashes using coc-pm CLI.</action>
      <command>coc-pm verify --json</command>
    </step>
    <step order="2" name="System Health Check">
      <action>Run system health check across local managed dependencies.</action>
      <command>coc-pm health --json</command>
    </step>
    <step order="3" name="Package Boundary Inspection">
      <action>Inspect package boundaries in .codernic/packages/@codernic/* and ensure upstream source edits only.</action>
      <command>coc-pm check-boundaries --json</command>
    </step>
    <step order="4" name="Standalone Fallback Verification">
      <action>When COC environment is absent, confirm standalone tooling operates cleanly without failure.</action>
      <command>pnpm run build</command>
    </step>
  </workflow>
  <invariants>
    <invariant id="INV-ZERO-MCP">Zero MCP calls; invoke coc-pm CLI with --json output only.</invariant>
    <invariant id="INV-UPSTREAM-BOUND">Never mutate .codernic/packages/ directly; modify upstream source repositories.</invariant>
  </invariants>
  <verification>
    <step name="build">pnpm run build</step>
    <step name="skill-verify">coc-pm skill verify .agents/skills/coc-check/SKILL.md --json</step>
  </verification>
</codernic_skill>
