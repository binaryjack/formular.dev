import { StyleManager } from '@core/managers/style-manager/style-manager'
import { IStyleManager } from '@core/managers/style-manager/style-manager.types'

describe('StyleManager', () => {
    let manager: IStyleManager

    beforeEach(() => {
        manager = new (StyleManager as any)() as IStyleManager
    })

    it('should initialize with isInitialized as false', () => {
        expect(manager.isInitialized).toBe(false)
    })

    it('should have dependencyName set to StyleManager', () => {
        expect((manager as any).dependencyName).toBe('StyleManager')
    })

    it('should have required prototype methods', () => {
        expect(typeof manager.initialize).toBe('function')
        expect(typeof manager.classNames).toBe('function')
        expect(typeof manager.update).toBe('function')
        expect(typeof manager.get).toBe('function')
        expect(typeof manager.getFlagsList).toBe('function')
        expect(typeof manager.getFlagsObject).toBe('function')
    })
})
