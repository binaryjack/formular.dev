import { nnv } from '../../../notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../events/events.types'
import { consoleTrackingProvider } from '../../tracker/tracker.default.provider'
import { IFieldInput } from '../field-input-base-types'

export const initializeEvents = function (this: IFieldInput) {
    this._notifier?.accept(
        nnv(
            newEvent(this.name, 'setup', 'onValidate', 'field.validate'),
            this.handleValidation.bind(this)
        )
    )

    this._notifier?.accept(
        nnv(newEvent(this.name, 'setup', 'onBlur', 'field.blur'), this.handleOnBlur.bind(this))
    )

    this._notifier?.accept(
        nnv(newEvent(this.name, 'setup', 'onFocus', 'field.focus'), this.handleOnFocus.bind(this))
    )
}
