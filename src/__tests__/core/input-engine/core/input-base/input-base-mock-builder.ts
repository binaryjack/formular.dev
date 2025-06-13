import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IDrawerBaseInput } from '@core/input-engine/variants/drawer-base/drawer-base-input.types'
import { IDomManager } from '@core/managers/dom-manager/dom-manager.types'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import { IStyleManager } from '@core/managers/style-manager/style-manager.types'
import { ITrackingManager } from '@core/managers/tracking-manager/tracker-manager.types'
import { IValidationManager } from '@core/managers/validation-manager/validation-manager.types'
import { IValueManager } from '@core/managers/value-manager/value-manager.types'
import { InputBase } from '../../../../../core/input-engine/core/input-base/input-base'

export interface InputBaseMockBuilderOptions {
    descriptor?: Partial<IFieldDescriptor>
    domManager?: Partial<IDomManager<HTMLInputElement>>
    notificationManager?: Partial<INotificationManager>
    trackingManager?: Partial<ITrackingManager>
    validationManager?: Partial<IValidationManager>
    valueManager?: Partial<IValueManager>
    drawerBase?: Partial<IDrawerBaseInput>
    styleManager?: Partial<IStyleManager>
}

export function buildInputBaseMock(options: InputBaseMockBuilderOptions = {}) {
    const {
        descriptor = { name: 'mockField' },
        domManager = {},
        notificationManager = {},
        trackingManager = {},
        validationManager = { triggerKeyWordType: ['onChange'] },
        valueManager = {},
        drawerBase = {},
        styleManager = {}
    } = options

    return new (InputBase as any)(
        descriptor as IFieldDescriptor,
        domManager as IDomManager<HTMLInputElement>,
        notificationManager as INotificationManager,
        trackingManager as ITrackingManager,
        validationManager as IValidationManager,
        valueManager as IValueManager,
        drawerBase as IDrawerBaseInput,
        styleManager as IStyleManager
    )
}
