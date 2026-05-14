import { TrackingManager } from '@core/managers/tracking-manager/tracker-manager'
import { ITrackingOutputProvider } from '@core/managers/tracking-manager/tracker-manager.types'

describe('TrackingManager', () => {
    const mockProvider: ITrackingOutputProvider = {
        id: 'mock',
        funcAll: jest.fn(),
        func: jest.fn()
    } as any

    it('should initialize with default values', () => {
        const manager = new (TrackingManager as any)() as any
        expect(manager._trackingData).toEqual([])
        expect(manager._outputProviders).toEqual([])
        expect(manager._trackingIsActive).toBe(true)
        // For function expressions, .name is an empty string, so dependencyName will be ''
        expect(manager.dependencyName).toBe('')
    })

    it('should accept output providers', () => {
        const manager = new (TrackingManager as any)([mockProvider]) as any
        expect(manager._outputProviders).toEqual([mockProvider])
    })

    it('should warn if providers is an empty array', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
        new (TrackingManager as any)([])
        expect(warnSpy).toHaveBeenCalledWith('Tracker was defined using default output provider')
        warnSpy.mockRestore()
    })

    it('should not allow dependencyName to be changed or deleted', () => {
        const manager = new (TrackingManager as any)() as any
        expect(() => {
            manager.dependencyName = 'Other'
        }).toThrow()
        expect(() => {
            delete manager.dependencyName
        }).toThrow()
    })
})
