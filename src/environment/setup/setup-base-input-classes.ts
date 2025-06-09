import { InputBase } from '@core/input-engine/core/input-base/input-base'
import { CheckBoxInput } from '@core/input-engine/variants/check-box-base/check-box-base-input'
import { ClickBaseInput } from '@core/input-engine/variants/click-base/click-base-input'
import { DrawerBaseInput } from '@core/input-engine/variants/drawer-base/drawer-base-input'
import { SDrawerBaseInput } from '@core/input-engine/variants/drawer-base/drawer-base-input.types'
import { MaskedBaseInput } from '@core/input-engine/variants/masked-base/masked-base-input'
import { NumericBaseInput } from '@core/input-engine/variants/numeric-base/numeric-base-input'
import { OptionBaseInput } from '@core/input-engine/variants/option-based/option-base-input'
import { RadioBaseInput } from '@core/input-engine/variants/radio-base/radio-base-input'
import { SelectBaseInput } from '@core/input-engine/variants/select-base/select-base-input'
import { TextBaseInput } from '@core/input-engine/variants/text-base/text-base-input'
import { SDomManager } from '@core/managers/dom-manager/dom-manager.types'
import { SNotificationManager } from '@core/managers/notification-manager/notification-manager.types'
import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { SStyleManager } from '@core/managers/style-manager/style-manager.types'
import { STrackingManager } from '@core/managers/tracking-manager/tracker-manager.types'
import { SValidationManager } from '@core/managers/validation-manager/validation-manager.types'
import { SValueManager } from '@core/managers/value-manager/value-manager.types'

export const setupBaseInputClasses = function (sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }
    sm.registerClass(InputBase, {
        lifetime: 'transient',
        dependencies: [
            null,
            SDomManager,
            SNotificationManager,
            STrackingManager,
            SValidationManager,
            SValueManager,
            SDrawerBaseInput,
            SStyleManager
        ]
    })
    sm.registerClass(TextBaseInput, {
        lifetime: 'transient',
        dependencies: []
    })
    sm.registerClass(OptionBaseInput, {
        lifetime: 'transient',
        dependencies: []
    })
    sm.registerClass(ClickBaseInput, {
        lifetime: 'transient',
        dependencies: []
    })
    sm.registerClass(MaskedBaseInput, {
        lifetime: 'transient',
        dependencies: []
    })
    sm.registerClass(RadioBaseInput, {
        lifetime: 'transient',
        dependencies: []
    })
    sm.registerClass(SelectBaseInput, {
        lifetime: 'transient',
        dependencies: []
    })
    sm.registerClass(NumericBaseInput, {
        lifetime: 'transient',
        dependencies: []
    })
    sm.registerClass(DrawerBaseInput, {
        lifetime: 'transient',
        dependencies: []
    })
    sm.registerClass(ClickBaseInput, {
        lifetime: 'transient',
        dependencies: []
    })
    sm.registerClass(CheckBoxInput, {
        lifetime: 'transient',
        dependencies: []
    })
}
