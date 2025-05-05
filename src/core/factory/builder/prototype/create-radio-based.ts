import {
    ClickBaseInput,
    ClickBaseInputInstance
} from '@core/fields/click-base-input/click-base-input'
import {
    OptionBaseInput,
    OptionBaseInputInstance
} from '@core/fields/option-based-input/option-base-input'
import {
    RadioBaseInput,
    RadioBaseInputInstance
} from '@core/fields/radio-base-input/radio-base-input'
import { IRadioBaseInput } from '@core/fields/radio-base-input/radio-base-input.types'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { IFieldBuilder } from '../field-builder'

export const createRadioBased = function (this: IFieldBuilder): IRadioBaseInput | undefined {
    try {
        if (!this.checkInitialized() || !this) {
            return undefined
        }
        const _clickInput = new ClickBaseInput()
        ClickBaseInputInstance(_clickInput)

        _clickInput.initialize(this)
        const _optionInput = new OptionBaseInput()
        OptionBaseInputInstance(_optionInput)

        _optionInput.initialize(_clickInput)
        const _radioInput = new RadioBaseInput()
        RadioBaseInputInstance(_radioInput)

        _radioInput.initialize(_optionInput)
        return { ..._radioInput } as IRadioBaseInput
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            createRadioBased.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return undefined
    }
}
