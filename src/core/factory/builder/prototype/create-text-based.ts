import { IDependencyConfiguration } from '@core/fields/field-base-input/configuration/dependency-configuration'
import {
    IFieldBaseInput,
    IInitializableDependency
} from '@core/fields/field-base-input/field-input-base-types'
import { TextBaseInput } from '@core/fields/text-base-input/text-base-input'
import { ITextBaseInput } from '@core/fields/text-base-input/text-base-input.types'
import { logManager } from '@core/general-logging-manager/log-manager'
import { IFieldBuilder } from '../field-builder'
import { initializeDependencies } from '../initializer/dependency-initializer'

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

        const dependencies: IInitializableDependency[] = [
            _baseInput.dom,
            _baseInput.tracker,
            _baseInput.drawer,
            _baseInput.styler,
            _baseInput.notifier,
            _baseInput.validationStrategy,
            _baseInput.valueStrategy,
            _baseInput,
            _textInput
        ]

        initializeDependencies(config, dependencies)

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
