import {
    OptionBaseInput,
    OptionBaseInputInstance
} from '@core/fields/option-based-input/option-base-input'
import { IOptionBaseInput } from '@core/fields/option-based-input/option-base-input.types'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { IFieldBuilder } from '../field-builder'

export const createOptionBased = function (this: IFieldBuilder): IOptionBaseInput | undefined {
    try {
        if (!this.checkInitialized() || !this) {
            return undefined
        }
        const _optionInput = new OptionBaseInput()
        OptionBaseInputInstance(_optionInput)

        _optionInput.initialize(this)
        return { ..._optionInput } as IOptionBaseInput
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            createOptionBased.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return undefined
    }
}
