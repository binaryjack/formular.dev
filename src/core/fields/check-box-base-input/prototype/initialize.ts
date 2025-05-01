import { FieldInput } from '@core/fields/field-base-input/field-input-base'
import { IFieldInput } from '@core/fields/field-base-input/field-input-base-types'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../../events/events.types'
import { ITextInput } from '../check-box-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (this: ITextInput, fieldInput: IFieldInput) {
    try {
        this.prototype = { ...FieldInput.prototype }

        FieldInput.call(this, fieldInput)

        this.accept(
            nnv(
                newEvent(this.name, setup.name, 'onChange', this.handleOnChanged.name),
                this.handleOnChanged.bind(this)
            )
        )
    } catch (e: any) {
        throw Error(
            `${initialize.name} - an error has occured when initializing ${this.name} class: ${e.message}`
        )
    }
}
