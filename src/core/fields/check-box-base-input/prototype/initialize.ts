import { IFieldInput } from '@core/fields/field-base-input/field-input-base-types'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../../events/events.types'
import { ICheckBoxInput } from '../check-box-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (this: ICheckBoxInput, fieldInput: IFieldInput) {
    try {
        // this.prototype = { ...ClickBaseInput.prototype, ...this.prototype }
        this._field = fieldInput

        // ClickBaseInput.call(this._field, fieldInput)
        // ClickBaseInput.initializeOptionsBased(fieldInput)

        this._field._notifier?.accept(
            nnv(
                newEvent(this.name, setup.name, 'onChange', this.handleOnChanged.name),
                this.handleOnChanged.bind(this)
            )
        )
    } catch (e: any) {
        this._field._tracker?.internalCritical(
            initialize.name,
            ` an error has occured when initializing ${this.name} class: ${e.message}`
        )
    }
}
