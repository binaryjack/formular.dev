import { newNotificationVisitor } from '../../../notifiable-entity/utils/new-notification-visitor'
import { consoleTrackingProvider } from '../../tracker/tracker.default.provider'
import { IFieldInput } from '../field-input.types'
import { newNotificationVisitorName } from '../utils/new-notification-visitor'
/**
 * The setup function sets up the field input by subscribing to observers.
 * basic configuration for styles and validation
 */
export const setup = function (this: IFieldInput) {
    this.outputProviderSetup([consoleTrackingProvider])

    this.observers.subscribe(this.classNames.bind(this))
    this.observers.subscribe(this.getFlagsObject.bind(this))

    this.accept(
        newNotificationVisitor(
            newNotificationVisitorName('changed', this.id, this.name),
            this.handleOnChanged.bind(this),
            'changed'
        )
    )
    this.accept(
        newNotificationVisitor(
            newNotificationVisitorName('clicked', this.id, this.name),
            this.handleOnClicked.bind(this),
            'clicked'
        )
    )

    this.accept(
        newNotificationVisitor(
            newNotificationVisitorName('validate', this.id, this.name),
            this.handleValidation.bind(this),
            'validate'
        )
    )

    this.accept(
        newNotificationVisitor(
            newNotificationVisitorName('blurred', this.id, this.name),
            this.handleOnBlur.bind(this),
            'blurred'
        )
    )

    this.accept(
        newNotificationVisitor(
            newNotificationVisitorName('focused', this.id, this.name),
            this.handleOnFocus.bind(this),
            'focused'
        )
    )

    this.accept(
        newNotificationVisitor(
            newNotificationVisitorName('selected', this.id, this.name),
            this.handleOnSelected.bind(this),
            'selected'
        )
    )

    /* sets the required flag indicator */
    this.fieldStateStyle.update('required', this.validationOptions.requiredData?.required === true)

    if (this.type === 'checkbox' || this.type === 'radio') {
        this.checked = this.value === 'true' || this.value === true
    }
}
