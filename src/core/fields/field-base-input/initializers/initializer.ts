import { INotifier } from '@core/notifiable-entity/notifications.types'
import { IFieldInput } from '../field-input-base-types'

export const initializer = <TFieldInput extends IFieldInput>(
    caller: string,
    fieldInput: TFieldInput,
    notifiers?: INotifier[],
    nextInitializations?: (fieldInput: TFieldInput) => void
) => {
    try {
        if (notifiers) {
            for (const n of notifiers) {
                fieldInput.notifier?.accept(n)
            }
        }

        nextInitializations?.(fieldInput)
    } catch (e: any) {
        fieldInput.tracker?.internalCritical(
            caller,
            `an error has occured when initializing ${context.name} class: ${e.message}`
        )
    }
}
