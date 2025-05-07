import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { INotifiableEntity } from '@core/notifiable-entity/notifiable-entity-base.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const initializeNotifier = function (
    this: IFieldBaseInput,
    notifierInstance: INotifiableEntity
): IFieldBaseInput {
    try {
        if (!this.name) {
            throw Error('properties must be initialized')
        }
        if (!this?.tracker) {
            throw Error('tracker must be initialized')
        }

        if (!notifierInstance) {
            throw Error('notifierInstance must be initialized globaly.')
        }

        this.notifier = notifierInstance
        return this
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            initializeNotifier.name,
            `an error has occured when initializing initializeNotifier ${this.name} class: ${e.message}`
        )
        return this
    }
}
