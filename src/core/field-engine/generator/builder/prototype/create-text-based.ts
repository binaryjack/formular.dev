import { IDependencyConfiguration } from '@core/field-engine/core/input-base/configuration/dependency-configuration'
import { IFieldBaseInput } from '@core/field-engine/core/input-base/field-input-base-types'
import { TextBaseInput } from '@core/field-engine/variants/text-base/text-base-input'
import { ITextBaseInput } from '@core/field-engine/variants/text-base/text-base-input.types'
import { sequenceInitializer } from '@core/managers/initialization-manager/sequence-initializer'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IFieldBuilder } from '../field-builder'
import { baseDependencyList } from '../settings/dependency.list.settings'

const instanciateTextBaseInput = (field: IFieldBaseInput): ITextBaseInput => {
    const _textInput = new TextBaseInput()
    /** Assign base field dependency */
    _textInput.field = field
    return _textInput
}

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
        const dependencies = baseDependencyList(_baseInput, _baseInput, _textInput)

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
