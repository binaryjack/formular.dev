import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { INotifier } from '@core/notifiable-entity/notifications.types'
import { IFieldInput, IFieldInputExtended } from '../field-input-base-types'

export const initializer = <TFieldInput extends IFieldInput, TContext extends IFieldInputExtended>(
    caller: string,
    context: TContext,
    fieldInput: TFieldInput,
    notifiers?: INotifier[],
    nextInitializations?: (context: TContext) => void
) => {
    try {
        /** Initialize backing field  */
        context._field = fieldInput

        /** initialize function that's uses the field above and returns if nstancied */
        context.field = registerNewField

        if (notifiers) {
            for (const n of notifiers) {
                context?.field()?.notifier()?.accept(n)
            }
        }

        nextInitializations?.(context)
    } catch (e: any) {
        context
            .field()
            .track()
            ?.internalCritical(
                caller,
                `an error has occured when initializing ${context.name} class: ${e.message}`
            )
    }
}

export const registerNewField = function <TContext extends IFieldInputExtended>(this: TContext) {
    if (!this._field) {
        generalExceptionHandler(
            undefined,
            'critical',
            this.name,
            `Unable to instanciate ${this.name} no fieldInput was provided!`
        )
    }
    return this._field
}
