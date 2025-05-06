import { initializer } from '@core/fields/field-base-input/initializers/initializer'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../../events/events.types'
import { ICheckBoxBaseInput } from '../check-box-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (this: ICheckBoxBaseInput) {
    initializer(
        initialize.name,
        this,
        this.field,
        [
            nnv(
                newEvent(this.name, setup.name, 'onChange', this.handleOnChanged.name),
                this.handleOnChanged.bind(this)
            )
        ],
        (e) => {}
    )
}
