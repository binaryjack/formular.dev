import { IFieldInput } from '@core/fields/field-base-input/field-input-base-types'
import { OptionBaseInput } from '@core/fields/option-based-input/option-base-input'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../../events/events.types'
import { IDropDownInput } from '../drop-down-base-input.types'
/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initializeOptionBasedOnly = function (this: IDropDownInput, fieldInput: IFieldInput) {
    try {
        this.prototype = { ...OptionBaseInput.prototype, ...this.prototype }

        OptionBaseInput.call(this)
        OptionBaseInput.initialize(fieldInput)

        this.accept(
            nnv(
                newEvent(this.name, setup.name, 'onChange', this.handleOnChanged.name),
                this.handleOnChanged.bind(this)
            )
        )

        this.accept(
            nnv(
                newEvent(this.name, 'setup', 'onSelect', 'field.select'),
                this.handleOnSelected.bind(this)
            )
        )
    } catch (e: any) {
        throw Error(
            `${initializeOptionBasedOnly.name} - an error has occured when initializing ${this.name} class: ${e.message}`
        )
    }
}
