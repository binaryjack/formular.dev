# Post-Restructuring Checklist

Use this checklist to complete the repository restructuring process.

## ✅ Completed Steps

- [x] Updated `package.json` to focus on lib and design-system
- [x] Updated `pnpm-workspace.yaml` to include only core packages
- [x] Created new focused `README.md`
- [x] Created `MIGRATION_TO_R-D-LABS.md` migration guide
- [x] Created `ARCHIVE_AND_CLEANUP.md` cleanup scripts
- [x] Updated VS Code `tasks.json`
- [x] Verified pnpm install works with new configuration

## 📋 Manual Steps Required

### Phase 1: Archive Non-Core Packages

- [ ] **Create archive folder**
  ```powershell
  New-Item -ItemType Directory -Path ".\TO_MIGRATE_TO_R-D-LABS" -Force
  ```

- [ ] **Move packages to archive**
  ```powershell
  # See ARCHIVE_AND_CLEANUP.md for full script
  Move-Item ".\packages\web-components" ".\TO_MIGRATE_TO_R-D-LABS\web-components"
  Move-Item ".\packages\vendors" ".\TO_MIGRATE_TO_R-D-LABS\vendors"
  Move-Item ".\packages\shared-assets" ".\TO_MIGRATE_TO_R-D-LABS\shared-assets"
  # ... etc
  ```

- [ ] **Move documentation folders**
  ```powershell
  Move-Item ".\brainstorming" ".\TO_MIGRATE_TO_R-D-LABS\brainstorming"
  Move-Item ".\copilot-summaries" ".\TO_MIGRATE_TO_R-D-LABS\copilot-summaries"
  Move-Item ".\old-docs" ".\TO_MIGRATE_TO_R-D-LABS\old-docs"
  Move-Item ".\docs" ".\TO_MIGRATE_TO_R-D-LABS\docs"
  ```

- [ ] **Move test files**
  ```powershell
  Move-Item ".\test-*.js" ".\TO_MIGRATE_TO_R-D-LABS\"
  Move-Item ".\test-*.mjs" ".\TO_MIGRATE_TO_R-D-LABS\"
  Move-Item ".\css-utilities-needed.css" ".\TO_MIGRATE_TO_R-D-LABS\"
  ```

- [ ] **Verify packages directory**
  ```powershell
  Get-ChildItem .\packages\
  # Should only show: lib, design-system
  ```

### Phase 2: Set Up R-D-Labs Repository

- [ ] **Clone R-D-Labs repository**
  ```bash
  git clone https://github.com/binaryjack/R-D-Labs
  cd R-D-Labs
  ```

- [ ] **Create formular directory structure**
  ```powershell
  New-Item -ItemType Directory -Path "packages\formular" -Force
  New-Item -ItemType Directory -Path "docs\formular" -Force
  ```

- [ ] **Update R-D-Labs pnpm-workspace.yaml**
  Add formular packages to workspace configuration

### Phase 3: Migrate Content

- [ ] **Copy packages from archive to R-D-Labs**
  ```powershell
  # Copy web-components
  Copy-Item -Path "e:\Sources\SignalsPatternsReact\TO_MIGRATE_TO_R-D-LABS\web-components" `
            -Destination "path\to\R-D-Labs\packages\formular\web-components" -Recurse
  
  # Repeat for other packages...
  ```

- [ ] **Copy documentation**
  ```powershell
  Copy-Item -Path "e:\Sources\SignalsPatternsReact\TO_MIGRATE_TO_R-D-LABS\docs" `
            -Destination "path\to\R-D-Labs\docs\formular\" -Recurse
  ```

- [ ] **Update package.json files in migrated packages**
  - Update dependencies to reference formular.dev.lib from npm (once published)
  - Or use workspace protocol if keeping formular in R-D-Labs
  - Update package names if needed

### Phase 4: Verify and Test

- [ ] **Test formular.dev repository**
  ```powershell
  cd e:\Sources\SignalsPatternsReact
  pnpm install
  pnpm build
  pnpm test
  ```

- [ ] **Test R-D-Labs repository**
  ```bash
  cd path/to/R-D-Labs
  pnpm install
  pnpm build
  # Test individual packages
  ```

- [ ] **Verify all builds pass**
- [ ] **Verify tests run successfully**
- [ ] **Check for broken imports or references**

### Phase 5: Git Operations

- [ ] **Commit changes in formular.dev**
  ```bash
  cd e:\Sources\SignalsPatternsReact
  git add .
  git commit -m "chore: restructure repository to focus on core library
  
  - Updated package.json and pnpm-workspace.yaml
  - Created migration documentation
  - Updated README to reflect lib-only focus
  - Moved framework integrations to R-D-Labs
  
  See MIGRATION_TO_R-D-LABS.md for details"
  git push origin main
  ```

- [ ] **Commit changes in R-D-Labs**
  ```bash
  cd path/to/R-D-Labs
  git add .
  git commit -m "feat: add formular framework integrations and experiments
  
  - Added formular web-components
  - Added formular vendor integrations (React, Vue, etc.)
  - Added formular documentation and examples
  
  Migrated from formular.dev repository"
  git push origin main
  ```

### Phase 6: Cleanup

- [ ] **Remove archive folder**
  ```powershell
  cd e:\Sources\SignalsPatternsReact
  Remove-Item -Path ".\TO_MIGRATE_TO_R-D-LABS" -Recurse -Force
  ```

- [ ] **Remove old README backup**
  ```powershell
  Remove-Item -Path ".\README_OLD.md" -Force
  ```

- [ ] **Optional: Remove migration docs (or keep for reference)**
  ```powershell
  # Keep these files for historical reference, or remove:
  # Remove-Item ".\MIGRATION_TO_R-D-LABS.md"
  # Remove-Item ".\ARCHIVE_AND_CLEANUP.md"
  # Remove-Item ".\RESTRUCTURING_SUMMARY.md"
  # Remove-Item ".\POST_RESTRUCTURING_CHECKLIST.md"
  ```

### Phase 7: Update References

- [ ] **Update formular.dev GitHub repository description**
  - Change to: "Framework-agnostic form management library with comprehensive validation and IoC architecture"

- [ ] **Update R-D-Labs repository description**
  - Add: "R&D Labs - Experimental projects including formular framework integrations"

- [ ] **Create/update README in R-D-Labs**
  - Document the formular packages
  - Link back to formular.dev for core library

- [ ] **Update any external links or documentation**
  - Website links
  - Blog posts
  - Social media profiles

### Phase 8: Continuous Integration

- [ ] **Update CI/CD pipelines in formular.dev**
  - Remove references to non-existent packages
  - Update build scripts

- [ ] **Set up CI/CD in R-D-Labs** (if needed)
  - Configure builds for formular packages
  - Set up tests

## 🎯 Final Verification

- [ ] **formular.dev builds successfully**
- [ ] **formular.dev tests pass**
- [ ] **R-D-Labs builds successfully**
- [ ] **All documentation is updated**
- [ ] **Git repositories are clean**
- [ ] **No broken links between repositories**

## 📝 Notes

- Keep migration documentation (MIGRATION_TO_R-D-LABS.md) for reference
- Consider creating a CHANGELOG entry for this major restructuring
- Update any documentation that references the old monorepo structure
- Notify contributors of the new repository structure

---

**Status**: Ready to begin Phase 1 - Archive Non-Core Packages
