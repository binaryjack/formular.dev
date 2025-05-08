import { ClickBaseInput } from '@core/fields/click-base-input/click-base-input'
import { IClickBaseInput } from '@core/fields/click-base-input/click-base-input.types'
import {
    DependencyConfiguration,
    IDependencyConfiguration
} from '@core/fields/field-base-input/configuration/dependency-configuration'
import { logManager } from '@core/general-logging-manager/log-manager'
import { IFieldBuilder, IFieldInitializationParameters } from '../field-builder'

export const createClickBased = function (
    this: IFieldBuilder,
    config: IDependencyConfiguration
): IClickBaseInput | undefined {
    try {
        const _clickInput = new ClickBaseInput(new DependencyConfiguration(params, undefined))

        if (!(_clickInput instanceof ClickBaseInput)) {
            throw Error(`The immediate clone of ${ClickBaseInput.name} is not well formed!`)
        }
        return _clickInput
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            createClickBased.name,
            `an error has occured when initializing ${createClickBased.name} class: ${e.message}`
        )
        return undefined
    }
}
