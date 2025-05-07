import { initializer } from '@core/fields/field-base-input/initializers/initializer'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../../events/events.types'
import { ISelectBaseInput } from '../select-base-input.types'
/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (this: ISelectBaseInput) {
    initializer(initialize.name, this.field, [
        nnv(
            newEvent(this.field.name, initialize.name, 'onChange', this.handleOnChanged.name),
            this.handleOnChanged.bind(this)
        ),
        nnv(
            newEvent(this.field.name, initialize.name, 'onSelect', this.handleOnSelected.name),
            this.handleOnSelected.bind(this)
        )
    ])
}
