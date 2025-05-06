import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { NotifiableEntity } from '@core/notifiable-entity/notifiable-entity'
import { IFieldBaseInput } from '../field-input-base-types'

export const initializeNotifier = function (this: IFieldBaseInput): IFieldBaseInput {
    try {
        if (!this.name) {
            throw Error('properties must be initialized')
        }
        if (!this?.tracker) {
            throw Error('tracker must be initialized')
        }
        this.notifier = new NotifiableEntity()
        return this
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            initializeNotifier.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return this
    }
}
