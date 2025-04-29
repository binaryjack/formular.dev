import { nnv } from '../../../notifiable-entity/utils/new-notification-visitor'
import { newEvent } from '../../events/events.types'
import { consoleTrackingProvider } from '../../tracker/tracker.default.provider'
import { IFieldInput } from '../field-input.types'
/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const setup = function (this: IFieldInput) {
    /** setup the internal information (info, warning, error etc.) tracking this is not the EVENT TRACKING! */
    this.outputProviderSetup([consoleTrackingProvider])

    this.observers.subscribe(this.classNames.bind(this))
    this.observers.subscribe(this.getFlagsObject.bind(this))

    this.accept(
        nnv(
            newEvent(this.name, setup.name, 'onChange', this.handleOnChanged.name),
            this.handleOnChanged.bind(this)
        )
    )
    this.accept(
        nnv(newEvent(this.name, 'setup', 'onClick', 'field.click'), this.handleOnClicked.bind(this))
    )

    this.accept(
        nnv(
            newEvent(this.name, 'setup', 'onSelect', 'field.select'),
            this.handleOnSelected.bind(this)
        )
    )

    /* sets the required flag indicator */
    this.fieldStateStyle.update('required', this.validationOptions.requiredData?.required === true)

    if (this.type === 'checkbox' || this.type === 'radio') {
        this.checked = this.value === 'true' || this.value === true
    }
}
