import { nnv } from '../../../notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../events/events.types'
import { IOptionBaseInput } from '../option-based-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (this: IOptionBaseInput) {
    this.optionsInitialized = false
    this.selectedOptionId = null

    this.field._notifier?.accept(
        nnv(
            newEvent(this.name, 'setup', 'onSelect', 'field.select'),
            this.handleOnSelected.bind(this)
        )
    )
}
