# Archive and Cleanup Script for formular.dev Restructuring

This script helps organize files and folders to be moved to R-D-Labs.

## Packages to Archive (Move to R-D-Labs)

The following items should be moved to the R-D-Labs repository:

### Packages
- `packages/web-components/`
- `packages/vendors/`
- `packages/formular.dev.web/` (if exists)
- `packages/kompartido/` (if exists)
- `packages/shared-assets/`

### Documentation & Development Files
- `brainstorming/`
- `copilot-summaries/`
- `old-docs/`
- `docs/`

### Test/Experimental Files (root level)
- `test-atomic-alignment.js`
- `test-atomic-output.js`
- `test-bg-classes.js`
- `test-bg-classes.mjs`
- `test-color-class-alignment.js`
- `test-component-presets.js`
- `css-utilities-needed.css`

## Manual Steps Required

**IMPORTANT:** Before deleting anything, ensure all files are safely committed to git and/or copied to R-D-Labs.

### Option 1: Create Archive Directory (Safest)

```powershell
# Create archive directory
New-Item -ItemType Directory -Path ".\TO_MIGRATE_TO_R-D-LABS" -Force

# Move packages
Move-Item ".\packages\web-components" ".\TO_MIGRATE_TO_R-D-LABS\web-components"
Move-Item ".\packages\vendors" ".\TO_MIGRATE_TO_R-D-LABS\vendors"
Move-Item ".\packages\shared-assets" ".\TO_MIGRATE_TO_R-D-LABS\shared-assets"

# Check and move optional packages
if (Test-Path ".\packages\formular.dev.web") {
    Move-Item ".\packages\formular.dev.web" ".\TO_MIGRATE_TO_R-D-LABS\formular.dev.web"
}
if (Test-Path ".\packages\kompartido") {
    Move-Item ".\packages\kompartido" ".\TO_MIGRATE_TO_R-D-LABS\kompartido"
}

# Move documentation
Move-Item ".\brainstorming" ".\TO_MIGRATE_TO_R-D-LABS\brainstorming"
Move-Item ".\copilot-summaries" ".\TO_MIGRATE_TO_R-D-LABS\copilot-summaries"
Move-Item ".\old-docs" ".\TO_MIGRATE_TO_R-D-LABS\old-docs"
Move-Item ".\docs" ".\TO_MIGRATE_TO_R-D-LABS\docs"

# Move test files
Move-Item ".\test-*.js" ".\TO_MIGRATE_TO_R-D-LABS\"
Move-Item ".\test-*.mjs" ".\TO_MIGRATE_TO_R-D-LABS\"
Move-Item ".\css-utilities-needed.css" ".\TO_MIGRATE_TO_R-D-LABS\"
```

### Option 2: Direct Git Operations (Advanced)

If you want to preserve git history, use git filter-branch or subtree:

```powershell
# Example for preserving history of web-components
git subtree split --prefix=packages/web-components -b web-components-history

# Then in R-D-Labs repo, you can:
# git subtree add --prefix=packages/formular/web-components <formular.dev-repo-url> web-components-history
```

## Verification Steps

After archiving:

1. Verify only lib and design-system remain:
   ```powershell
   Get-ChildItem .\packages\
   # Should only show: lib, design-system
   ```

2. Test build:
   ```powershell
   pnpm install
   pnpm build
   ```

3. Test lib development:
   ```powershell
   pnpm dev:lib
   ```

## Next Steps

1. Copy the archived content to R-D-Labs repository
2. Update dependencies in R-D-Labs packages
3. Test builds in R-D-Labs
4. Delete the `TO_MIGRATE_TO_R-D-LABS` folder once migration is confirmed
5. Update formular.dev README.md
