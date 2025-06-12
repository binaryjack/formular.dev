import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { applifeCylceInstance } from '@project/start/app-lifecycle-instances'
import { renderHook } from '@testing-library/react'
import { useService } from './use-service'

// Mock the app lifecycle instance
jest.mock('@project/start/app-lifecycle-instances', () => ({
    applifeCylceInstance: {
        getGlobalServiceManager: jest.fn()
    }
}))

describe('useService', () => {
    type IServiceManagerWithLazy = {
        lazy: jest.Mock<any, any>
    } & Partial<IServiceManager>

    let mockServiceManager: IServiceManagerWithLazy
    let mockAppLifecycle: jest.Mocked<typeof applifeCylceInstance>

    beforeEach(() => {
        mockServiceManager = {
            lazy: jest.fn()
        }

        mockAppLifecycle = applifeCylceInstance as jest.Mocked<typeof applifeCylceInstance>
        mockAppLifecycle.getGlobalServiceManager.mockReturnValue(mockServiceManager as any)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should return a service getter function', () => {
        const { result } = renderHook(() => useService())

        expect(result.current).toHaveProperty('getService')
        expect(typeof result.current.getService).toBe('function')
    })

    it('should successfully get a service when service manager is available', () => {
        const mockService = { test: 'service' }
        const mockLazyResolver = jest.fn().mockReturnValue(mockService)
        mockServiceManager.lazy.mockReturnValue(mockLazyResolver)

        const { result } = renderHook(() => useService())
        const testSymbol = Symbol('TestService')

        const service = result.current.getService(testSymbol)

        expect(mockServiceManager.lazy).toHaveBeenCalledWith(testSymbol)
        expect(mockLazyResolver).toHaveBeenCalled()
        expect(service).toBe(mockService)
    })

    it('should throw error when service manager is not initialized', () => {
        mockAppLifecycle.getGlobalServiceManager.mockReturnValue(null as any)

        const { result } = renderHook(() => useService())
        const testSymbol = Symbol('TestService')

        expect(() => result.current.getService(testSymbol)).toThrow(
            'useService: Error serviceManager is not initialized. Please ensure the ServiceManager is set up correctly.'
        )
    })

    it('should throw error when service resolution fails', () => {
        const mockLazyResolver = jest.fn().mockImplementation(() => {
            throw new Error('Service not found')
        })
        mockServiceManager.lazy.mockReturnValue(mockLazyResolver)

        const { result } = renderHook(() => useService())
        const testSymbol = Symbol('TestService')

        expect(() => result.current.getService(testSymbol)).toThrow(
            /useService: Error resolving service.*: Service not found/
        )
    })

    it('should handle case when lazy resolver returns undefined', () => {
        mockServiceManager.lazy.mockReturnValue(undefined as any)

        const { result } = renderHook(() => useService())
        const testSymbol = Symbol('TestService')

        expect(() => result.current.getService(testSymbol)).toThrow()
    })

    it('should work with different service identifier types', () => {
        const mockService = { test: 'service' }
        const mockLazyResolver = jest.fn().mockReturnValue(mockService)
        mockServiceManager.lazy.mockReturnValue(mockLazyResolver)

        const { result } = renderHook(() => useService())

        // Test with Symbol
        const symbolId = Symbol('TestService')
        result.current.getService(symbolId)
        expect(mockServiceManager.lazy).toHaveBeenCalledWith(symbolId)

        // Test with string
        const stringId = 'TestService'
        result.current.getService(stringId)
        expect(mockServiceManager.lazy).toHaveBeenCalledWith(stringId)

        // Test with constructor
        class TestService {}
        result.current.getService(TestService)
        expect(mockServiceManager.lazy).toHaveBeenCalledWith(TestService)
    })

    it('should call getGlobalServiceManager only once per hook instance', () => {
        const { result, rerender } = renderHook(() => useService())

        // Initial render
        expect(mockAppLifecycle.getGlobalServiceManager).toHaveBeenCalledTimes(1)

        // Re-render
        rerender()
        expect(mockAppLifecycle.getGlobalServiceManager).toHaveBeenCalledTimes(1) // Still just once due to useMemo
    })

    it('should return the same getService function reference on re-renders', () => {
        const { result, rerender } = renderHook(() => useService())
        const firstGetService = result.current.getService

        rerender()
        const secondGetService = result.current.getService

        expect(firstGetService).toBe(secondGetService)
    })

    it('should handle service resolution with generic types', () => {
        interface ITestService {
            getName(): string
        }

        const mockService: ITestService = {
            getName: () => 'test'
        }

        const mockLazyResolver = jest.fn().mockReturnValue(mockService)
        mockServiceManager.lazy.mockReturnValue(mockLazyResolver)

        const { result } = renderHook(() => useService())
        const testSymbol = Symbol('ITestService')

        const service = result.current.getService<ITestService>(testSymbol)

        expect(service).toBe(mockService)
        expect(service?.getName()).toBe('test')
    })
})
