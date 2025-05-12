import { logManager } from '@core/managers/log-manager/log-manager'
import { IFieldBuilder } from '../field-builder'
import { IDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { RadioBaseInput } from '@core/input-engine/variants/radio-base/radio-base-input'
import { IRadioBaseInput } from '@core/input-engine/variants/radio-base/radio-base-input.types'

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
