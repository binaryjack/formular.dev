import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../../events/events.types'
import { IFieldInput } from '../field-input-base-types'

export const initializeEvents = function (this: IFieldInput): IFieldInput {
    this.notifier()?.accept(
        nnv(
            newEvent(this.name, 'setup', 'onValidate', 'field.validate'),
            this.handleValidation.bind(this)
        )
    )

    this.notifier()?.accept(
        nnv(newEvent(this.name, 'setup', 'onBlur', 'field.blur'), this.handleOnBlur.bind(this))
    )

    this.notifier()?.accept(
        nnv(newEvent(this.name, 'setup', 'onFocus', 'field.focus'), this.handleOnFocus.bind(this))
    )

    return this
}
