# Project Folder Restructuring Plan

## Current State Analysis

The `project` folder currently serves multiple purposes that don't align well with the new factory-based DI architecture:

### Current Structure:
```
project/
├── interfaces/          # Mostly deprecated interfaces
├── migration/          # Temporary migration utilities  
├── provider/           # Configuration providers
├── services/           # Project-level services
├── setup/              # Setup functions (used by factory)
├── start/              # Deprecated global singleton
├── types.ts            # Types file
└── validation/         # Validation utilities
```

## 🎯 Proposed Restructuring

### Option 1: Rename to `setup` (Recommended)

```
setup/
├── core/                    # Core setup functions (renamed from current setup/)
│   ├── setup-managers.ts
│   ├── setup-base-input-classes.ts
│   ├── setup-base-input-configurations.ts
│   └── setup-helpers.ts    # Factory helpers
├── services/               # Keep as-is - project-level services
├── providers/              # Renamed from provider/
├── validation/             # Keep validation utilities
├── deprecated/             # Temporary folder for deprecated items
│   ├── app-lifecycle-instances.ts
│   └── i-app-lifecycle-instances.ts
└── migration/              # Temporary - remove after migration period
```

### Option 2: Distribute to Core Areas

```
core/
├── setup/                  # Move setup functions here
└── services/              # Move project services to core services

configuration/             # New top-level folder
├── providers/
└── validation/

deprecated/                # Temporary folder
├── app-lifecycle-instances.ts
└── migration/
```

### Option 3: Rename to `configuration`

```
configuration/
├── setup/                 # Setup and factory helpers
├── services/             # Configuration-related services  
├── providers/            # Configuration providers
├── validation/           # Validation setup
└── deprecated/           # Deprecated items
```

## 🔍 Analysis by Folder

### `setup/` - **KEEP & ENHANCE** ✅
- **Purpose**: Core setup functions used by ServiceManagerFactory
- **Status**: Essential to new architecture
- **Action**: Keep, possibly rename to `core/` within setup

### `services/` - **KEEP** ✅  
- **Purpose**: Project-level services (FieldDescriptor, ValidationStrategy, etc.)
- **Status**: Valuable utilities independent of DI pattern
- **Action**: Keep as-is, these are legitimate project services

### `provider/` - **KEEP** ✅
- **Purpose**: Configuration providers (InputConfigProvider, etc.)
- **Status**: Useful configuration utilities
- **Action**: Keep, possibly rename to `providers/`

### `validation/` - **KEEP** ✅
- **Purpose**: Validation utilities and setup
- **Status**: Core functionality
- **Action**: Keep as-is

### `start/` - **DEPRECATE** ⚠️
- **Purpose**: Contains deprecated `app-lifecycle-instances.ts`
- **Status**: Deprecated global singleton approach
- **Action**: Move to deprecated folder, plan for removal

### `interfaces/` - **MOSTLY DEPRECATE** ⚠️
- **Purpose**: Contains `i-app-lifecycle-instances.ts` (deprecated)
- **Status**: Mostly deprecated interfaces
- **Action**: Keep only non-deprecated interfaces, move others

### `migration/` - **TEMPORARY** ⏰
- **Purpose**: Migration utilities for transition period
- **Status**: Temporary assistance
- **Action**: Remove after migration period (6-12 months)

## 📋 Recommended Action Plan

### Phase 1: Immediate Restructuring
1. Rename `project/` → `setup/`
2. Create `setup/deprecated/` folder
3. Move deprecated files to deprecated folder
4. Update all import paths
5. Update documentation

### Phase 2: Reorganization (1-2 weeks later)
1. Reorganize internal structure
2. Rename `provider/` → `providers/` 
3. Consider moving some items to `core/`

### Phase 3: Cleanup (After migration period)
1. Remove `deprecated/` folder
2. Remove `migration/` utilities
3. Final cleanup and documentation update

## 🎯 Final Recommended Structure

```
setup/                      # Renamed from project/
├── core/                   # Core setup functions
│   ├── setup-managers.ts
│   ├── setup-base-input-classes.ts
│   ├── setup-base-input-configurations.ts
│   └── setup-helpers.ts
├── services/               # Project-level services
│   ├── field-descriptor-service.ts
│   ├── validation-strategy-service.ts
│   └── ...
├── providers/              # Configuration providers  
│   └── configuration/
├── validation/             # Validation utilities
├── deprecated/             # Temporary deprecated items
│   ├── app-lifecycle-instances.ts
│   └── i-app-lifecycle-instances.ts
└── migration/              # Temporary migration utilities
    └── migration-helpers.ts
```

This structure:
- ✅ Reflects the new factory-based architecture
- ✅ Clearly separates deprecated from current code
- ✅ Maintains logical grouping of related functionality
- ✅ Provides clear migration path
- ✅ Follows the principle of least surprise for consumers
