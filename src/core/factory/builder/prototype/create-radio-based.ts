import { IDependencyConfiguration } from '@core/fields/field-base-input/configuration/dependency-configuration'
import { RadioBaseInput } from '@core/fields/radio-base-input/radio-base-input'
import { IRadioBaseInput } from '@core/fields/radio-base-input/radio-base-input.types'
import { logManager } from '@core/general-logging-manager/log-manager'
import { IFieldBuilder } from '../field-builder'

export const createRadioBased = function (
    this: IFieldBuilder,
    config: IDependencyConfiguration
): IRadioBaseInput | undefined {
    try {
        const _radioInput = new RadioBaseInput()

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
