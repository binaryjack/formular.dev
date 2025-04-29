import { nnv } from '../../../notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../events/events.types'
import { IClickBaseInput } from '../click-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (this: IClickBaseInput) {
    this.field._notifier?.accept(
        nnv(newEvent(this.name, 'setup', 'onClick', 'field.click'), this.handleOnClicked.bind(this))
    )

    if (this.field.type === 'checkbox' || this.field.type === 'radio') {
        this.checked = this.field.value === 'true' || this.field.value === true
    }
}
