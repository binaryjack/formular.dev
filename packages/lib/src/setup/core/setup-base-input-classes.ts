import { InputBase } from '@core/input-engine/core/input-base/input-base'
import { SInputBase } from '@core/input-engine/core/input-base/input-base.types'
import { CheckBoxInput } from '@core/input-engine/variants/check-box-base/check-box-base-input'
import { SCheckBoxBaseInput } from '@core/input-engine/variants/check-box-base/check-box-base-input.types'
import { ClickBaseInput } from '@core/input-engine/variants/click-base/click-base-input'
import { SClickBaseInput } from '@core/input-engine/variants/click-base/click-base-input.types'
import { DrawerBaseInput } from '@core/input-engine/variants/drawer-base/drawer-base-input'
import { SDrawerBaseInput } from '@core/input-engine/variants/drawer-base/drawer-base-input.types'
import { MaskedBaseInput } from '@core/input-engine/variants/masked-base/masked-base-input'
import { SMaskedBaseInput } from '@core/input-engine/variants/masked-base/masked-base-input.types'
import { NumericBaseInput } from '@core/input-engine/variants/numeric-base/numeric-base-input'
import { SNumericBaseInput } from '@core/input-engine/variants/numeric-base/numeric-base-input.types'
import { OptionBaseInput } from '@core/input-engine/variants/option-based/option-base-input'
import { SOptionBaseInput } from '@core/input-engine/variants/option-based/option-base-input.types'
import { RadioBaseInput } from '@core/input-engine/variants/radio-base/radio-base-input'
import { SRadioBaseInput } from '@core/input-engine/variants/radio-base/radio-base-input.types'
import { SelectBaseInput } from '@core/input-engine/variants/select-base/select-base-input'
import { SSelectBaseInput } from '@core/input-engine/variants/select-base/select-base-input.types'
import { TextBaseInput } from '@core/input-engine/variants/text-base/text-base-input'
import { STextBaseInput } from '@core/input-engine/variants/text-base/text-base-input.types'
import { SDomManager } from '@core/managers/dom-manager/dom-manager.types'
import { SNotificationManager } from '@core/managers/notification-manager/notification-manager.types'
import {
    IServiceManager,
    SServiceManager
} from '@core/managers/service-manager/service-manager.types'
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
    sm.registerClass(SInputBase, InputBase, {
        lifetime: 'transient',
        dependencies: [
            SServiceManager,
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
    sm.registerClass(STextBaseInput, TextBaseInput, {
        lifetime: 'transient',
        dependencies: []
    })
    sm.registerClass(SOptionBaseInput, OptionBaseInput, {
        lifetime: 'transient',
        dependencies: []
    })
    sm.registerClass(SClickBaseInput, ClickBaseInput, {
        lifetime: 'transient',
        dependencies: []
    })
    sm.registerClass(SMaskedBaseInput, MaskedBaseInput, {
        lifetime: 'transient',
        dependencies: []
    })
    sm.registerClass(SRadioBaseInput, RadioBaseInput, {
        lifetime: 'transient',
        dependencies: []
    })
    sm.registerClass(SSelectBaseInput, SelectBaseInput, {
        lifetime: 'transient',
        dependencies: []
    })
    sm.registerClass(SNumericBaseInput, NumericBaseInput, {
        lifetime: 'transient',
        dependencies: []
    })
    sm.registerClass(SDrawerBaseInput, DrawerBaseInput, {
        lifetime: 'transient',
        dependencies: []
    })
    sm.registerClass(SClickBaseInput, ClickBaseInput, {
        lifetime: 'transient',
        dependencies: []
    })
    sm.registerClass(SCheckBoxBaseInput, CheckBoxInput, {
        lifetime: 'transient',
        dependencies: []
    })
}
