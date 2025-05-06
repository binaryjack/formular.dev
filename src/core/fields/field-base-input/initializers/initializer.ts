import { INotifier } from '@core/notifiable-entity/notifications.types'
import { IExtendedInputBase, IFieldInput } from '../field-input-base-types'

export const initializer = <TFieldInput extends IFieldInput, TContext extends IExtendedInputBase>(
    caller: string,
    context: TContext,
    fieldInput: TFieldInput,
    notifiers?: INotifier[],
    nextInitializations?: (context: TContext) => void
) => {
    try {
        /** Initialize backing field  */
        context.field = fieldInput

        if (notifiers) {
            for (const n of notifiers) {
                context?.field?.notifier?.accept(n)
            }
        }

        nextInitializations?.(context)
    } catch (e: any) {
        context.field.tracker?.internalCritical(
            caller,
            `an error has occured when initializing ${context.field.name} class: ${e.message}`
        )
    }
}
