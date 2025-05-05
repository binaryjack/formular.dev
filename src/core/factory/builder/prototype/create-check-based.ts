import {
    CheckBoxInput,
    CheckBoxInputInstance
} from '@core/fields/check-box-base-input/check-box-base-input'
import { ICheckBoxBaseInput } from '@core/fields/check-box-base-input/check-box-base-input.types'
import {
    ClickBaseInput,
    ClickBaseInputInstance
} from '@core/fields/click-base-input/click-base-input'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { IFieldBuilder } from '../field-builder'

export const createCheckBased = function (this: IFieldBuilder): ICheckBoxBaseInput | undefined {
    try {
        if (!this.checkInitialized() || !this) {
            return undefined
        }
        const _clickInput = new ClickBaseInput()
        ClickBaseInputInstance(_clickInput)

        _clickInput.initialize(this)
        const _checkInput = new CheckBoxInput()
        CheckBoxInputInstance(_checkInput)

        this._checkInput.initialize(_clickInput)
        return { ..._checkInput } as ICheckBoxBaseInput
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            createCheckBased.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return undefined
    }
}
