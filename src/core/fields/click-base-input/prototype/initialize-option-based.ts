import { IFieldInput } from '@core/fields/field-base-input/field-input-base-types'
import { OptionBaseInput } from '@core/fields/option-based-input/option-base-input'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../../events/events.types'
import { IClickInput } from '../click-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initializeOptionsBased = function (this: IClickInput, fieldInput: IFieldInput) {
    try {
        this.prototype = { ...OptionBaseInput.prototype, ...this.prototype }

        OptionBaseInput.call(this)
        OptionBaseInput.initialize(fieldInput)

        this?.accept?.(
            nnv(
                newEvent(this?.name, 'setup', 'onClick', 'field.select'),
                this.handleOnClicked.bind(this)
            )
        )
    } catch (e: any) {
        throw Error(
            `${initializeOptionsBased.name} - an error has occured when initializing ${this.name} class: ${e.message}`
        )
    }
}
