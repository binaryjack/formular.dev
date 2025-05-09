import { IDependencyConfiguration } from '@core/fields/field-base-input/configuration/dependency-configuration'
import { SelectBaseInput } from '@core/fields/select-base-input/select-base-input'
import { ISelectBaseInput } from '@core/fields/select-base-input/select-base-input.types'
import { logManager } from '@core/general-logging-manager/log-manager'
import { IFieldBuilder } from '../field-builder'

export const createSelectBased = function (
    this: IFieldBuilder,
    config: IDependencyConfiguration
): ISelectBaseInput | undefined {
    try {
        const _selectInput = new SelectBaseInput()

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
