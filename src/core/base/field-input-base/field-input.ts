import { FieldValuesTypes } from '../../../dependency/schema/descriptor/field.data.types'
import { IFieldDescriptor } from '../../../dependency/schema/descriptor/field.descriptor'
import { NotifiableEntity } from '../../notifiable-entity/notifiable-entity'
import { INotifiableEntity } from '../../notifiable-entity/notifiable-entity-base.types'
import { Dommable } from '../dommable/dommable'
import { Tracker } from '../tracker/tracker'
import { IFieldInput } from './field-input.types'
import { checkOptionsInitialized } from './prototype/check-options-initialized'
import { classNames } from './prototype/class-names'
import { clear } from './prototype/clear'
import { enable } from './prototype/enable'
import { focus } from './prototype/focus'
import { getAsString } from './prototype/get-as-string'
import { getFlagsObject } from './prototype/get-flags-object'
import { getOptionById } from './prototype/get-option-by-id'
import { getOptionBySequenceId } from './prototype/get-option-by-sequence-id'
import { getOptionByValue } from './prototype/get-option-by-value'
import { getSelectedValue } from './prototype/get-selected-value'
import { getValue } from './prototype/get-value'
import {
    handleOnBlur,
    handleOnChanged,
    handleOnClicked,
    handleOnFocus,
    handleOnSelected,
    handleValidation
} from './prototype/handlers'
import { initializeAutoTracker } from './prototype/initialize-auto-tracker'
import { initializeNotifier } from './prototype/initialize-notifier'
import { initializeProperties } from './prototype/initialize-properties'
import { initializeValidation } from './prototype/initialize-validations'
import { initializeValueStrategy } from './prototype/initialize-value-strategy'
import { onSelectItem } from './prototype/on-select-item'
import { ref } from './prototype/ref'
import { refOption } from './prototype/ref-option'
import { register } from './prototype/register'
import { registerLabel } from './prototype/register-label'
import { registerOption } from './prototype/register-option'
import { setFocus } from './prototype/set-focus'
import { setOpenState } from './prototype/set-open-state'
import { setValidationTriggerMode } from './prototype/set-validation-trigger-mode'
import { setValue } from './prototype/set-value'
import { setup } from './prototype/setup'
import { toString } from './prototype/to-string'
import { tryGetOptionByIdOrValue } from './prototype/try-get-otion-by-id-or-value'
import { tryGetOptionBySequenceIdThenIdOrValue } from './prototype/try-get-otion-by-sequence-id-then-id-or-value'
import { validate } from './prototype/validate'
import { validateAsync } from './prototype/validate-async'

/**
 * Represents a field input with various properties and methods for managing its state and behavior.
 * :warning: should NOT be used directly, use FieldInputCreator instead.
 *
 * @param this - The context of the field input.
 * @param descriptor - An object containing the initial properties of the field input.
 *
 * @property {string} id - The unique identifier of the field input.
 * @property {string} name - The name of the field input.
 * @property {string} label - The label of the field input.
 * @property {any} value - The current value of the field input.
 * @property {any} objectValue - The object value of the field input.
 * @property {any} defaultValue - The default value of the field input.
 * @property {string} type - The type of the field input.
 * @property {Array} errors - The list of errors associated with the field input.
 * @property {Array} guides - The list of guides associated with the field input.
 * @property {any} validationOptions - The validation options for the field input.
 * @property {any} target - The target element for the field input.
 * @property {any} options - The options for the field input.
 * @property {boolean} isValid - Indicates whether the field input is valid.
 * @property {boolean} isDirty - Indicates whether the field input is dirty.
 * @property {boolean} isPristine - Indicates whether the field input is pristine.
 * @property {boolean} isFocus - Indicates whether the field input is focused.
 * @property {any} expectedValue - The expected value of the field input.
 * @property {boolean} loaded - Indicates whether the field input is loaded.
 * @property {boolean} changed - Indicates whether the field input has changed.
 * @property {boolean} shouldValidate - Indicates whether the field input should be validated.
 * @property {FieldStateStyle} fieldStateStyle - The style state of the field input.
 * @property {string} className - The CSS class name for the field input.
 * @property {ValueStrategy} valueStrategy - The strategy for parsing the value of the field input.
 *
 * @method register - Registers event handlers for the field input.
 * @template FieldValuesTypes
 * @returns {object} An object containing the field input properties and event handlers.
 *
 * @method setup - Sets up the field input by subscribing to observers.
 *
 *
 * @method setValidationTriggerMode - Sets the validation trigger mode for the field input.
 * @validationTriggerModeType - behavior: if the field should be validated onBlur, onFocus, onChange, onSubmit, onLoad, or reset.
 * onBlur only takes effect when the field loses focus. It will show the error in the error color
 * onFocus only takes effect when the field gains focus. It will show the guide in the guide color
 * onChange only takes effect when the field value changes. It will show the guide in the guide color
 * onSubmit only takes effect when the form is submitted.  It will show the error in the error color
 * onLoad only takes effect when the field is loaded, It will show the error in the error color
 * reset is used by default so the validation are cleared out.
 *
 * @method classNames - Returns the CSS class names for the field input.
 * @returns {string} A string containing the CSS class names for the field input.
 *
 * @method hasChanges - Subscribes to the field input changes and triggers a callback when changes occur.
 * @callback callback - The callback function to be triggered when changes occur.
 *
 * @method validate - Validates the field input using the provided validator.
 * @param vtor - The validator used to validate the field input.
 *
 * @method get - Gets the value of the field input.
 * @returns {FieldValuesTypes | null} The value of the field input.
 *
 * @method getAsString - Gets the value of the field input as a string.
 * @returns {string | null} The value of the field input as a string.
 *
 * @method setFocus - Sets the focus on the field input.
 *
 * @method enable - Enables or disables the field input.
 * @param enabled - Indicates whether the field input should be enabled.
 *
 * @method clear - Clears the field input of any errors or guides.
 *
 * @method ref - Creates a reference to the field input element.
 * @returns {React.RefObject<HTMLInputElement>} A reference to the field input element.
 *
 * @method NotifiableEntity - The base class for field inputs that provides notification functionality.
 * @extends NotifiableEntity
 *
 * @method valueStrategy - The strategy for parsing the value of the field input.
 * @returns {ValueStrategy} The strategy for parsing the value of the field input.
 */

export const FieldInput = function (
    this: IFieldInput,
    descriptor: IFieldDescriptor,
    autoTracker?: INotifiableEntity
) {
    if (!descriptor.id || !descriptor.name) {
        throw new Error('FieldInput descriptor must include "id" and "name".')
    }

    // Initialize properties
    this.initializeProperties(descriptor)

    // Initialize validation
    this.initializeValidation(descriptor)

    // Initialize value strategy
    this.initializeValueStrategy()

    // will add autotracking Notifiable entity instance for devugging purposes
    this.initializeAutoTracker(autoTracker)

    this._notify = this.initializeNotifier()
    // Call mixins
    Tracker.call(this)
    NotifiableEntity.call(this)
    Dommable.call(this)

    // Setup field input
    this.setup()
} as any as IFieldInput

FieldInput.prototype = {
    ...Dommable.prototype,
    ...NotifiableEntity.prototype,
    ...Tracker.prototype
}

Object.assign(FieldInput.prototype, {
    initializeProperties,
    initializeValueStrategy,
    initializeValidation,
    initializeNotifier,
    setup,
    ref,
    refOption,
    classNames,
    clear,
    enable,
    focus,
    getValue,
    getSelectedValue,
    getAsString,
    getFlagsObject,
    handleOnChanged,
    handleOnClicked,
    handleOnSelected,
    initializeAutoTracker,
    handleOnBlur,
    handleOnFocus,
    handleValidation,
    onSelectItem,
    getOptionByValue,
    getOptionById,
    getOptionBySequenceId,
    tryGetOptionByIdOrValue,
    tryGetOptionBySequenceIdThenIdOrValue,
    register,
    registerOption,
    registerLabel,
    setFocus,
    setOpenState,
    setValidationTriggerMode,
    setValue,
    validate,
    toString,
    validateAsync,
    checkOptionsInitialized
})
