import {
    DependencyConfiguration,
    IDependencyConfiguration
} from '@core/fields/field-base-input/configuration/dependency-configuration'
import { OptionBaseInput } from '@core/fields/option-based-input/option-base-input'
import { IOptionBaseInput } from '@core/fields/option-based-input/option-base-input.types'
import { logManager } from '@core/general-logging-manager/log-manager'
import { IFieldBuilder } from '../field-builder'

export const createOptionBased = function (
    this: IFieldBuilder,
    config: IDependencyConfiguration
): IOptionBaseInput | undefined {
    try {
        const _optionInput = new OptionBaseInput(new DependencyConfiguration(params, undefined))

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
