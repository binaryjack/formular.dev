import {
    ClickBaseInput,
    ClickBaseInputInstance
} from '@core/fields/click-base-input/click-base-input'
import { IClickBaseInput } from '@core/fields/click-base-input/click-base-input.types'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { IFieldBuilder } from '../field-builder'

export const createClickBased = function (this: IFieldBuilder): IClickBaseInput | undefined {
    try {
        if (!this.checkInitialized() || !this) {
            return undefined
        }
        const _clickInput = new ClickBaseInput()
        ClickBaseInputInstance(_clickInput)

        _clickInput.initialize(this)
        return { ..._clickInput } as IClickBaseInput
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            createClickBased.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return undefined
    }
}
