import { logManager } from '@core/general-logging-manager/log-manager'
import { INotifiableEntity } from '@core/notifiable-entity/notifiable-entity-base.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const useNotifier = function (
    this: IFieldBaseInput,
    notifierInstance: INotifiableEntity
): IFieldBaseInput {
    try {
        // if (!this.name) {
        //     throw Error('properties must be initialized')
        // }
        // if (!this?.tracker) {
        //     throw Error('tracker must be initialized')
        // }

        // if (!notifierInstance) {
        //     throw Error('notifierInstance must be initialized globaly.')
        // }

        this.notifier = notifierInstance
        return this
    } catch (e: any) {
        logManager(
            undefined,
            'critical',
            useNotifier.name,
            `an error has occured when initializing initializeNotifier ${this.name} class: ${e.message}`
        )
        return this
    }
}
