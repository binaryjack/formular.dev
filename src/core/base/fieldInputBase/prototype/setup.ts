import { notify } from '../../../notifications/notifications.types'
import { consoleTrackingProvider } from '../../tracker/tracker.default.provider'
import { IFieldInput } from '../fieldInput.types'
/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const setup = function (this: IFieldInput) {
    this.outputProviderSetup([consoleTrackingProvider])

    this.observers.subscribe(this.classNames.bind(this))
    this.observers.subscribe(this.getFlagsObject.bind(this))

    this.accept(
        notify(`${this.id}_changed_${this.name}`, this.handleOnChanged.bind(this), 'changed')
    )

    this.accept(
        notify(`${this.id}_clicked_${this.name}`, this.handleOnClicked.bind(this), 'clicked')
    )

    this.accept(
        notify(`${this.id}_validate_${this.name}`, this.handleValidation.bind(this), 'validate')
    )

    this.accept(notify(`${this.id}_blur_${this.name}`, this.handleOnBlur.bind(this), 'blurred'))

    this.accept(notify(`${this.id}_focus_${this.name}`, this.handleOnFocus.bind(this), 'focused'))

    this.accept(
        notify(`${this.id}_select_${this.name}`, this.handleOnSelected.bind(this), 'selected')
    )

    /* sets the required flag indicator */
    this.fieldStateStyle.update('required', this.validationOptions.required?.required === true)

    if (this.type === 'checkbox' || this.type === 'radio') {
        this.checked = this.value === 'true' || this.value === true
    }
}
