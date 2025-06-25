# Refactoring Status: Conventions → ConfigurationManager

**Date:** December 25, 2025  
**Project:** formular.dev  
**Package:** lib

## 📋 Executive Summary

This document reports on the ongoing refactoring from the legacy `conventions` static object to the new `ConfigurationManager` system. The refactoring aims to replace hardcoded configuration values with a dynamic, configurable system that supports multiple environments, cultures, and validation patterns.

## 🎯 Migration Progress Overview

### ✅ **COMPLETED:**

- ConfigurationManager infrastructure is fully implemented
- BaseInput has been partially migrated to use ConfigurationManager
- Input builder services are using ConfigurationManager through InputConfigProvider
- Default configuration structure is defined with comprehensive schemas

### 🔄 **PARTIALLY COMPLETED:**

- BaseInput migration (50% complete)
- Event handling systems (mixed state)

### ❌ **PENDING:**

- Complete elimination of conventions imports
- Validation system migration
- Value manager migration
- Event handler migration

---

## 📊 Detailed Analysis

### **1. ConfigurationManager Implementation Status** ✅ COMPLETE

**Location:** `packages/lib/src/core/managers/configuration-manager/`

**Implemented Features:**

- ✅ Complete interface definitions (`IConfigurationManager`, `IConfiguration`)
- ✅ Prototype-based class implementation
- ✅ JSON schema validation system
- ✅ Default configuration with comprehensive settings
- ✅ Culture and localization support
- ✅ Validation pattern management
- ✅ Event trigger configuration
- ✅ Environment-specific configurations

**Key Files:**

- `configuration-manager.ts` - Main implementation
- `interfaces/i-configuration-manager.ts` - Core interface
- `default/default-configuration.ts` - Default config values
- `schemas/` - JSON validation schemas

### **2. BaseInput Integration** 🔄 PARTIAL (50%)

**Location:** `packages/lib/src/core/input-engine/core/input-base/`

**✅ Completed Migration:**

```typescript
// File: input-base.ts (lines 80-90)
const config = this.serviceManager?.lazy<IConfigurationManager>(SConfigurationManager)?.()
this.inputDelay = config?.getConfigByName<number>('input', 'delay') ?? 100
this.validationDelay = config?.getConfigByName<number>('validations', 'triggerDelay') ?? 100
this.onUiUpdateDelay = config?.getConfigByName<number>('behavior', 'events', 'onUiUpdate') ?? 100
this.labelId = config?.getConfigByName<string>('rendering', 'suffixes', 'labelId') ?? ''
this.describedById = config?.getConfigByName<string>('rendering', 'suffixes', 'describedById') ?? ''
```

**❌ Still Using Conventions:**

- `shared/validation-notifications.ts` (line 46): `conventions.events.onUiUpdate.triggerDelay`

### **3. Input Builder Services** ✅ COMPLETE

**Location:** `packages/lib/src/core/factories/input-builder-services/`

**Migration Status:**

- ✅ All input services use `IInputConfigProvider`
- ✅ Configuration accessed through service manager
- ✅ Proper dependency injection implemented

**Files Successfully Migrated:**

- `base-input-service.ts`
- `text-input-service.ts`
- `masked-input-service.ts`
- `click-input-service.ts`
- `radio-input-service.ts`
- `select-input-service.ts`
- `check-input-service.ts`
- `option-input-service.ts`

---

## 🔍 Files Still Using Legacy Conventions

### **Critical Files Requiring Migration:**

| File                                          | Lines  | Usage                                        | Priority  |
| --------------------------------------------- | ------ | -------------------------------------------- | --------- |
| `shared/validation-notifications.ts`          | 46     | `conventions.events.onUiUpdate.triggerDelay` | 🔴 HIGH   |
| `click-base/events/on-click.ts`               | 12     | `conventions.events.onUiUpdate.triggerDelay` | 🔴 HIGH   |
| `click-base/events/on-click-option.ts`        | 10     | `conventions.events.onClick.triggerDelay`    | 🔴 HIGH   |
| `click-base/prototype/on-click-handle.ts`     | 11     | `conventions.validations.triggerDelay`       | 🔴 HIGH   |
| `value-manager/parsers/date-io.ts`            | 22, 42 | `conventions.dataTypes.date.formatDisplay`   | 🟡 MEDIUM |
| `value-manager/prototype/get-value.ts`        | 38     | `conventions.dataTypes.date.formatDisplay`   | 🟡 MEDIUM |
| `framework/validators/is-missing.ts`          | 1      | `MissingPropEnum` import                     | 🟢 LOW    |
| `framework/converters/to-field-descriptor.ts` | 1      | `MissingPropEnum` import                     | 🟢 LOW    |

### **Event Handler Files (Commented Out - Ready for Migration):**

- `input-base/events/on-changed.ts` (line 10) - **READY**
- `input-base/events/on-blur.ts` (line 11) - **READY**
- `input-base/events/on-focus.ts` (line 11) - **READY**
- `input-base/events/on-key-press.ts` (line 9) - **READY**
- `input-base/events/on-key-up.ts` (line 9) - **READY**
- `input-base/events/on-selected.ts` (line 13) - **READY**

---

## 🔄 Migration Mapping

### **Conventions → ConfigurationManager Mapping:**

| Legacy Convention                            | New ConfigurationManager Path                                        |
| -------------------------------------------- | -------------------------------------------------------------------- |
| `conventions.events.onChange.triggerDelay`   | `config.getConfigByName('behavior', 'events', 'onChange')`           |
| `conventions.events.onClick.triggerDelay`    | `config.getConfigByName('behavior', 'events', 'onClick')`            |
| `conventions.events.onUiUpdate.triggerDelay` | `config.getConfigByName('behavior', 'events', 'onUiUpdate')`         |
| `conventions.validations.triggerDelay`       | `config.getConfigByName('behavior', 'validations', 'triggerDelay')`  |
| `conventions.dataTypes.date.formatDisplay`   | `config.getConfigByName('cultures', 'defaultCulture', 'dateFormat')` |
| `conventions.suffix.labelId`                 | `config.getConfigByName('rendering', 'suffixes', 'labelId')`         |
| `conventions.suffix.describedById`           | `config.getConfigByName('rendering', 'suffixes', 'describedById')`   |

---

## 📋 Required Actions

### **Immediate Actions (Priority 🔴 HIGH):**

1. **Fix `shared/validation-notifications.ts`:**

    ```typescript
    // Current (line 46):
    conventions.events.onUiUpdate.triggerDelay

    // Replace with:
    const config = this.serviceManager?.lazy<IConfigurationManager>(SConfigurationManager)?.()
    const delay = config?.getConfigByName<number>('behavior', 'events', 'onUiUpdate') ?? 200
    ```

2. **Fix Click-Base Event Handlers:**

    - `click-base/events/on-click.ts`
    - `click-base/events/on-click-option.ts`
    - `click-base/prototype/on-click-handle.ts`

3. **Enable Commented Event Handlers:**
    - Uncomment and update all event handlers in `input-base/events/`
    - Replace conventions with ConfigurationManager calls

### **Medium Priority Actions (Priority 🟡 MEDIUM):**

4. **Migrate Value Manager:**
    - Update `value-manager/parsers/date-io.ts`
    - Update `value-manager/prototype/get-value.ts`
    - Replace date format conventions with culture-based configuration

### **Low Priority Actions (Priority 🟢 LOW):**

5. **Clean Up Framework Utilities:**
    - Move `MissingPropEnum` from conventions to appropriate location
    - Update imports in validator and converter files

---

## 🎯 Architecture Recommendations

### **1. Service Injection Pattern**

All classes that need configuration should receive `IConfigurationManager` through dependency injection:

```typescript
export const MyClass = function (this: IMyClass, sm: IServiceManager) {
    const config = sm.lazy<IConfigurationManager>(SConfigurationManager)?.()
    // Use config.getConfigByName(...) instead of conventions
}
```

### **2. Configuration Path Standardization**

Establish consistent path patterns:

- **Events:** `behavior.events.{eventName}.triggerDelay`
- **Validations:** `behavior.validations.triggers`
- **Cultures:** `cultures.defaultCulture.{property}`
- **Rendering:** `rendering.suffixes.{suffixType}`

### **3. Fallback Strategy**

Always provide fallback values for configuration access:

```typescript
const delay = config?.getConfigByName<number>('behavior', 'events', 'onChange') ?? 500
```

### **4. Type Safety**

Leverage TypeScript for configuration access:

```typescript
type ConfigPath = 'behavior.events.onChange' | 'cultures.defaultCulture.dateFormat'
```

---

## 🧪 Testing Requirements

### **Required Test Updates:**

1. **BaseInput Tests:** Update mocks to use ConfigurationManager
2. **Event Handler Tests:** Replace conventions with configuration mocks
3. **Value Manager Tests:** Test culture-based date formatting
4. **Integration Tests:** End-to-end configuration flow

### **Test Coverage Gaps:**

- Configuration validation edge cases
- Multiple culture support
- Environment-specific configurations
- Configuration hot-reloading

---

## 📈 Success Metrics

### **Completion Criteria:**

- [ ] Zero imports of `@conventions/conventions`
- [ ] All hardcoded delays/formats removed
- [ ] Configuration-based culture support working
- [ ] All tests passing
- [ ] Performance impact assessment completed

### **Benefits After Migration:**

1. **Dynamic Configuration:** Runtime configuration changes
2. **Multi-Environment Support:** Development, staging, production configs
3. **Internationalization:** Culture-specific formats and validations
4. **Maintainability:** Centralized configuration management
5. **Testability:** Easy mocking and configuration injection

---

## 🚨 Potential Risks

### **Migration Risks:**

1. **Breaking Changes:** Event timing modifications may affect user experience
2. **Performance Impact:** Configuration lookups vs static access
3. **Service Dependencies:** Circular dependency risks with ServiceManager
4. **Backwards Compatibility:** Legacy code integration issues

### **Mitigation Strategies:**

1. **Gradual Migration:** Complete high-priority files first
2. **Fallback Values:** Always provide sensible defaults
3. **Performance Testing:** Benchmark configuration access patterns
4. **Legacy Bridge:** Temporary conventions wrapper during transition

---

## 📅 Estimated Timeline

| Phase       | Tasks                           | Estimated Time | Priority  |
| ----------- | ------------------------------- | -------------- | --------- |
| **Phase 1** | Fix critical event handlers     | 2-3 hours      | 🔴 HIGH   |
| **Phase 2** | Enable commented event handlers | 1-2 hours      | 🔴 HIGH   |
| **Phase 3** | Migrate value manager           | 2-3 hours      | 🟡 MEDIUM |
| **Phase 4** | Clean up framework utilities    | 1 hour         | 🟢 LOW    |
| **Phase 5** | Testing and validation          | 2-4 hours      | 🔴 HIGH   |

**Total Estimated Time:** 8-13 hours

---

## 🎯 Next Steps

1. **Immediate:** Start with `shared/validation-notifications.ts` migration
2. **Week 1:** Complete all high-priority event handler migrations
3. **Week 2:** Migrate value manager and date handling
4. **Week 3:** Comprehensive testing and cleanup
5. **Week 4:** Performance optimization and documentation

---

_This status report provides a comprehensive overview of the conventions → ConfigurationManager refactoring progress. The migration is well-structured with clear priorities and actionable steps for completion._
