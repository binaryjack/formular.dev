// Integration test showing lazy resolution working with your existing registerClass method

import { ServiceManager } from '../service-manager'

// Test service that demonstrates dependency injection with lazy resolution
interface ILogger {
    log(message: string): void
}

interface IDataService {
    getData(): string[]
}

interface IBusinessService {
    processData(): string
}

// Simple logger implementation
class Logger implements ILogger {
    log(message: string): void {
        console.log(`[LOG] ${message}`)
    }
}

// Data service implementation
class DataService implements IDataService {
    constructor(private getLogger: () => ILogger) {}

    getData(): string[] {
        const logger = this.getLogger()
        logger.log('Fetching data...')
        return ['item1', 'item2', 'item3']
    }
}

// Business service that uses both services
class BusinessService implements IBusinessService {
    constructor(
        private getLogger: () => ILogger,
        private getDataService: () => IDataService
    ) {}

    processData(): string {
        const logger = this.getLogger()
        const dataService = this.getDataService()

        logger.log('Starting data processing...')
        const data = dataService.getData()
        const result = data.join(', ')
        logger.log(`Processing complete. Result: ${result}`)

        return result
    }
}

// Service identifiers
const SLogger = Symbol.for('ILogger')
const SDataService = Symbol.for('IDataService')
const SBusinessService = Symbol.for('IBusinessService')

export function demonstrateIntegration() {
    console.log('=== ServiceManager + Lazy Resolution Integration ===')

    const sm = new ServiceManager()

    // Register services using your existing registerClass method
    sm.registerClass(SLogger, Logger, {
        lifetime: 'singleton'
    })

    // Register services with lazy dependencies
    sm.registerClass(SDataService, DataService, {
        lifetime: 'singleton',
        dependencies: [SLogger] // This will be resolved lazily
    })

    sm.registerClass(SBusinessService, BusinessService, {
        lifetime: 'singleton',
        dependencies: [SLogger, SDataService] // Both resolved lazily
    })

    console.log('1. Services registered with lazy dependencies')

    // Create lazy resolvers without instantiating services
    const lazyBusinessService = sm.lazy<IBusinessService>(SBusinessService)
    const lazyLogger = sm.lazy<ILogger>(SLogger)

    console.log('2. Lazy resolvers created (no services instantiated yet)')

    // Use lazy resolver for optional logging
    function conditionalLog(condition: boolean, message: string) {
        if (condition) {
            const logger = lazyLogger()
            logger.log(message)
        }
    }

    conditionalLog(true, 'This will log because condition is true')
    conditionalLog(false, 'This will not log because condition is false')

    // Use the business service (this will trigger the dependency chain)
    console.log('3. Using business service (triggering lazy resolution)...')
    const businessService = lazyBusinessService()
    const result = businessService.processData()

    console.log(`4. Final result: ${result}`)

    // Verify that subsequent calls use cached instances
    console.log('5. Testing cached instances...')
    const businessService2 = lazyBusinessService()
    const logger2 = lazyLogger()

    console.log(`   Same business service instance: ${businessService === businessService2}`)

    // Clean up
    sm.dispose()
    console.log('=== Integration Test Complete ===')

    return result
}

// Export for potential use in other parts of your application
export { demonstrateIntegration as testServiceManagerLazyIntegration }
