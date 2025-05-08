import { IFieldInitializationParameters } from '@core/factory/builder/field-builder'
import { abstractInitializer } from '@core/fields/field-base-input/abstract/abstract-initializer'
import { logManager } from '@core/general-logging-manager/log-manager'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../../events/events.types'
import { IClickBaseInput } from '../click-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (this: IClickBaseInput, params: IFieldInitializationParameters) {
    abstractInitializer(
        initialize.name,
        this.field,
        (e) => {
            logManager(undefined, 'info', 'initialize', e.name)
        },
        [
            nnv(
                newEvent(this.field.name, initialize.name, 'onClick', this.handleOnClicked.name),
                this.handleOnClicked.bind(this)
            )
        ]
    )
}
