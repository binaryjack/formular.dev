import { clear } from 'console'
import React from 'react'

import { FieldValuesTypes } from '../../../dependency/schema/descriptor/field.data.types'
import { IFieldDescriptor } from '../../../dependency/schema/descriptor/field.descriptor'
import { IOptionItem } from '../../../dependency/schema/optionsSchema/options.scheme.types'
import { NotifiableEntity } from '../../notifiableEntity/NotifiableEntity'
import { notify } from '../../notifications/notifications.types'
import { DrawerOpenStateType } from '../components/drawer/Drawer.types'
import { FieldStateStyle } from '../fieldStateStyle/FieldStateStyle'
import validator from '../validation/validator.strategy'
import {
    IValidationOrigin,
    IValidator,
    newValidatorStrategyData,
    ValidationTriggerModeType
} from '../validation/validator.types'
import {
    BooleanParserStrategy,
    DateOrTimeParserStrategy,
    NumericValueParserStrategy,
    StringParserStrategy
} from '../valueStrategy/parsers.strategy'
import { ValueStrategy } from '../valueStrategy/ValueStrategy'
import { setParser } from '../valueStrategy/valueStrategy.types'
import { booleanTypes, dateTypes, IFieldInput, numberTypes, stringTypes } from './fieldInput.types'

const defaultFieldInputCSSClassName = 'f-input'

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
export const FieldInput = function (this: IFieldInput, descriptor: IFieldDescriptor) {
    this.id = descriptor.id
    this.name = descriptor.name
    this.label = descriptor.label
    this.value = descriptor.value
    this.enabled = true
    this.objectValue = descriptor.objectValue
    this.defaultValue = descriptor.defaultValue
    this.type = descriptor.type
    this.validationResults = []
    this.validationOptions = descriptor.validationOptions
    this.target = descriptor.target
    this.options = descriptor.options
    this.isValid = descriptor.isValid
    this.isDirty = descriptor.isDirty
    this.isPristine = descriptor.isPristine
    this.isFocus = descriptor.isFocus
    this.expectedValue = descriptor.expectedValue
    this.loaded = descriptor.loaded
    this.changed = descriptor.changed
    this.shouldValidate = descriptor.shouldValidate
    this.fieldStateStyle = new FieldStateStyle()
    this.className = defaultFieldInputCSSClassName
    /** the On form request will be trigger by the form! It should remains as the basic one in this list */
    this.validationTriggerModeType = ['onBlur', 'onFormRequest']
    /* Should be used when the input is the entry point for the field value */
    this.internalHTMLElementRef = null

    this.internalHTMLElementRefs = []

    this.options = descriptor.options
    this.openState = 'closed'
    this.checked = undefined
    // this.observers = new DataMutationObserverSubject()
    // this.notifiers = new Map<string, INotifier>()
    // this.computedSignalCallback = null
    this.valueStrategy = new ValueStrategy(
        setParser('DateOrTimeParserStrategy', dateTypes, DateOrTimeParserStrategy),
        setParser('NumericValueParserStrategy', numberTypes, NumericValueParserStrategy),
        setParser('StringParserStrategy', stringTypes, StringParserStrategy),
        setParser('BooleanParserStrategy', booleanTypes, BooleanParserStrategy)
    )

    this.register = function <FieldValuesTypes>() {
        const updateUI = () => {
            this.observers.trigger()
        }
        const notifyValidation = (fieldState: string, trigger: ValidationTriggerModeType) => {
            this.notify<IValidationOrigin>('validate', {
                fieldName: fieldState,
                fieldState: this.validationTriggerModeType.includes(trigger) ? trigger : 'reset'
            })
        }

        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (this.type === 'checkbox' || this.type === 'radio') {
                if (this?.internalHTMLElementRef?.current?.disabled) {
                    this.value = this.internalHTMLElementRef.current.checked
                    this.checked = this.value as boolean
                }
            } else {
                this.value = e.currentTarget.value
            }

            this.fieldStateStyle.update('dirty', this.originalValue !== this.value)

            notifyValidation(this.name, 'onChange')
            updateUI()

            e.stopPropagation()
        }

        const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            this.isFocus = false
            this.fieldStateStyle.update('focus', this.isFocus)

            notifyValidation(this.name, 'onBlur')
            updateUI()

            e.stopPropagation()
            e.preventDefault()
        }

        const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
            this.isFocus = true
            this.isPristine = false
            this.fieldStateStyle.update('pristine', this.isPristine)
            this.fieldStateStyle.update('focus', this.isFocus)

            notifyValidation(this.name, 'onFocus')
            updateUI()

            e.stopPropagation()
            e.preventDefault()
        }

        const onClick = (e: MouseEvent | React.MouseEvent<HTMLInputElement, MouseEvent>) => {
            if (
                !this?.internalHTMLElementRef?.current ||
                this.internalHTMLElementRef.current.disabled
            )
                return
            if (this.type !== 'checkbox' && this.type !== 'radio') return

            this.value = this.internalHTMLElementRef.current.checked
            this.checked = this.value as boolean

            e?.stopPropagation?.()
        }

        return {
            id: `${this.id}`,
            type: this.type,
            className: this.classNames(),
            label: this.label,
            onChange,
            onBlur,
            onFocus,
            onClick
        }
    }
    this.ref = function () {
        this.internalHTMLElementRef = React.createRef<HTMLInputElement>()
        return this.internalHTMLElementRef
    }
    /** In oposition to the above ref function the refOption function requires that the component manages the ref by itself
     * I guess (not sure at this point!) but I believe tha's because of the render nature.
     * as it's render through a [].MAP => if it's created by React.createRef the class is not aware of the ref itself
     * until the render is complete. And each render will create a new ref whidh is not what we want.
     *
     * In this case we provide a ref from the component itself and we add to the collection only if the ref has already
     * been created and the value (current) is referencing the input.
     *  */
    this.refOption = function (ref: React.RefObject<HTMLInputElement>) {
        if (!ref?.current) return ref

        /** Okay this following check after investigating is useless
         * I will keep it anyways because for me
         * it makes the code more readable and understandable
         * but it's does nothing at all since refs comes not null and only once
         *
         * I guessing that maybe a day if the render is dubbled
         * by the StrictMode of something else like that
         * we expect to have only one ref and it could avoid bugs
         */
        const existingRef = this.internalHTMLElementRefs?.find(
            (internalHtmlOptionReference) =>
                internalHtmlOptionReference.current?.id === ref.current?.id
        )
        if (existingRef !== undefined) {
            return existingRef
        }

        this.internalHTMLElementRefs?.push(ref)
        console.log('refOption', this.internalHTMLElementRefs)
        return ref
    }

    this.registerOption = function () {
        const onClick = (e: MouseEvent | React.MouseEvent<HTMLInputElement, MouseEvent>) => {
            this.value = (e.currentTarget as HTMLInputElement)?.value ?? ''
            console.log('onClick', this.value, (e.currentTarget as HTMLInputElement)?.value)

            this.fieldStateStyle.update('dirty', this.originalValue !== this.value)
            this.notify<IValidationOrigin>('validate', {
                fieldName: this.name,
                fieldState: this.validationTriggerModeType.includes('onChange')
                    ? 'onChange'
                    : 'reset'
            })
            this.observers.trigger()
            e?.stopPropagation?.()
        }

        return {
            onClick
        }
    }
    NotifiableEntity.call(this)
    this.setup = function () {
        this.observers.subscribe(this.classNames.bind(this))
        this.observers.subscribe(this.getFlagsObject.bind(this))
        this.accept(
            notify(
                `${this.id}_${this.id}_validate_${this.name}`,
                this.handleValidation.bind(this),
                'validate'
            )
        )
        /* sets the required flag indicator */
        this.fieldStateStyle.update('required', this.validationOptions.required?.required === true)

        if (this.type === 'checkbox' || this.type === 'radio') {
            this.checked = this.value === 'true' || this.value === true
        }
    }
    this.setup()
} as any as IFieldInput

FieldInput.prototype = {
    ...NotifiableEntity.prototype,
    setValidationTriggerMode: function (mode: ValidationTriggerModeType) {
        this.validationTriggerModeType = mode
    },
    classNames: function () {
        const userClassName = this.internalHTMLElementRef?.current?.attributes['data-class']?.value

        return `${userClassName} ${this.className} ${this.fieldStateStyle.get()} `
    },
    getFlagsObject: function () {
        return this.fieldStateStyle.getFlagsObject()
    },
    hasChanges: function (callback: () => void) {
        this.observers.subscribe(callback)
    },

    handleValidation: function (origin?: any) {
        const validationOrigin = origin as IValidationOrigin
        this.validate(validator, validationOrigin)
    },
    validate: function (vtor: IValidator, origin?: IValidationOrigin) {
        const validationstrategyData = newValidatorStrategyData(
            this.name,
            this.type,
            this.validationOptions,
            this.get(),
            this.expectedValue,
            origin
        )
        const results = vtor.validate(validationstrategyData)
        // keep the validation results for the field
        this.validationResults = results

        this.fieldStateStyle.update(
            'valid',
            results.every((result) => result.state)
        )

        this.fieldStateStyle.update(
            'errors',
            results.some((result) => !result.state)
        )

        return results
    },

    get: function () {
        return this.valueStrategy?.getValue(this) as FieldValuesTypes | null
    },
    getAsString: function () {
        return (this.value as string) ?? null
    },
    setFocus: function () {
        if (this.internalHTMLElementRef.current.disabled) return
        this.isFocus = true
        this.fieldStateStyle.update('focus', this.isFocus)
        this.internalHTMLElementRef?.current?.focus()
    },
    enable: function (enabled: boolean) {
        this.enabled = enabled
        if (!enabled) {
            this.internalHTMLElementRef.current.blur()
        }
        this.internalHTMLElementRef.current.disabled = !enabled
    },
    clear: function () {
        this.errors = []
        this.guides = []

        this.internalHTMLElementRefs?.forEach((element: React.RefObject<HTMLInputElement>) => {
            if (element.current) {
                element.current.checked = false
            }
        })

        this.notify('validate', {
            fieldName: this.name,
            fieldState: 'reset'
        })
        this.notify('changed', {
            fieldName: this.name,
            fieldState: 'onChange'
        })

        this.fieldStateStyle.update('clear', true)
        this.value = null
        this.internalHTMLElementRef.current.value = null
        this.internalHTMLElementRef.current.checked = null
    },
    setOpenState: function (state: DrawerOpenStateType) {
        this.openState = state
        //this.observers.trigger()
        this.notify('changed', {
            fieldName: this.name,
            fieldState: 'reset'
        })
    },
    onSelectItem: function (option: IOptionItem) {
        this.value = Number(option.id)
        this.internalHTMLElementRef.current.value = option.text
        this.openState = 'closed'
        // this.observers.trigger()
        this.notify('changed', {
            fieldName: this.name,
            fieldState: 'onChange'
        })

        this.notify('validate', {
            fieldName: this.name,
            fieldState: 'reset'
        })
    }
}
