import { IDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { OptionBaseInput } from '@core/input-engine/variants/option-based/option-base-input'
import { IOptionBaseInput } from '@core/input-engine/variants/option-based/option-base-input.types'
import { sequenceInitializer } from '@core/managers/initialization-manager/sequence-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IFieldBuilder } from '../field-builder'
import { baseDependencyList } from '../settings/dependency.list.settings'
import { instanciateOptionBasedInput } from '../variant-constructors/instanciate-option-based'

export const createOptionBased = function (
    this: IFieldBuilder,
    config: IDependencyConfiguration
): IOptionBaseInput | undefined {
    try {
        if (!config.verify()) {
            return undefined
        }

        const _baseInput = this.createBaseInput(config)
        const _optionInput = instanciateOptionBasedInput(_baseInput!)
        const dependencies = baseDependencyList(_baseInput, _optionInput)

        sequenceInitializer(config, dependencies)

        if (!(_optionInput instanceof OptionBaseInput)) {
            throw Error(`The immediate clone of ${OptionBaseInput.name} is not well formed!`)
        }
        return _optionInput
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            createOptionBased.name,
            `an error has occured when initializing ${createOptionBased.name} class: ${e.message}`
        )
        return undefined
    }
}
