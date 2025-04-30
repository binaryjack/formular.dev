import { nnv } from '@core/notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../../events/events.types'
import { ITextBaseInput } from '../text-base-input.types'

/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const initialize = function (this: ITextBaseInput) {
    this.field._notifier?.accept(
        nnv(
            newEvent(this.name, setup.name, 'onChange', this.handleOnChanged.name),
            this.handleOnChanged.bind(this)
        )
    )

    /* sets the required flag indicator */
    this.field._style?.fieldStateStyle.update(
        'required',
        this.field.validationOptions.requiredData?.required === true
    )
}
