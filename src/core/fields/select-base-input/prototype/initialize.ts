import { createAccessor } from '@core/fields/field-base-input/accessors/accessors'
import { IFieldInputExtended } from '@core/fields/field-base-input/field-input-base-types'
import { initializer } from '@core/fields/field-base-input/initializers/initializer'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../../events/events.types'
import { ISelectInput } from '../select-base-input.types'
/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (this: ISelectInput, fieldInput: IFieldInputExtended) {
    initializer(
        initialize.name,
        this,
        fieldInput,
        [
            nnv(
                newEvent(this.name, setup.name, 'onChange', this.handleOnChanged.name),
                this.handleOnChanged.bind(this)
            ),
            nnv(
                newEvent(this.name, 'setup', 'onSelect', 'field.select'),
                this.handleOnSelected.bind(this)
            )
        ],
        (e) => {
            const fieldAccessors = createAccessor(e.field())
            e.setValue = fieldAccessors.setValue
            e.getValue = fieldAccessors.getValue
        }
    )
}
