import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import { BaseInputService } from '../input-builder-services/base-input-service'
import { CheckInputService } from '../input-builder-services/check-input-service'
import { ClickInputService } from '../input-builder-services/click-input-service'
import { MaskedInputService } from '../input-builder-services/masked-input-service'
import { OptionInputService } from '../input-builder-services/option-input-service'
import { RadioInputService } from '../input-builder-services/radio-input-service'
import { SelectInputService } from '../input-builder-services/select-input-service'
import { TextInputService } from '../input-builder-services/text-input-service'

export const setupInputsRegistry = function (sm: IServiceManager) {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }

    sm.registerClass(BaseInputService, {
        lifetime: 'transient',
        dependencies: []
    })

    sm.registerClass(CheckInputService, {
        lifetime: 'transient',
        dependencies: []
    })

    sm.registerClass(ClickInputService, {
        lifetime: 'transient',
        dependencies: []
    })

    sm.registerClass(MaskedInputService, {
        lifetime: 'transient',
        dependencies: []
    })

    sm.registerClass(OptionInputService, {
        lifetime: 'transient',
        dependencies: []
    })

    sm.registerClass(RadioInputService, {
        lifetime: 'transient',
        dependencies: []
    })

    sm.registerClass(SelectInputService, {
        lifetime: 'transient',
        dependencies: []
    })

    sm.registerClass(TextInputService, {
        lifetime: 'transient',
        dependencies: []
    })
}
