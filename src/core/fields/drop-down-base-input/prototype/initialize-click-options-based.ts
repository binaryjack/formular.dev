import { ClickBaseInput } from '@core/fields/click-base-input/click-base-input'
import { IFieldInput } from '@core/fields/field-base-input/field-input-base-types'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../../events/events.types'
import { IDropDownInput } from '../drop-down-base-input.types'
/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initializeClickOptionsBased = function (
    this: IDropDownInput,
    fieldInput: IFieldInput
) {
    try {
        this.prototype = { ...ClickBaseInput.prototype, ...this.prototype }

        ClickBaseInput.call(this, fieldInput)
        ClickBaseInput.initializeOptionsBased(fieldInput)

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
            `${initializeClickOptionsBased.name} - an error has occured when initializing ${this.name} class: ${e.message}`
        )
    }
}
