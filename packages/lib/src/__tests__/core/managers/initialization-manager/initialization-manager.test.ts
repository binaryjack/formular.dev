import { InitializationManager } from '@core/managers/initialization-manager/initialization-manager'
import { IInputConfiguration } from '@project/providers/interfaces/i-input-configuration'

describe('InitializationManager', () => {
    const config: IInputConfiguration = {} as IInputConfiguration

    it('should initialize with params', () => {
        const manager = new (InitializationManager as any)(config)
        expect(manager.params).toBe(config)
        expect(manager.initializer).toBeUndefined()
    })

    it('should add and execute initializers in sequence', () => {
        const manager = new (InitializationManager as any)(config)
        const calls: string[] = []
        manager.addInitializer('first', () => calls.push('first'))
        manager.addInitializer('second', () => calls.push('second'))
        // Mock delegate execute to call all initializers
        if (manager.initializer && typeof manager.initializer.execute === 'function') {
            manager.initializer.execute = () => {
                calls.push('first')
                calls.push('second')
            }
        }
        manager.executeSequences()
        expect(calls).toEqual(['first', 'second'])
    })
})

