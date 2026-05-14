# ServiceManager Lazy Resolution

The `lazy` method provides deferred resolution of services, allowing you to create a resolver function that will only instantiate the service when first called, and then cache the result for subsequent calls.

## Method Signature

```typescript
lazy<T>(identifier: ServiceIdType<T>): () => T
```

## Basic Usage

```typescript
import { ServiceManager } from './service-manager'

const sm = new ServiceManager()

// Register a service
sm.registerClass(SMyService, MyService, { lifetime: 'singleton' })

// Create lazy resolver (service is NOT instantiated yet)
const lazyService = sm.lazy<IMyService>(SMyService)

// Service gets instantiated only when called
const service = lazyService() // Service is created here
const serviceAgain = lazyService() // Returns cached instance
```

## Use Cases

### 1. Avoiding Circular Dependencies

```typescript
// Instead of resolving directly in constructor
class ServiceA {
    constructor(private sm: IServiceManager) {
        // This might cause circular dependency
        // this.serviceB = sm.resolve<IServiceB>(SServiceB)

        // Use lazy resolution instead
        this.lazyServiceB = sm.lazy<IServiceB>(SServiceB)
    }

    private lazyServiceB: () => IServiceB

    doSomething() {
        // Resolve only when needed
        const serviceB = this.lazyServiceB()
        return serviceB.process()
    }
}
```

### 2. Expensive Service Initialization

```typescript
// For services that are expensive to create but not always used
const lazyExpensiveService = sm.lazy<IExpensiveService>(SExpensiveService)

function conditionalOperation(condition: boolean) {
    if (condition) {
        // Only create the expensive service if really needed
        const service = lazyExpensiveService()
        return service.doExpensiveOperation()
    }
    return 'skipped'
}
```

### 3. React Hooks Integration

```typescript
import { useMemo } from 'react'

export function useMyService() {
    // Create lazy resolver once per component lifecycle
    const lazyService = useMemo(() => {
        return serviceManager.lazy<IMyService>(SMyService)
    }, [])

    return {
        getService: lazyService,
        callService: (data: any) => {
            const service = lazyService()
            return service.process(data)
        }
    }
}
```

### 4. Optional Dependencies

```typescript
class OptionalFeatureService {
    constructor(private sm: IServiceManager) {
        // Create lazy resolver for optional dependency
        this.lazyOptionalService = sm.lazy<IOptionalService>(SOptionalService)
    }

    private lazyOptionalService: () => IOptionalService

    processWithOptionalFeature(data: any) {
        try {
            const optionalService = this.lazyOptionalService()
            return optionalService.enhance(data)
        } catch (error) {
            // Fall back to basic processing if optional service not available
            return this.basicProcess(data)
        }
    }
}
```

## Behavior with Different Lifetimes

### Singleton Services

```typescript
sm.registerClass(SMyService, MyService, { lifetime: 'singleton' })

const lazy1 = sm.lazy<IMyService>(SMyService)
const lazy2 = sm.lazy<IMyService>(SMyService)

const service1 = lazy1() // Creates new instance
const service2 = lazy2() // Returns same instance
const direct = sm.resolve<IMyService>(SMyService) // Returns same instance

console.log((service1 === service2) === direct) // true
```

### Transient Services

```typescript
sm.registerClass(SMyService, MyService, { lifetime: 'transient' })

const lazy1 = sm.lazy<IMyService>(SMyService)
const lazy2 = sm.lazy<IMyService>(SMyService)

const service1 = lazy1() // Creates new instance
const service2 = lazy1() // Returns cached instance (same as service1)
const service3 = lazy2() // Creates new instance (different from service1)

console.log(service1 === service2) // true (cached within same lazy resolver)
console.log(service1 === service3) // false (different lazy resolvers)
```

### Scoped Services

```typescript
const scope = sm.createScope()
scope.registerClass(SMyService, MyService, { lifetime: 'scoped' })

const lazy1 = scope.lazy<IMyService>(SMyService)
const lazy2 = scope.lazy<IMyService>(SMyService)

const service1 = lazy1() // Creates new instance in scope
const service2 = lazy2() // Returns same scoped instance
```

## Performance Benefits

1. **Deferred Instantiation**: Services are only created when actually needed
2. **Caching**: Each lazy resolver caches its result, avoiding repeated instantiation
3. **Memory Efficiency**: Unused services don't consume memory
4. **Startup Performance**: Application startup is faster when using lazy resolution for non-critical services

## Error Handling

```typescript
const lazyService = sm.lazy<IMyService>(SMyService)

try {
    const service = lazyService()
    // Use service
} catch (error) {
    // Handle service resolution errors
    console.error('Failed to resolve service:', error)
}
```

## Best Practices

1. **Use for Optional Dependencies**: When a service might not always be needed
2. **Break Circular Dependencies**: Instead of direct resolution in constructors
3. **Expensive Services**: For services with heavy initialization costs
4. **Conditional Features**: For features that are conditionally enabled
5. **React Components**: To avoid unnecessary service creation during rendering

## Comparison with Direct Resolution

| Method         | When Instantiated | Caching           | Use Case                        |
| -------------- | ----------------- | ----------------- | ------------------------------- |
| `resolve()`    | Immediately       | Per lifetime      | Always needed services          |
| `lazy()`       | On first call     | Per lazy resolver | Conditionally needed services   |
| `tryResolve()` | Immediately       | Per lifetime      | Optional services with fallback |

## Migration from Existing Code

```typescript
// Before: Direct resolution
class MyService {
    constructor(private sm: IServiceManager) {
        this.dependency = sm.resolve<IDependency>(SDependency)
    }
}

// After: Lazy resolution
class MyService {
    constructor(private sm: IServiceManager) {
        this.lazyDependency = sm.lazy<IDependency>(SDependency)
    }

    private lazyDependency: () => IDependency

    doWork() {
        const dependency = this.lazyDependency()
        return dependency.process()
    }
}
```
