// Usage example for the lazy method in ServiceManager

import { ServiceManager } from '../service-manager'
import { IServiceManager } from '../service-manager.types'

// Example service interface
interface IExampleService {
    getName(): string
    getValue(): number
}

// Example service implementation
class ExampleService implements IExampleService {
    constructor(private name: string = 'Example Service') {}

    getName(): string {
        console.log('ExampleService.getName() called')
        return this.name
    }

    getValue(): number {
        console.log('ExampleService.getValue() called')
        return 42
    }
}

// Service identifier
const SExampleService = Symbol.for('IExampleService')

// Demo function showing lazy resolution
export function demonstrateLazyResolution() {
    // Create service manager
    const sm = new ServiceManager()

    // Register the service
    sm.registerClass(SExampleService, ExampleService, {
        lifetime: 'singleton'
    })

    console.log('=== Lazy Resolution Demo ===')

    // Create lazy resolver - service is NOT resolved yet
    console.log('1. Creating lazy resolver...')
    const lazyService = sm.lazy<IExampleService>(SExampleService)
    console.log('   Lazy resolver created (service not yet instantiated)')

    // Service gets resolved only when the lazy function is called
    console.log('2. First call to lazy resolver...')
    const service1 = lazyService()
    console.log(`   Service name: ${service1.getName()}`)

    // Subsequent calls return the same cached instance
    console.log('3. Second call to lazy resolver...')
    const service2 = lazyService()
    console.log(`   Same instance? ${service1 === service2}`)
    console.log(`   Service value: ${service2.getValue()}`)

    // Compare with direct resolution
    console.log('4. Direct resolution for comparison...')
    const directService = sm.resolve<IExampleService>(SExampleService)
    console.log(`   Same as lazy instance? ${service1 === directService}`)

    // Clean up
    sm.dispose()

    console.log('=== Demo Complete ===')
}

// Usage patterns you can use in your services:

// Pattern 1: Use in React hooks
export function useExampleWithLazy() {
    // You could create a hook that uses lazy resolution
    // const lazyService = useMemo(() => serviceManager.lazy(SExampleService), [])
    // return lazyService
}

// Pattern 2: Use in dependency injection for lazy dependencies
export function createServiceWithLazyDependency(sm: IServiceManager) {
    const lazyExampleService = sm.lazy<IExampleService>(SExampleService)

    return {
        doSomething() {
            // Service is only resolved when actually needed
            const service = lazyExampleService()
            return service.getName()
        }
    }
}
