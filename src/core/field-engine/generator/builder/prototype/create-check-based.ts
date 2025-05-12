import { IDependencyConfiguration } from '@core/field-engine/core/configuration/dependency-configuration'
import { CheckBoxInput } from '@core/field-engine/variants/check-box-base/check-box-base-input'
import { ICheckBoxBaseInput } from '@core/field-engine/variants/check-box-base/check-box-base-input.types'
import { logManager } from '@core/managers/log-manager/log-manager'
import { IFieldBuilder } from '../field-builder'

export const createCheckBased = function (
    this: IFieldBuilder,
    config: IDependencyConfiguration
): ICheckBoxBaseInput | undefined {
    try {
        const _checkInput = new CheckBoxInput()

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
