import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { IFieldBuilder } from '../field-builder'

export const initialize = function (this: IFieldBuilder): IFieldBuilder {
    try {
        return this
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            initialize.name,
            `an error has occured when initializing ${this.name} class: ${e.message}`
        )
        return this
    }
}
