import { TextBaseInput, TextBaseInputInstance } from '@core/fields/text-base-input/text-base-input'
import { ITextBaseInput } from '@core/fields/text-base-input/text-base-input.types'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { IFieldBuilder } from '../field-builder'

export const createTextBased = function (this: IFieldBuilder): ITextBaseInput | undefined {
    try {
        if (!this.checkInitialized() || !this) {
            return undefined
        }
        const _textInput = new TextBaseInput()
        TextBaseInputInstance(_textInput)

        _textInput.initialize(this)

        return { ..._textInput } as ITextBaseInput
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            createTextBased.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return undefined
    }
}
