import { IDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { SelectBaseInput } from '@core/input-engine/variants/select-base/select-base-input'
import { ISelectBaseInput } from '@core/input-engine/variants/select-base/select-base-input.types'
import { sequenceInitializer } from '@core/managers/initialization-manager/sequence-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IFieldBuilder } from '../field-builder'
import { baseDependencyList } from '../settings/dependency.list.settings'
import { instanciateClickBasedInput } from '../variant-constructors/instanciate-click-based'
import { instanciateOptionBasedInput } from '../variant-constructors/instanciate-option-based'
import { instanciateSelectBasedInput } from '../variant-constructors/instanciate-select-based'

export const createSelectBased = function (
    this: IFieldBuilder,
    config: IDependencyConfiguration
): ISelectBaseInput | undefined {
    try {
        if (!config.verify()) {
            return undefined
        }

        const _baseInput = this.createBaseInput(config)
        const _clickInput = instanciateClickBasedInput(_baseInput)
        const _optionInput = instanciateOptionBasedInput(_baseInput!)
        const _selectInput = instanciateSelectBasedInput(_baseInput!, _clickInput!, _optionInput)
        const dependencies = baseDependencyList(_baseInput, _clickInput, _optionInput, _selectInput)

        sequenceInitializer(config, dependencies)

        if (!(_selectInput instanceof SelectBaseInput)) {
            throw Error(`The immediate clone of ${SelectBaseInput.name} is not well formed!`)
        }
        return _selectInput
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            createSelectBased.name,
            `an error has occured when initializing ${createSelectBased.name} class: ${e.message}`
        )
        return undefined
    }
}
