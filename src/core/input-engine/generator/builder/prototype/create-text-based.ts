import { IDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { TextBaseInput } from '@core/input-engine/variants/text-base/text-base-input'
import { ITextBaseInput } from '@core/input-engine/variants/text-base/text-base-input.types'
import { sequenceInitializer } from '@core/managers/initialization-manager/sequence-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IFieldBuilder } from '../field-builder'
import { baseDependencyList } from '../settings/dependency.list.settings'
import { instanciateTextBaseInput } from '../variant-constructors/instanciate-text-based'

export const createTextBased = function (
    this: IFieldBuilder,
    config: IDependencyConfiguration
): ITextBaseInput | undefined {
    try {
        if (!config.verify()) {
            return undefined
        }

        const _baseInput = this.createBaseInput(config)
        const _textInput = instanciateTextBaseInput(_baseInput!)
        const dependencies = baseDependencyList(_baseInput, _textInput)

        sequenceInitializer(config, dependencies)

        if (!(_textInput instanceof TextBaseInput)) {
            throw Error(`The immediate clone of ${TextBaseInput.name} is not well formed!`)
        }

        return _textInput
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            createTextBased.name,
            `an error has occured when initializing ${createTextBased.name} class: ${e.message}`
        )
        return undefined
    }
}
