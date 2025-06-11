# Dependency Injection System - Improvement Recommendations

## 🔴 Critical Issues

### 1. Function Constructor Anti-Pattern

**Current Issue:**

```typescript
export const TrackingStrategyService = function (
    this: ITrackingStrategyService,
    sm: IServiceManager
) {
    // implementation
} as any as ITrackingStrategyService
```

**✅ Recommended Solution:**

```typescript
export class TrackingStrategyService implements ITrackingStrategyService {
    private _strategies: ITrackingOutputProvider[] = []

    constructor(private readonly sm: IServiceManager) {
        if (!sm) {
            throw new Error('ServiceManager is required')
        }
    }

    get strategies(): ITrackingOutputProvider[] {
        return this._strategies
    }

    add(...strategies: ITrackingOutputProvider[]): void {
        for (const strategy of strategies) {
            if (!this._strategies.includes(strategy)) {
                this._strategies.push(strategy)
            }
        }
        this.sync()
    }

    private sync(): void {
        const vm = this.sm.resolve<ITrackingManager>(STrackingManager)
        if (vm) {
            vm.addProviders(this.strategies)
        }
    }
}
```

### 2. Memory Leak Risks

**Issue**: Services not implementing proper disposal
**✅ Solution**: Implement IDisposable pattern consistently:

```typescript
export interface IDisposableService {
    dispose(): void
}

export class TrackingStrategyService implements ITrackingStrategyService, IDisposableService {
    private _disposed = false

    dispose(): void {
        if (this._disposed) return

        this._strategies.length = 0
        this._disposed = true
    }

    private throwIfDisposed(): void {
        if (this._disposed) {
            throw new Error('Service has been disposed')
        }
    }
}
```

### 3. Circular Dependency Risks

**Issue**: Services directly resolving dependencies in constructors
**✅ Solution**: Use lazy initialization or factory pattern:

```typescript
export class BaseInputService implements IBaseInputService {
    private _domManager?: IDomManager<HTMLInputElement>

    constructor(private readonly sm: IServiceManager) {}

    private get domManager(): IDomManager<HTMLInputElement> {
        if (!this._domManager) {
            this._domManager = this.sm.resolve<IDomManager<HTMLInputElement>>(SDomManager)
        }
        return this._domManager
    }

    build(descriptor: IFieldDescriptor): IInputBase {
        const baseInputInstance = this.sm.resolve<IInputBase>(SInputBase)
        baseInputInstance.useDomManager(this.domManager) // Lazy resolution
        return baseInputInstance
    }
}
```

## 🟡 Moderate Issues

### 4. Inconsistent Error Handling

**Current Issue:**

```typescript
// Some services catch and return undefined
} catch (e: any) {
    logManager(/* ... */)
    return undefined
}
```

**✅ Recommendation**: Consistent error handling strategy:

```typescript
export class ServiceBuilder<T> {
    static create<T>(
        sm: IServiceManager,
        buildFn: (sm: IServiceManager) => T,
        serviceName: string
    ): T {
        try {
            return buildFn(sm)
        } catch (error) {
            logManager(
                undefined,
                'critical',
                serviceName,
                `Failed to create ${serviceName}: ${error.message}`
            )
            throw new ServiceCreationError(`Failed to create ${serviceName}`, error)
        }
    }
}

// Usage
export class CheckInputService implements ICheckInputService {
    constructor(private readonly sm: IServiceManager) {}

    build(descriptor: IFieldDescriptor): ICheckBoxBaseInput {
        return ServiceBuilder.create(
            this.sm,
            (sm) => {
                // Build logic here
                return checkInput
            },
            'CheckInputService'
        )
    }
}
```

### 5. Dependency Array Inconsistencies

**Issue**: Some services have empty dependency arrays:

```typescript
sm.registerClass(SSelectInputService, SelectInputService, {
    lifetime: 'transient',
    dependencies: [] // Should include SServiceManager
})
```

**✅ Fix**: Ensure consistent dependency declarations:

```typescript
// Create dependency constants
const SERVICE_DEPENDENCIES = {
    BASE_SERVICE: [SServiceManager],
    INPUT_SERVICE: [SServiceManager, SConfigProvider],
    STRATEGY_SERVICE: [SServiceManager]
} as const

// Use consistently
sm.registerClass(SSelectInputService, SelectInputService, {
    lifetime: 'transient',
    dependencies: SERVICE_DEPENDENCIES.BASE_SERVICE
})
```

### 6. Manual Service Registration

**Issue**: Lots of repetitive registration code
**✅ Solution**: Create registration helpers:

```typescript
interface ServiceRegistration<T = any> {
    symbol: symbol
    implementation: new (...args: any[]) => T
    lifetime?: ServiceLifeCycleType
    dependencies?: ServiceIdType[]
}

class ServiceRegistrar {
    static registerServices(sm: IServiceManager, services: ServiceRegistration[]): void {
        services.forEach(
            ({ symbol, implementation, lifetime = 'transient', dependencies = [] }) => {
                sm.registerClass(symbol, implementation, {
                    lifetime,
                    dependencies: dependencies.length > 0 ? dependencies : [SServiceManager]
                })
            }
        )
    }
}

// Usage
const INPUT_SERVICES: ServiceRegistration[] = [
    { symbol: SBaseInputService, implementation: BaseInputService },
    { symbol: SCheckInputService, implementation: CheckInputService },
    { symbol: STextInputService, implementation: TextInputService }
]

ServiceRegistrar.registerServices(sm, INPUT_SERVICES)
```

## 🟢 Architecture Improvements

### 7. Service Locator Pattern Alternative

**Current**: Services directly resolve dependencies
**✅ Better**: Use dedicated resolver/factory:

```typescript
export class ServiceFactory {
    constructor(private readonly sm: IServiceManager) {}

    createInputService<T extends IInputBase>(
        type: InputTypeNames,
        descriptor: IFieldDescriptor
    ): T {
        const factory = this.sm.resolve<IInputFactory>(SInputFactory)
        return factory.create<T>(type).build(descriptor)
    }
}
```

### 8. Configuration Management

**Issue**: Configuration scattered across services
**✅ Solution**: Centralized configuration:

```typescript
interface InjectionConfig {
    defaultLifetime: ServiceLifeCycleType
    enableCircularDependencyDetection: boolean
    maxDependencyDepth: number
    enablePerformanceMetrics: boolean
}

export class ConfiguredServiceManager extends ServiceManager {
    constructor(config: InjectionConfig, parent?: IServiceManager) {
        super(parent)
        this.applyConfig(config)
    }

    private applyConfig(config: InjectionConfig): void {
        // Apply configuration logic
    }
}
```

### 9. Service Health Monitoring

**Add**: Service health checking:

```typescript
interface ServiceHealth {
    isHealthy: boolean
    lastChecked: Date
    errorCount: number
    avgResolutionTime: number
}

export class ServiceMonitor {
    private healthMap = new Map<ServiceIdType, ServiceHealth>()

    checkServiceHealth<T>(identifier: ServiceIdType<T>): ServiceHealth {
        // Implementation
    }

    getUnhealthyServices(): ServiceIdType[] {
        // Implementation
    }
}
```

## 🎯 Quick Wins Implementation Order

1. **Fix function constructors** → Use proper classes
2. **Add consistent disposal** → Implement IDisposable
3. **Fix dependency arrays** → Ensure all services declare dependencies
4. **Add service registration helpers** → Reduce boilerplate
5. **Implement lazy loading** → Prevent circular dependencies
6. **Add error boundaries** → Consistent error handling

## 📊 Performance Considerations

1. **Lazy Resolution**: Don't resolve all dependencies in constructor
2. **Caching**: Cache frequently resolved services
3. **Disposal**: Properly clean up resources
4. **Monitoring**: Track resolution times and memory usage

This will significantly improve your dependency injection system's robustness, maintainability, and performance.
