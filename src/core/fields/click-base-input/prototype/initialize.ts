import { initializer } from '@core/fields/field-base-input/initializers/initializer'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../../events/events.types'
import { IClickBaseInput } from '../click-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (this: IClickBaseInput) {
    initializer(initialize.name, this, this.field, [
        nnv(
            newEvent(this.name, initialize.name, 'onClick', 'field.click'),
            this.handleOnClicked.bind(this)
        )
    ])
}
