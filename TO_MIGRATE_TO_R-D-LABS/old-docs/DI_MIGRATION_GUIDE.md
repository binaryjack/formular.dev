# FORMULAR DI Architecture Migration Guide

## Overview

The FORMULAR library has been refactored from a global singleton dependency injection approach to a consumer-controlled factory pattern. This change provides better flexibility, testability, and allows multiple service manager instances.

## 🚨 Breaking Changes

The global `applifeCylceInstance` is now **deprecated**. Consumers must explicitly configure their service managers using the new factory system.

## New Architecture Components

### 1. ServiceManagerFactory

The core factory for creating service manager instances with configurable features.

```typescript
import { ServiceManagerFactory } from 'formular.dev.lib'

// Create with specific features
const serviceManager = ServiceManagerFactory.create({
    includeCoreManagers: true,
    includeFormularManager: true,
    includeInputEngine: true,
    includeBaseConfigurations: true
})
```

### 2. SetupHelpers

Convenient methods for common configurations.

```typescript
import { SetupHelpers } from 'formular.dev.lib'

// For form applications (most common)
const serviceManager = SetupHelpers.forFormApplication()

// For testing
const testSM = SetupHelpers.forTesting()

// For custom implementations
const customSM = SetupHelpers.forCustomImplementation()
```

### 3. React Integration

New React provider and updated hooks for DI access.

```tsx
import { ServiceManagerProvider, useService } from 'formular.dev.lib'

// Wrap your app
function App() {
    return (
        <ServiceManagerProvider setupOptions={{ includeCoreManagers: true }}>
            <MyComponent />
        </ServiceManagerProvider>
    )
}

// Use services in components
function MyComponent() {
    const { getService, getServiceSync } = useService()
    const configService = getService(SConfigService)
    return <div>...</div>
}
```

## Migration Guide

### Before (Deprecated)

```typescript
// OLD: Global singleton approach
import { applifeCylceInstance } from 'formular.dev.lib'

const serviceManager = applifeCylceInstance.getGlobalServiceManager()
```

```tsx
// OLD: Direct useService without provider
function MyComponent() {
    const { getService } = useService() // This used global singleton
    return <div>...</div>
}
```

### After (New)

```typescript
// NEW: Factory approach
import { SetupHelpers } from 'formular.dev.lib'

const serviceManager = SetupHelpers.forFormApplication()
```

```tsx
// NEW: Provider pattern
import { ServiceManagerProvider, useService } from 'formular.dev.lib'

function App() {
    return (
        <ServiceManagerProvider setupOptions={{ includeCoreManagers: true }}>
            <MyComponent />
        </ServiceManagerProvider>
    )
}

function MyComponent() {
    const { getService } = useService()
    return <div>...</div>
}
```

## Configuration Options

### IServiceManagerSetupOptions

```typescript
interface IServiceManagerSetupOptions {
    includeCoreManagers?: boolean      // Configuration, Validation, etc.
    includeFormularManager?: boolean   // Form management
    includeInputEngine?: boolean       // Input classes and factories
    includeBaseConfigurations?: boolean // Field configurations
    customSetup?: Array<(sm: IServiceManager) => void> // Custom services
    parent?: IServiceManager          // Hierarchical DI
    skipValidation?: boolean          // Skip dev validation
}
```

## Common Patterns

### 1. Basic Form Application

```tsx
import { ServiceManagerProvider, SetupHelpers } from 'formular.dev.lib'

function FormApp() {
    const serviceManager = SetupHelpers.forFormApplication()
    
    return (
        <ServiceManagerProvider serviceManager={serviceManager}>
            <FormComponent />
        </ServiceManagerProvider>
    )
}
```

### 2. Custom Configuration

```tsx
const serviceManager = ServiceManagerFactory.create({
    includeCoreManagers: true,
    includeInputEngine: false, // Skip for custom input implementation
    customSetup: [
        (sm) => {
            sm.registerClass(SCustomService, CustomService)
        }
    ]
})
```

### 3. Testing Setup

```typescript
describe('Component Tests', () => {
    let serviceManager: IServiceManager
    
    beforeEach(() => {
        serviceManager = SetupHelpers.forTesting({
            customSetup: [
                (sm) => {
                    sm.registerInstance(SMockService, mockService)
                }
            ]
        })
    })
    
    afterEach(() => {
        serviceManager.dispose()
    })
    
    test('should work', () => {
        render(
            <ServiceManagerProvider serviceManager={serviceManager}>
                <TestComponent />
            </ServiceManagerProvider>
        )
        // ... test assertions
    })
})
```

### 4. Hierarchical DI

```tsx
function FeatureModule() {
    const parentSM = useService().serviceManager
    const scopedSM = ServiceManagerFactory.createScope(parentSM)
    
    return (
        <ServiceManagerProvider serviceManager={scopedSM}>
            <FeatureComponent />
        </ServiceManagerProvider>
    )
}
```

## Benefits of New Architecture

### For Library Maintainers
- ✅ No global state dependencies
- ✅ Better testing isolation
- ✅ Modular, tree-shakeable design
- ✅ Easier debugging with clear DI hierarchies

### For Library Consumers
- ✅ Full control over DI configuration
- ✅ Multiple service manager instances
- ✅ Better testing with mock services
- ✅ Smaller bundles (only include needed features)
- ✅ Hierarchical DI for complex applications

## Available Setup Helpers

| Helper | Description | Use Case |
|--------|-------------|----------|
| `forFormApplication()` | Full setup with all features | Most form applications |
| `forTesting()` | Testing-optimized setup | Unit/integration tests |
| `forCustomImplementation()` | Core managers only | Custom implementations |
| `coreOnly()` | Minimal core setup | Lightweight applications |
| `forInputEngine()` | Core + Input engine | Input-focused apps |
| `forConfiguration()` | Core + Configuration | Config-only scenarios |

## Performance Considerations

### Tree Shaking
The new factory system enables better tree shaking:

```typescript
// Only includes core managers (smaller bundle)
const lightweightSM = SetupHelpers.coreOnly()

// Includes everything (larger bundle)
const fullSM = SetupHelpers.forFormApplication()
```

### Memory Management
Service managers are properly disposed when React components unmount:

```tsx
<ServiceManagerProvider autoDispose={true}> {/* Default */}
    <App />
</ServiceManagerProvider>
```

## Migration Checklist

- [ ] Replace `applifeCylceInstance` usage with `ServiceManagerFactory`
- [ ] Wrap React apps with `ServiceManagerProvider`
- [ ] Update test setups to use `SetupHelpers.forTesting()`
- [ ] Configure only needed features for better performance
- [ ] Remove any global state dependencies
- [ ] Update documentation and examples

## Troubleshooting

### Error: "useServiceManager must be used within a ServiceManagerProvider"
**Solution**: Wrap your component tree with `ServiceManagerProvider`.

### Error: Service not found
**Solution**: Ensure the required feature is enabled in setup options:
```typescript
ServiceManagerFactory.create({
    includeFormularManager: true, // Enable if using formular services
    includeInputEngine: true,     // Enable if using input services
    // ...
})
```

### Error: Circular dependency detected
**Solution**: The factory includes the same validation as the old system. Check your service dependencies for cycles.

## Support & Migration Help

- Review the examples in `packages/vendors/react/formular.components/src/examples/`
- Check the migration utilities in `MigrationHelpers` (temporary)
- All existing functionality should work with appropriate setup options

---

**Note**: The old `applifeCylceInstance` is deprecated but still functional during the migration period. Plan to migrate to the new system for better maintainability and performance.
