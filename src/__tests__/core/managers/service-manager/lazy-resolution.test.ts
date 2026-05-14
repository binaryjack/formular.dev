import { ServiceManager } from '@core/managers/service-manager/service-manager'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'

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

describe('ServiceManager Lazy Resolution', () => {
    let serviceManager: IServiceManager

    beforeEach(() => {
        serviceManager = new ServiceManager()
        serviceManager.registerClass(STestService, TestService, {
            lifetime: 'singleton'
        })
    })

    it('should create lazy resolver without instantiating service', () => {
        const lazyService = serviceManager.lazy<ITestService>(STestService)

        expect(lazyService).toBeInstanceOf(Function)
        expect(typeof lazyService).toBe('function')
    })

    it('should resolve service on first call to lazy resolver', () => {
        const lazyService = serviceManager.lazy<ITestService>(STestService)

        const service = lazyService()
        const result = service.getValue()

        expect(service).toBeInstanceOf(TestService)
        expect(result).toBe('called 1 times')
        expect(service.callCount).toBe(1)
    })

    it('should return same instance on multiple calls (singleton)', () => {
        const lazyService = serviceManager.lazy<ITestService>(STestService)

        const service1 = lazyService()
        const service2 = lazyService()

        expect(service1).toBe(service2)
        expect(service1.callCount).toBe(0) // Haven't called getValue yet

        service1.getValue()
        expect(service1.callCount).toBe(1)
        expect(service2.callCount).toBe(1) // Same instance
    })

    it('should work with multiple lazy resolvers for same service', () => {
        const lazyService1 = serviceManager.lazy<ITestService>(STestService)
        const lazyService2 = serviceManager.lazy<ITestService>(STestService)

        const service1 = lazyService1()
        const service2 = lazyService2()

        expect(service1).toBe(service2) // Same singleton instance
    })

    it('should match directly resolved instance for singleton', () => {
        const lazyService = serviceManager.lazy<ITestService>(STestService)
        const directService = serviceManager.resolve<ITestService>(STestService)
        const lazyInstance = lazyService()

        expect(lazyInstance).toBe(directService) // Same singleton instance
    })
})
