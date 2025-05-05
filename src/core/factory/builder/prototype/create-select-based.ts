import {
    ClickBaseInput,
    ClickBaseInputInstance
} from '@core/fields/click-base-input/click-base-input'
import {
    OptionBaseInput,
    OptionBaseInputInstance
} from '@core/fields/option-based-input/option-base-input'
import {
    SelectBaseInput,
    SelectBaseInputInstance
} from '@core/fields/select-base-input/select-base-input'
import { ISelectBaseInput } from '@core/fields/select-base-input/select-base-input.types'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { IFieldBuilder } from '../field-builder'

export const createSelectBased = function (this: IFieldBuilder): ISelectBaseInput | undefined {
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
        const _selectInput = new SelectBaseInput()
        SelectBaseInputInstance(_selectInput)

        _selectInput.initialize(_optionInput)
        return { ..._selectInput } as ISelectBaseInput
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            createSelectBased.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return undefined
    }
}
