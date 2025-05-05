import { genericAccsssor } from '@core/fields/field-base-input/accessors/generic-accessor'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import {
    NotifiableEntity,
    NotifiableEntityInstance
} from '@core/notifiable-entity/notifiable-entity'
import { INotifiableEntity } from '@core/notifiable-entity/notifiable-entity-base.types'
import { IFieldBuilder } from '../field-builder'

export const initializeNotifier = function (this: IFieldBuilder): IFieldBuilder {
    try {
        if (!this.name) {
            throw Error('properties must be initialized')
        }
        if (!this?._tracker) {
            throw Error('tracker must be initialized')
        }
        this._notifier = new NotifiableEntity()
        NotifiableEntityInstance(this._notifier)

        this.notifier = genericAccsssor<INotifiableEntity>('_notifier')
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
