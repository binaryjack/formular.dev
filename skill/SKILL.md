---
name: formular-dev
description: Modern framework-agnostic form and schema validation builder library.
---
<?xml version="1.0" encoding="UTF-8"?>
<codernic_skill id="formular-dev" kind="library" package="@binaryjack/formular.dev" version="2.4.0">
  <mental_model>
    @binaryjack/formular.dev is a sovereign Codernic form framework-agnostic builder,
    featuring fluent schema validation, configurable components, and reactive notification state.
  </mental_model>

  <sdk_surface>
    <typescript>
      <module name="@binaryjack/formular.dev">
        <export symbol="f" kind="const" description="Fluent schema builder" />
        <export symbol="Formular" kind="class" description="Formular form builder core instance" />
        <export symbol="ValidationManager" kind="class" description="Form validation manager" />
        <export symbol="NotificationManager" kind="class" description="Notification and event manager" />
        <export symbol="StyleManager" kind="class" description="Dynamic style manager" />
        <export symbol="ConfigurationManager" kind="class" description="Configuration manager" />
      </module>
    </typescript>
  </sdk_surface>

  <invariants>
    <invariant id="INV-001">Strict wire envelope: all CLI --json commands output SdkEnvelope with namespace '@binaryjack/formular.dev'.</invariant>
    <invariant id="INV-002">Pirsig complexity: max 200 lines per file, max 40 lines per function, zero warnings.</invariant>
    <invariant id="INV-003">Zero vaporware: absolute production readiness and zero stubs.</invariant>
    <invariant id="INV-004">Zero MCP: all operations operate via native CLI --json or typed SDK envelopes.</invariant>
  </invariants>

  <verification>
    <step name="build">pnpm run build</step>
    <step name="skill-verify">coc-pm skill verify skill/SKILL.md --json</step>
  </verification>
</codernic_skill>
