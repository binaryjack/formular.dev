import { CheckBoxInput } from '@core/fields/check-box-base-input/check-box-base-input'
import { ICheckBoxBaseInput } from '@core/fields/check-box-base-input/check-box-base-input.types'
import {
    DependencyConfiguration,
    IDependencyConfiguration
} from '@core/fields/field-base-input/configuration/dependency-configuration'
import { logManager } from '@core/general-logging-manager/log-manager'
import { IFieldBuilder } from '../field-builder'

export const createCheckBased = function (
    this: IFieldBuilder,
    config: IDependencyConfiguration
): ICheckBoxBaseInput | undefined {
    try {
        const _checkInput = new CheckBoxInput(new DependencyConfiguration(params, undefined))

        if (!(_checkInput instanceof CheckBoxInput)) {
            throw Error(`The immediate clone of ${CheckBoxInput.name} is not well formed!`)
        }
        return _checkInput
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            createCheckBased.name,
            `an error has occured when initializing ${createCheckBased.name} class: ${e.message}`
        )
        return undefined
    }
}
