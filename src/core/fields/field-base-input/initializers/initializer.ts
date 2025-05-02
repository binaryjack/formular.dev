import { INotifier } from '@core/notifiable-entity/notifications.types'
import { IFieldInputBase, IFieldInputExtended } from '../field-input-base-types'

export const initializer = <T extends IFieldInputBase>(
    caller: string,
    context: IFieldInputExtended<T>,
    fieldInput: T,
    notifiers: INotifier[]
) => {
    if (!context?.field) {
        return
    }
    try {
        context._field = fieldInput

        for (const n of notifiers) {
            context?.field()?.notifier()?.accept(n)
        }
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
