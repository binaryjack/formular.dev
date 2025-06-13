import { ServiceManager } from '../service-manager'
import { IServiceManager } from '../service-manager.types'

describe('ServiceManager Core', () => {
    let serviceManager: IServiceManager
    let parentManager: IServiceManager

    beforeEach(() => {
        parentManager = new ServiceManager()
        serviceManager = new ServiceManager(parentManager)
    })

    it('should initialize services, singletonInstances, and scopedInstances as Maps', () => {
        expect(serviceManager.services).toBeInstanceOf(Map)
        expect(serviceManager.singletonInstances).toBeInstanceOf(Map)
        expect(serviceManager.scopedInstances).toBeInstanceOf(Map)
    })

    it('should set parent correctly and make it non-writable', () => {
        expect(serviceManager.parent).toBe(parentManager)
        expect(() => {
            ;(serviceManager as any).parent = null
        }).toThrow()
    })

    it('should initialize resolutionStack as a Set', () => {
        expect(serviceManager.resolutionStack).toBeInstanceOf(Set)
    })

    it('should set isDisposed to false initially', () => {
        expect(serviceManager.isDisposed).toBe(false)
    })

    it('should not allow redefinition of core properties', () => {
        expect(() => {
            Object.defineProperty(serviceManager, 'services', { value: 123 })
        }).toThrow()
        expect(() => {
            delete (serviceManager as any).services
        }).toThrow()
    })

    it('should enumerate core properties', () => {
        const keys = Object.keys(serviceManager)
        expect(keys).toEqual(
            expect.arrayContaining([
                'services',
                'singletonInstances',
                'scopedInstances',
                'parent',
                'resolutionStack',
                'isDisposed'
            ])
        )
    })
})
