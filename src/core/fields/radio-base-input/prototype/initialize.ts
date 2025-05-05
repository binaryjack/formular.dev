import { IFieldBaseInput } from '@core/fields/field-base-input/field-input-base-types'
import { initializer } from '@core/fields/field-base-input/initializers/initializer'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../../events/events.types'
import { IRadioBaseInput } from '../radio-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (this: IRadioBaseInput, fieldInput: IFieldBaseInput) {
    initializer(initialize.name, this, fieldInput, [
        nnv(
            newEvent(this.name, initialize.name, 'onChange', 'field.changed'),
            this.handleOnChanged.bind(this)
        )
    ])
}
