import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { InputBase } from '@core/input-engine/core/input-base/input-base'
import { IDrawerBaseInput } from '@core/input-engine/variants/drawer-base/drawer-base-input.types'
import { IDomManager } from '@core/managers/dom-manager/dom-manager.types'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import { IStyleManager } from '@core/managers/style-manager/style-manager.types'
import { ITrackingManager } from '@core/managers/tracking-manager/tracker-manager.types'
import { IValidationManager } from '@core/managers/validation-manager/validation-manager.types'
import { IValueManager } from '@core/managers/value-manager/value-manager.types'

describe('InputBase', () => {
    it('should initialize with provided managers and descriptor', () => {
        const descriptor = { name: 'testField' } as IFieldDescriptor
        const domManager = { dummy: true } as unknown as IDomManager<HTMLInputElement>
        const notificationManager = { dummy: true } as unknown as INotificationManager
        const trackingManager = { dummy: true } as unknown as ITrackingManager
        const validationManager = {
            triggerKeyWordType: ['onChange']
        } as unknown as IValidationManager
        const valueManager = { dummy: true } as unknown as IValueManager
        const drawerBase = { dummy: true } as unknown as IDrawerBaseInput
        const styleManager = { dummy: true } as unknown as IStyleManager

        const input = new (InputBase as any)(
            descriptor,
            domManager,
            notificationManager,
            trackingManager,
            validationManager,
            valueManager,
            drawerBase,
            styleManager
        )

        expect(input).toBeDefined()
        expect(input.dependencyName).toBe('InputBase')
        expect(input.isInitialized).toBe(false)
        expect(input.validationResults).toEqual([])
        expect(input.value).toBe(null)
        expect(input.isFocus).toBe(false)
    })

    it('should trigger notifyChange on value change', () => {
        const notificationManager = {
            debounceNotify: jest.fn()
        } as any
        const validationManager = {
            triggerKeyWordType: ['onChange']
        } as any
        const input = new (InputBase as any)(
            { name: 'testField' },
            null,
            notificationManager,
            null,
            validationManager,
            null,
            null,
            null
        )
        input.value = 'newValue'
        expect(notificationManager.debounceNotify).toHaveBeenCalled()
    })

    it('should trigger notifyChange on isFocus change', () => {
        const notificationManager = {
            debounceNotify: jest.fn()
        } as any
        const validationManager = {
            triggerKeyWordType: ['onChange']
        } as any
        const input = new (InputBase as any)(
            { name: 'testField' },
            null,
            notificationManager,
            null,
            validationManager,
            null,
            null,
            null
        )
        input.isFocus = true
        expect(notificationManager.debounceNotify).toHaveBeenCalled()
    })
})
