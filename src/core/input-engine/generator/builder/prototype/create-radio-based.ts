import { IDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { RadioBaseInput } from '@core/input-engine/variants/radio-base/radio-base-input'
import { IRadioBaseInput } from '@core/input-engine/variants/radio-base/radio-base-input.types'
import { sequenceInitializer } from '@core/managers/initialization-manager/sequence-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IFieldBuilder } from '../field-builder'
import { baseDependencyList } from '../settings/dependency.list.settings'
import { instanciateClickBasedInput } from '../variant-constructors/instanciate-click-based'
import { instanciateOptionBasedInput } from '../variant-constructors/instanciate-option-based'
import { instanciateRadioBasedInput } from '../variant-constructors/instanciate-radio-based'

export const createRadioBased = function (
    this: IFieldBuilder,
    config: IDependencyConfiguration
): IRadioBaseInput | undefined {
    try {
        if (!config.verify()) {
            return undefined
        }

        const _baseInput = this.createBaseInput(config)
        const _clickInput = instanciateClickBasedInput(_baseInput)
        const _optionInput = instanciateOptionBasedInput(_baseInput!)
        const _radioInput = instanciateRadioBasedInput(_baseInput!, _clickInput!, _optionInput)
        const dependencies = baseDependencyList(_baseInput, _clickInput, _optionInput, _radioInput)

        sequenceInitializer(config, dependencies)

        if (!(_radioInput instanceof RadioBaseInput)) {
            throw Error(`The immediate clone of ${RadioBaseInput.name} is not well formed!`)
        }
        return _radioInput
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            createRadioBased.name,
            `an error has occured when initializing ${createRadioBased.name} class: ${e.message}`
        )
        return undefined
    }
}
