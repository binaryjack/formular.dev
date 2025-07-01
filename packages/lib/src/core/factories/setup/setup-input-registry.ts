import {
    IServiceManager,
    SServiceManager
} from '@core/managers/service-manager/service-manager.types'
import {
    MaskedWithDrawerInputService,
    SMaskedWithDrawerInputService
} from '../input-builder-services'
import { BaseInputService, SBaseInputService } from '../input-builder-services/base-input-service'
import {
    CheckInputService,
    SCheckInputService
} from '../input-builder-services/check-input-service'
import {
    ClickInputService,
    SClickInputService
} from '../input-builder-services/click-input-service'
import {
    MaskedInputService,
    SMaskedInputService
} from '../input-builder-services/masked-input-service'
import {
    OptionInputService,
    SOptionInputService
} from '../input-builder-services/option-input-service'
import {
    RadioInputService,
    SRadioInputService
} from '../input-builder-services/radio-input-service'
import {
    SelectInputService,
    SSelectInputService
} from '../input-builder-services/select-input-service'
import { STextInputService, TextInputService } from '../input-builder-services/text-input-service'

export const setupInputsRegistry = function (sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }

    sm.registerClass(SBaseInputService, BaseInputService, {
        lifetime: 'transient',
        dependencies: [SServiceManager]
    })

    sm.registerClass(SCheckInputService, CheckInputService, {
        lifetime: 'transient',
        dependencies: [SServiceManager]
    })

    sm.registerClass(SClickInputService, ClickInputService, {
        lifetime: 'transient',
        dependencies: [SServiceManager]
    })

    sm.registerClass(SMaskedInputService, MaskedInputService, {
        lifetime: 'transient',
        dependencies: [SServiceManager]
    })

    sm.registerClass(SMaskedWithDrawerInputService, MaskedWithDrawerInputService, {
        lifetime: 'transient',
        dependencies: [SServiceManager]
    })

    sm.registerClass(SOptionInputService, OptionInputService, {
        lifetime: 'transient',
        dependencies: [SServiceManager]
    })

    sm.registerClass(SRadioInputService, RadioInputService, {
        lifetime: 'transient',
        dependencies: [SServiceManager]
    })

    sm.registerClass(SSelectInputService, SelectInputService, {
        lifetime: 'transient',
        dependencies: [SServiceManager]
    })

    sm.registerClass(STextInputService, TextInputService, {
        lifetime: 'transient',
        dependencies: [SServiceManager]
    })
}
