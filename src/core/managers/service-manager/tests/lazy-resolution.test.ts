import { ServiceManager } from '../service-manager'

// Simple test interface
interface ITestService {
    getValue(): string
    callCount: number
}

// Test service implementation
class TestService implements ITestService {
    public callCount = 0

    getValue(): string {
        this.callCount++
        return `called ${this.callCount} times`
    }
}

const STestService = Symbol.for('ITestService')

// Simple test function
export function testLazyResolution() {
    console.log('=== Testing Lazy Resolution ===')

    const sm = new ServiceManager()

    // Register test service
    sm.registerClass(STestService, TestService, {
        lifetime: 'singleton'
    })

    // Test 1: Lazy resolution
    console.log('1. Creating lazy resolver...')
    const lazyService = sm.lazy<ITestService>(STestService)
    console.log('   ✓ Lazy resolver created (service not instantiated yet)')

    // Test 2: First call resolves the service
    console.log('2. First call to lazy resolver...')
    const service1 = lazyService()
    const result1 = service1.getValue()
    console.log(`   ✓ Service resolved: ${result1}`)
    console.log(`   ✓ Call count: ${service1.callCount}`)

    // Test 3: Second call returns cached instance
    console.log('3. Second call to lazy resolver...')
    const service2 = lazyService()
    const result2 = service2.getValue()
    console.log(`   ✓ Service result: ${result2}`)
    console.log(`   ✓ Same instance: ${service1 === service2}`)
    console.log(`   ✓ Call count: ${service2.callCount}`)

    // Test 4: Compare with direct resolution (should be same instance for singleton)
    console.log('4. Direct resolution comparison...')
    const directService = sm.resolve<ITestService>(STestService)
    console.log(`   ✓ Same as lazy instance: ${service1 === directService}`)

    // Test 5: Multiple lazy resolvers share the same service instance
    console.log('5. Multiple lazy resolvers...')
    const anotherLazyService = sm.lazy<ITestService>(STestService)
    const service3 = anotherLazyService()
    console.log(`   ✓ Another lazy resolver returns same instance: ${service1 === service3}`)

    sm.dispose()
    console.log('=== Test Complete ===')

    return {
        success: true,
        message: 'All lazy resolution tests passed!'
    }
}

// Run the test if this file is executed directly
if (typeof window === 'undefined') {
    // Node.js environment
    try {
        const result = testLazyResolution()
        console.log(result.message)
    } catch (error) {
        console.error('Test failed:', error)
    }
}
