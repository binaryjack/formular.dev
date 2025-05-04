import { createAccessor } from '@core/fields/field-base-input/accessors/accessors'
import { initializer } from '@core/fields/field-base-input/initializers/initializer'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../../events/events.types'
import { IRadioBaseInput, IRadioInput } from '../radio-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (this: IRadioBaseInput, fieldInput: IRadioInput) {
    initializer(
        initialize.name,
        this,
        fieldInput,
        [
            nnv(
                newEvent(this.name, initialize.name, 'onChange', 'field.changed'),
                this.handleOnChanged.bind(this)
            )
        ],
        (e) => {
            const fieldAccessors = createAccessor(e.field())
            e.setValue = fieldAccessors.setValue
            e.getValue = fieldAccessors.getValue
        }
    )
}
