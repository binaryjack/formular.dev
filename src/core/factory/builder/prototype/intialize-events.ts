import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../../events/events.types'
import { IFieldBuilder } from '../field-builder'

export const initializeEvents = function (this: IFieldBuilder): IFieldBuilder {
    try {
        if (!this) {
            throw Error('_baseInput must be initialized')
        }

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
            nnv(
                newEvent(this.name, 'setup', 'onFocus', 'field.focus'),
                this.handleOnFocus.bind(this)
            )
        )

        return this
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            initializeEvents.name,
            `an error has occured when initializing initializeDommable ${this.name} class: ${e.message}`
        )
        return this
    }
}
