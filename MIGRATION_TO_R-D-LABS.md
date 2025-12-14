# Migration Guide: Moving Projects to R-D-Labs

This document outlines the packages and projects being moved from the formular.dev repository to the R-D-Labs repository.

## Date: December 14, 2025

## Overview
The formular.dev repository is being restructured to focus solely on the **formular.dev.lib** package (the core form management library) and its essential dependency **formular.design.system**. All experimental packages, vendor integrations, and web components are being moved to the R-D-Labs monorepo.

## Packages to Keep in formular.dev

### Core Library
- **packages/lib** - formular.dev.lib
  - The main form management library
  - Framework-agnostic core
  - Production-ready package

### Essential Dependency
- **packages/design-system** - formular.design.system
  - Design tokens and styling system
  - TailwindCSS-based design system
  - Required by formular.dev.lib

## Packages to Move to R-D-Labs

### Web Components (Experimental)
- **packages/web-components** - webcomponents.formular.dev
  - Vanilla Custom Elements implementation
  - Status: Experimental/Research
  - Move to: `packages/formular/web-components`

### Vendor Framework Integrations
- **packages/vendors/react/formular.components**
  - React-specific components
  - Move to: `packages/formular/vendors/react`

- **packages/vendors/angular/**
  - Angular-specific integrations
  - Move to: `packages/formular/vendors/angular`

- **packages/vendors/vue/**
  - Vue-specific integrations
  - Move to: `packages/formular/vendors/vue`

- **packages/vendors/svelte/**
  - Svelte-specific integrations
  - Move to: `packages/formular/vendors/svelte`

- **packages/vendors/solidjs/**
  - SolidJS-specific integrations
  - Move to: `packages/formular/vendors/solidjs`

- **packages/vendors/javascript/**
  - Vanilla JS integrations
  - Move to: `packages/formular/vendors/javascript`

### Other Projects
- **packages/formular.dev.web**
  - Documentation/demo website
  - Move to: `packages/formular/web`

- **packages/kompartido**
  - Shared utilities (if exists)
  - Move to: `packages/formular/shared` or evaluate if needed

- **packages/shared-assets**
  - Shared assets
  - Move to: `packages/formular/shared-assets`

### Documentation & Brainstorming
- **brainstorming/**
  - Move to: `docs/formular/brainstorming`

- **copilot-summaries/**
  - Move to: `docs/formular/copilot-summaries`

- **old-docs/**
  - Move to: `docs/formular/archive`

- **docs/**
  - Move to: `docs/formular/`

## Migration Steps for R-D-Labs

1. **Create formular directory structure** in R-D-Labs:
   ```
   R-D-Labs/
   ├── packages/
   │   └── formular/
   │       ├── web-components/
   │       ├── vendors/
   │       │   ├── react/
   │       │   ├── angular/
   │       │   ├── vue/
   │       │   ├── svelte/
   │       │   ├── solidjs/
   │       │   └── javascript/
   │       ├── web/
   │       ├── shared/
   │       └── shared-assets/
   └── docs/
       └── formular/
           ├── brainstorming/
           ├── copilot-summaries/
           └── archive/
   ```

2. **Copy packages** with git history (recommended):
   ```bash
   # From formular.dev repo, use git filter-branch or git subtree
   # to preserve history for each package
   ```

3. **Update package.json** in each moved package:
   - Update dependencies to reference formular.dev.lib from npm
   - Update design-system references if needed
   - Adjust workspace references for R-D-Labs structure

4. **Update pnpm-workspace.yaml** in R-D-Labs to include:
   ```yaml
   packages:
     - packages/formular/*
     - packages/formular/vendors/*
   ```

5. **Verify builds** after migration

## Files to Keep in formular.dev Root

Essential files:
- package.json (simplified)
- pnpm-workspace.yaml (simplified)
- tsconfig.base.json
- README.md (updated)
- LICENSE
- SECURITY.md
- CONTRIBUTING.md

## Files to Move to R-D-Labs

Test and development files:
- test-*.js files
- css-utilities-needed.css
- Other experimental scripts

## Dependencies to Update

After migration, packages in R-D-Labs should:
- Depend on published npm version of formular.dev.lib
- Depend on published npm version of formular.design.system
- Or use npm workspace protocol if both are in R-D-Labs

## Timeline

1. Create this migration guide ✅
2. Restructure formular.dev repository
3. Copy packages to R-D-Labs
4. Update cross-repository dependencies
5. Verify builds and tests
6. Archive old structure

## Notes

- Preserve git history where possible
- Update all documentation links
- Ensure CI/CD pipelines are updated
- Consider creating a formular-examples package in R-D-Labs for demos
