import { newEvent } from '@core/events/events.types'
import { IExtendedFieldInput } from '@core/fields/field-base-input/field-input-base-types'
import { initializer } from '@core/fields/field-base-input/initializers/initializer'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (this: IExtendedFieldInput) {
    initializer(initialize.name, this.field, [
        nnv(
            newEvent(
                this.field.name,
                this.handleOnChanged.name,
                'onChange',
                this.handleOnChanged.name
            ),
            this.handleOnChanged.bind(this.field)
        )
    ])
}
