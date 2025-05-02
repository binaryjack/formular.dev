import { INotifier } from '@core/notifiable-entity/notifications.types'
import { IFieldInputBase, IFieldInputExtended } from '../field-input-base-types'

export const initializer = <
    TFieldInput extends IFieldInputBase,
    TContext extends IFieldInputExtended<TFieldInput>
>(
    caller: string,
    context: TContext,
    fieldInput: TFieldInput,
    notifiers?: INotifier[],
    nextInitializations?: (context: TContext) => void
) => {
    if (!context?.field) {
        return
    }
    try {
        context._field = fieldInput

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
