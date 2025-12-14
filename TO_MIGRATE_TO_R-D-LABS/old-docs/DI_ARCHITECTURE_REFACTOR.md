# DI Architecture Refactor: From Global Singleton to Consumer-Controlled DI

## Problem Statement

Currently, the library uses a global singleton `applifeCylceInstance` that connects all DI dependencies. This approach has several limitations:

1. **Global State Issues**: Creates tight coupling between library and consumers
2. **Limited Flexibility**: Consumers cannot customize their DI setup
3. **Testing Difficulties**: Hard to create isolated test environments
4. **Multiple Instance Problems**: Cannot run multiple app instances with different configurations
5. **Tree Shaking Issues**: Forces inclusion of all dependencies regardless of usage

## Current Implementation Analysis

### Current Code Location
- File: `packages/vendors/react/formular.components/src/adapters/react/services/use-service.ts`
- Issue: Line 6 uses `applifeCylceInstance.getGlobalServiceManager()`

### Current Problems
```typescript
// Current problematic approach
const serviceManager = useMemo(() => {
    return applifeCylceInstance.getGlobalServiceManager() // Global singleton!
}, [])
```

## Proposed Solution Architecture

### 1. Service Manager Factory Pattern

**Core Concept**: Replace global singleton with factory that creates configurable service manager instances.

**Key Components**:
- `ServiceManagerFactory`: Creates service managers with different configurations
- `IServiceManagerSetupOptions`: Configuration interface for customizing DI setup
- Setup helpers for common scenarios
- React provider for service manager context

### 2. Hierarchical DI Support

**Features**:
- Parent-child service manager relationships
- Scoped service managers for feature modules
- Service resolution inheritance
- Proper disposal management

### 3. Consumer Control Points

**Library Consumers Can**:
- Choose which features to include (core, formular, input engine, etc.)
- Register custom services
- Create scoped DI containers
- Manage service manager lifecycle
- Configure for different environments (dev, test, prod)

## Implementation Plan

### Phase 1: Core Infrastructure

1. **Create Service Manager Factory**
   - Location: `packages/lib/src/core/managers/service-manager/factory/service-manager-factory.ts`
   - Features: Configurable service manager creation
   - Options: Feature toggles, custom setup functions, parent managers

2. **Define Setup Options Interface**
   ```typescript
   interface IServiceManagerSetupOptions {
     includeCoreManagers?: boolean
     includeFormularManager?: boolean
     includeInputEngine?: boolean
     includeBaseConfigurations?: boolean
     customSetup?: Array<(sm: IServiceManager) => void>
     parent?: IServiceManager
   }
   ```

3. **Create Setup Helpers**
   - Location: `packages/lib/src/project/setup/setup-helpers.ts`
   - Predefined configurations: `forFormApplication`, `forTesting`, `coreOnly`, etc.

### Phase 2: React Integration

1. **Service Manager Provider**
   - Location: `packages/vendors/react/formular.components/src/adapters/react/providers/service-manager-provider.tsx`
   - Features: Context provider, auto-disposal, scoped managers

2. **Updated useService Hook**
   - Remove dependency on global singleton
   - Use React context to access service manager
   - Enhanced error handling and type safety

### Phase 3: Migration & Cleanup

1. **Update Existing Code**
   - Replace `applifeCylceInstance` usage
   - Update documentation and examples
   - Create migration guides

2. **Remove Global Singleton**
   - Deprecate `app-lifecycle-instances`
   - Clean up global state references

## Code Examples

### 1. Service Manager Factory Implementation

```typescript
import { IServiceManager, ServiceManager } from '../service-manager'
import { setupManagers } from '@setup/setup/setup-managers'
import { setupFormularManager } from '@core/managers/formular-manager/service/setup-formular-manager'
import { setupBaseInputClasses } from '@setup/setup/setup-base-input-classes'
import { setupInputsRegistry } from '@core/factories/setup/setup-input-registry'
import { setupInputsFactory } from '@core/factories/setup/setup-input-factory'
import { setupBaseFieldsConfiguration } from '@setup/setup/setup-base-input-configurations'

export interface IServiceManagerSetupOptions {
    /** Include core managers (Configuration, Validation, etc.) */
    includeCoreManagers?: boolean
    /** Include formular manager */
    includeFormularManager?: boolean
    /** Include input classes and factories */
    includeInputEngine?: boolean
    /** Include base field configurations */
    includeBaseConfigurations?: boolean
    /** Custom setup functions */
    customSetup?: Array<(sm: IServiceManager) => void>
    /** Parent service manager for hierarchical DI */
    parent?: IServiceManager
}

export interface IServiceManagerFactory {
    /**
     * Creates a new service manager instance with specified features
     */
    create(options?: IServiceManagerSetupOptions): IServiceManager
    
    /**
     * Creates a minimal service manager (just the container)
     */
    createMinimal(parent?: IServiceManager): IServiceManager
    
    /**
     * Creates a fully configured service manager with all features
     */
    createFull(parent?: IServiceManager): IServiceManager
    
    /**
     * Creates a scoped service manager from an existing one
     */
    createScope(parent: IServiceManager): IServiceManager
}

export const ServiceManagerFactory: IServiceManagerFactory = {
    create(options: IServiceManagerSetupOptions = {}): IServiceManager {
        const {
            includeCoreManagers = true,
            includeFormularManager = true,
            includeInputEngine = true,
            includeBaseConfigurations = true,
            customSetup = [],
            parent
        } = options

        const serviceManager = new ServiceManager(parent)

        // Setup core features based on options
        if (includeCoreManagers) {
            setupManagers(serviceManager)
        }

        if (includeFormularManager) {
            setupFormularManager(serviceManager)
        }

        if (includeInputEngine) {
            setupBaseInputClasses(serviceManager)
            setupInputsRegistry(serviceManager)
            setupInputsFactory(serviceManager)
        }

        if (includeBaseConfigurations) {
            setupBaseFieldsConfiguration(serviceManager)
        }

        // Apply custom setup functions
        customSetup.forEach(setup => setup(serviceManager))

        // Validate in development
        if (process.env.NODE_ENV === 'development') {
            try {
                serviceManager.validateNoCycles()
            } catch (error: any) {
                console.error('🚨 Circular dependency detected:', error.message)
                throw error
            }
        }

        return serviceManager
    },

    createMinimal(parent?: IServiceManager): IServiceManager {
        return new ServiceManager(parent)
    },

    createFull(parent?: IServiceManager): IServiceManager {
        return this.create({
            includeCoreManagers: true,
            includeFormularManager: true,
            includeInputEngine: true,
            includeBaseConfigurations: true,
            parent
        })
    },

    createScope(parent: IServiceManager): IServiceManager {
        return parent.createScope()
    }
}
```

### 2. React Service Manager Provider

```typescript
import React, { createContext, useContext, ReactNode } from 'react'
import { IServiceManager, ServiceManagerFactory, IServiceManagerSetupOptions } from 'formular.dev.lib'

interface IServiceManagerContext {
    serviceManager: IServiceManager
}

const ServiceManagerContext = createContext<IServiceManagerContext | null>(null)

interface ServiceManagerProviderProps {
    children: ReactNode
    /** Service manager instance to use. If not provided, creates a new one */
    serviceManager?: IServiceManager
    /** Options for creating a new service manager */
    setupOptions?: IServiceManagerSetupOptions
    /** Whether to dispose the service manager on unmount (only if created internally) */
    autoDispose?: boolean
}

export const ServiceManagerProvider: React.FC<ServiceManagerProviderProps> = ({
    children,
    serviceManager: externalServiceManager,
    setupOptions,
    autoDispose = true
}) => {
    const [internalServiceManager] = React.useState(() => {
        if (externalServiceManager) {
            return externalServiceManager
        }
        return ServiceManagerFactory.create(setupOptions)
    })

    const serviceManager = externalServiceManager || internalServiceManager
    const isInternallyManaged = !externalServiceManager

    React.useEffect(() => {
        return () => {
            if (isInternallyManaged && autoDispose) {
                serviceManager.dispose()
            }
        }
    }, [serviceManager, isInternallyManaged, autoDispose])

    return (
        <ServiceManagerContext.Provider value={{ serviceManager }}>
            {children}
        </ServiceManagerContext.Provider>
    )
}

export const useServiceManager = (): IServiceManager => {
    const context = useContext(ServiceManagerContext)
    if (!context) {
        throw new Error('useServiceManager must be used within a ServiceManagerProvider')
    }
    return context.serviceManager
}
```

### 3. Updated useService Hook

```typescript
import { ServiceIdType } from 'formular.dev.lib'
import { useMemo } from 'react'
import { useServiceManager } from '../providers/service-manager-provider'

export const useService = () => {
    const serviceManager = useServiceManager()

    const getService = useMemo(() => {
        return <T>(identifier: ServiceIdType<T>): T | undefined => {
            try {
                const resolver = serviceManager.lazy<T>(identifier)
                if (!resolver) {
                    throw new Error(`Service not found for identifier: ${identifier?.toString()}`)
                }
                return resolver()
            } catch (error: any) {
                throw new Error(
                    `useService: Error resolving service ${identifier?.toString()}: ${error.message}`
                )
            }
        }
    }, [serviceManager])

    const getServiceSync = useMemo(() => {
        return <T>(identifier: ServiceIdType<T>): T => {
            try {
                return serviceManager.resolve<T>(identifier)
            } catch (error: any) {
                throw new Error(
                    `useService: Error resolving service ${identifier?.toString()}: ${error.message}`
                )
            }
        }
    }, [serviceManager])

    return {
        getService,
        getServiceSync,
        serviceManager
    }
}
```

### 4. Setup Helpers for Common Scenarios

```typescript
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { ServiceManagerFactory, IServiceManagerSetupOptions } from '@core/managers/service-manager/factory/service-manager-factory'

/**
 * Helper functions for common setup scenarios
 */
export const SetupHelpers = {
    /**
     * Creates a service manager for form applications
     */
    forFormApplication(options?: Partial<IServiceManagerSetupOptions>): IServiceManager {
        return ServiceManagerFactory.create({
            includeCoreManagers: true,
            includeFormularManager: true,
            includeInputEngine: true,
            includeBaseConfigurations: true,
            ...options
        })
    },

    /**
     * Creates a minimal service manager for custom implementations
     */
    forCustomImplementation(options?: Partial<IServiceManagerSetupOptions>): IServiceManager {
        return ServiceManagerFactory.create({
            includeCoreManagers: true,
            includeFormularManager: false,
            includeInputEngine: false,
            includeBaseConfigurations: false,
            ...options
        })
    },

    /**
     * Creates a service manager for testing
     */
    forTesting(options?: Partial<IServiceManagerSetupOptions>): IServiceManager {
        return ServiceManagerFactory.create({
            includeCoreManagers: true,
            includeFormularManager: true,
            includeInputEngine: true,
            includeBaseConfigurations: true,
            ...options
        })
    },

    /**
     * Creates a service manager with only core managers
     */
    coreOnly(options?: Partial<IServiceManagerSetupOptions>): IServiceManager {
        return ServiceManagerFactory.create({
            includeCoreManagers: true,
            includeFormularManager: false,
            includeInputEngine: false,
            includeBaseConfigurations: false,
            ...options
        })
    }
}
```

## Usage Examples

### Basic Form Application
```typescript
import { ServiceManagerProvider, SetupHelpers } from 'formular.dev.lib'

function App() {
    const serviceManager = SetupHelpers.forFormApplication()
    
    return (
        <ServiceManagerProvider serviceManager={serviceManager}>
            <MyFormComponent />
        </ServiceManagerProvider>
    )
}
```

### Custom Configuration
```typescript
const serviceManager = ServiceManagerFactory.create({
    includeCoreManagers: true,
    includeInputEngine: false, // Custom input implementation
    customSetup: [
        (sm) => {
            sm.registerClass(SMyCustomService, MyCustomService)
        }
    ]
})
```

### Scoped DI for Features
```typescript
function FeatureModule() {
    const parentSM = useServiceManager()
    const scopedSM = ServiceManagerFactory.createScope(parentSM)
    
    return (
        <ServiceManagerProvider serviceManager={scopedSM}>
            <FeatureComponent />
        </ServiceManagerProvider>
    )
}
```

### Testing Setup
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
})
```

## Benefits of New Architecture

### For Library Maintainers
- **Cleaner Architecture**: No global state dependencies
- **Better Testing**: Isolated service managers for tests
- **Modular Design**: Tree-shakeable, only include what's needed
- **Easier Debugging**: Clear DI hierarchies and scopes

### For Library Consumers
- **Full Control**: Choose which features to include
- **Flexibility**: Custom service registration and configuration
- **Multiple Instances**: Can run multiple app instances
- **Better Testing**: Easy to mock services and create test environments
- **Performance**: Only load required dependencies

## Migration Strategy

### Breaking Changes
- `applifeCylceInstance` usage will need to be replaced
- Consumers must explicitly set up service managers
- Some global services may need to be explicitly registered

### Migration Steps
1. **Add New System**: Implement factory and providers alongside existing system
2. **Deprecation Warnings**: Add warnings to existing global singleton usage
3. **Documentation**: Provide migration guides and examples
4. **Support Period**: Support both systems during transition
5. **Remove Old System**: Clean removal after migration period

## File Structure Changes

```
packages/lib/src/
├── core/managers/service-manager/
│   ├── factory/
│   │   └── service-manager-factory.ts      # NEW: Factory for creating SMs
│   └── service-manager.types.ts            # UPDATED: Add factory types
├── project/setup/
│   └── setup-helpers.ts                    # NEW: Common setup scenarios
└── start/
    └── app-lifecycle-instances.ts          # DEPRECATED: To be removed

packages/vendors/react/formular.components/src/adapters/react/
├── providers/
│   └── service-manager-provider.tsx        # NEW: React context provider
└── services/
    └── use-service.ts                       # UPDATED: Remove global dependency
```

## Validation & Testing Plan

### Unit Tests
- Service manager factory functionality
- Setup helpers for different scenarios
- React provider behavior and context management
- Service resolution in hierarchical DI

### Integration Tests
- End-to-end DI setup and service resolution
- Scoped service manager behavior
- Migration compatibility testing

### Performance Tests
- Tree shaking effectiveness
- Memory usage with different configurations
- Service resolution performance

## Decision Points & Trade-offs

### 1. Factory vs Builder Pattern
**Decision**: Factory Pattern
**Reasoning**: 
- Simpler API for consumers
- Less verbose than builder chains
- Better suited for predefined configurations

### 2. React Context vs Props Drilling
**Decision**: React Context
**Reasoning**:
- Cleaner component trees
- Easier to access DI anywhere in component hierarchy
- Standard pattern for cross-cutting concerns

### 3. Auto-disposal vs Manual Management
**Decision**: Auto-disposal with opt-out
**Reasoning**:
- Prevents memory leaks by default
- Consumers can opt out for custom lifecycle management
- Safer default behavior

## Risk Assessment

### High Risk
- **Breaking Changes**: Existing consumers will need updates
- **Migration Complexity**: Large codebases may have many touch points

### Medium Risk
- **Performance Impact**: Additional React context overhead
- **Learning Curve**: Consumers need to understand new patterns

### Low Risk
- **Backward Compatibility**: Can maintain during transition period
- **Testing**: New system is more testable than current

## Success Metrics

### Technical Metrics
- [ ] All existing functionality works with new system
- [ ] Zero global state dependencies
- [ ] 100% test coverage for new DI system
- [ ] Tree shaking reduces bundle size by >20% for minimal configurations

### Developer Experience Metrics
- [ ] Setup time reduced from X to Y for new projects
- [ ] Testing setup simplified (fewer boilerplate steps)
- [ ] Clear migration path documented
- [ ] Positive feedback from early adopters

---

## 🤖 Continuation Prompt for AI Assistant

**Context**: This document outlines a comprehensive refactor of the DI architecture in a TypeScript/React library, moving from a global singleton pattern (`applifeCylceInstance`) to a consumer-controlled dependency injection system using factory pattern and React context.

**Current State**: 
- **Problem Identified**: Global `applifeCylceInstance` singleton limiting flexibility and testability
- **Solution Designed**: Service Manager Factory + React Provider pattern with hierarchical DI support
- **Implementation Plan**: 3-phase approach with core infrastructure, React integration, and migration
- **Code Examples**: Complete implementation examples provided above

**Project Structure Context**:
- Main lib: `packages/lib/src/`
- React components: `packages/vendors/react/formular.components/src/`
- Current problematic file: `packages/vendors/react/formular.components/src/adapters/react/services/use-service.ts` (line 6)
- Global singleton: `packages/lib/src/project/start/app-lifecycle-instances.ts`

**What to do next**:

1. **🔍 FIRST: Examine Current Codebase**
   - Read `packages/lib/src/project/start/app-lifecycle-instances.ts` to understand current singleton implementation
   - Check existing service manager interfaces and setup functions
   - Look at current `useService` hook implementation
   - Understand existing DI setup functions referenced in the plan

2. **🏭 Implement Service Manager Factory** 
   - Create: `packages/lib/src/core/managers/service-manager/factory/service-manager-factory.ts`
   - Define `IServiceManagerSetupOptions` interface
   - Implement factory with configurable feature toggles
   - Add development-time validation for circular dependencies

3. **⚛️ Create React Integration**
   - Create: `packages/vendors/react/formular.components/src/adapters/react/providers/service-manager-provider.tsx`
   - Implement React context provider with auto-disposal
   - Update `use-service.ts` to use context instead of global singleton

4. **🛠️ Setup Helpers & Utilities**
   - Create: `packages/lib/src/project/setup/setup-helpers.ts`
   - Implement predefined configurations (forFormApplication, forTesting, etc.)

5. **🔄 Migration Strategy**
   - Plan backward compatibility approach
   - Add deprecation warnings to existing global usage
   - Create migration documentation

**Key Requirements**:
- ✅ Maintain TypeScript type safety throughout
- ✅ Follow existing project conventions and patterns  
- ✅ Support hierarchical/scoped DI containers
- ✅ Enable tree-shaking for unused features
- ✅ Comprehensive error handling and validation
- ✅ Proper service manager lifecycle management
- ✅ React provider pattern with auto-disposal

**Expected Outcomes**:
- Zero global state dependencies
- Consumer-controlled DI configuration
- Better testability and isolation
- Improved bundle size through tree-shaking
- Seamless migration path from current implementation

**Next Action**: Please start by examining the current codebase files mentioned above to understand the existing patterns, then implement the Service Manager Factory as the foundation for this new architecture.

If you need any clarification on the current implementation or have questions about specific requirements, please ask before proceeding with the implementation.
