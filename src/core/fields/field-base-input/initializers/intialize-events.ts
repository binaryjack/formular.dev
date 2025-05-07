import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../../events/events.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const initializeEvents = function (this: IFieldBaseInput): IFieldBaseInput {
    try {
        if (!this) {
            throw Error('_baseInput must be initialized')
        }

        this.notifier?.accept(
            nnv(
                newEvent(
                    this.name,
                    this.handleValidation.name,
                    'onValidate',
                    this.handleValidation.name
                ),
                this.handleValidation.bind(this)
            )
        )

        this.notifier?.accept(
            nnv(
                newEvent(this.name, this.handleOnBlur.name, 'onBlur', this.handleOnBlur.name),
                this.handleOnBlur.bind(this)
            )
        )

        this.notifier?.accept(
            nnv(
                newEvent(this.name, this.handleOnFocus.name, 'onFocus', this.handleOnFocus.name),
                this.handleOnFocus.bind(this)
            )
        )

        return this
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            initializeEvents.name,
            `an error has occured when initializing initializeEvents ${this.name} class: ${e.message}`
        )
        return this
    }
}
