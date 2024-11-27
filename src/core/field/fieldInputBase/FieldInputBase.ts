import React, { useEffect, useState } from 'react'

import { newEntitySchemeObjectType } from '../../../dependency/schema/demo.schema'
import { FieldValuesTypes } from '../../../dependency/schema/descriptor/field.data.types'
import { IFieldDescriptor } from '../../../dependency/schema/descriptor/field.descriptor'
import { IFieldSchemaBuilder } from '../../../dependency/schema/fieldSchema/field.schema.types'
import {
    booleanTypes,
    dateTypes,
    numberTypes,
    stringTypes
} from '../../form/formBase/formBase.types'
import { notify } from '../../notifications/notifications.types'
import { FieldStateStyle } from '../fieldStateStyle/FieldStateStyle'
import { NotifiableEntity } from '../notifiableEntityBase/NotifiableEntity'
import { INotifiableEntity } from '../notifiableEntityBase/notifiableENtityBase.types'
import validator from '../validation/validator.strategy'
import {
    IValidationResult,
    IValidator,
    newValidatorStrategyData
} from '../validation/validator.types'
import {
    BooleanParserStrategy,
    DateOrTimeParserStrategy,
    NumericValueParserStrategy,
    StringParserStrategy
} from '../valueStrategy/parsers.strategy'
import { ValueStrategy } from '../valueStrategy/ValueStrategy'
import { setParser } from '../valueStrategy/valueStrategy.types'
import {
    IFieldInput,
    IFieldInputBase,
    SchemeToDescriptorConverterType
} from './fieldInputBase.types'

const defaultFieldInputCSSClassName = 'f-input'

export const FieldInputCreators = function () {
    /**
     * Represents a field input with various properties and methods for managing its state and behavior.
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
     */
    const _fieldInput = function (this: IFieldInput, descriptor: IFieldDescriptor) {
        this.id = descriptor.id
        this.name = descriptor.name
        this.label = descriptor.label
        this.value = descriptor.value
        this.objectValue = descriptor.objectValue
        this.defaultValue = descriptor.defaultValue
        this.type = descriptor.type
        this.errors = []
        this.guides = []
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
                this.notify('changed')
                this.notify('validate')
            }

            const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                this.value = e.currentTarget.value
                this.fieldStateStyle.update('dirty', this.originalValue !== this.value)
                updateUI()
                e.stopPropagation()
                e.preventDefault()
            }

            const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
                this.isFocus = false
                this.fieldStateStyle.update('focus', this.isFocus)
                updateUI()
                e.stopPropagation()
                e.preventDefault()
            }

            const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
                this.isFocus = true
                this.isPristine = false
                this.fieldStateStyle.update('pristine', this.isPristine)
                this.fieldStateStyle.update('focus', this.isFocus)
                updateUI()
                e.stopPropagation()
                e.preventDefault()
            }

            return {
                id: `${this.id}`,
                type: this.type,
                className: this.classNames(),
                label: this.label,
                onChange,
                onBlur,
                onFocus
            }
        }
        NotifiableEntity.call(this)
        this.setup = function () {
            this.observers.subscribe(this.classNames.bind(this))
        }
        this.setup()
    } as any as IFieldInput

    _fieldInput.prototype = {
        ...NotifiableEntity.prototype,
        classNames: function () {
            return `${this.className} ${this.fieldStateStyle.get()} `
        },
        hasChanges: function (callback: () => void) {
            this.observers.subscribe(callback)
        },
        validate: function (vtor: IValidator) {
            const validationstrategyData = newValidatorStrategyData(
                this.name,
                this.type,
                this.validationOptions,
                this.get(),
                this.expectedValue
            )
            return vtor.validate(validationstrategyData)
        },
        get: function () {
            return this.valueStrategy?.getValue(this) as FieldValuesTypes | null
        },
        getAsString: function () {
            return (this.value as string) ?? null
        }
    }

    /**
     * Custom hook that manages field validation and state updates for a set of fields.
     *
     * @param id - The unique identifier for the field group.
     * @param fields - A variable number of field objects that implement IFieldInputBase, IFieldDescriptor, and INotifiableEntity interfaces.
     * @returns An object containing the validation results for the fields.
     *
     * @example
     * const { validationResults } = useField('fieldGroup1', field1, field2, field3);
     *
     * @remarks
     * This hook sets up validation and change notifications for the provided fields.
     * It uses `React.useReducer` to force updates and `React.useMemo` to memoize the fields.
     * The `handleValidation` function aggregates validation results from all fields.
     * The `handleRefresh` function forces a component re-render.
     * The `useEffect` hook sets up notification handlers for field changes and validations.
     */
    const useField = (
        id: string,
        ...fields: (IFieldInputBase & IFieldDescriptor & INotifiableEntity)[]
    ) => {
        const [, forceUpdate] = React.useReducer((x) => x + 1, 0)
        const stableFields = React.useMemo(() => fields, [fields])
        const [validationResults, setValidationResults] = useState<IValidationResult[]>([])
        const handleValidation = () => {
            const results: IValidationResult[] = []
            for (const field of fields) {
                results.push(...field.validate(validator))
            }
            setValidationResults(results)
        }

        const handleRefresh = () => {
            forceUpdate()
        }

        useEffect(() => {
            for (const field of fields) {
                field.accept(
                    notify(
                        `${id}_${field.id}_changed_hook_${handleRefresh.name}`,
                        handleRefresh.bind(useField),
                        'changed'
                    )
                )

                field.accept(
                    notify(
                        `${id}_${field.id}_validate_hook_${handleRefresh.name}`,
                        handleValidation.bind(useField),
                        'validate'
                    )
                )
            }
        }, [id, stableFields])

        return {
            validationResults
        }
    }

    /**
     * Creates a new field from the provided builder, object converter, and scheme to descriptor converter.
     *
     * @param builder - The field schema builder used to build the field.
     * @param objectConverter - A function that converts the built field into a new entity scheme object.
     * @param converter - A function that converts the new entity scheme into a descriptor.
     * @returns A new instance of `_fieldInput` initialized with the generated descriptor.
     */
    const newFieldFromBuilder = (
        builder: IFieldSchemaBuilder,
        objectConverter: newEntitySchemeObjectType,
        converter: SchemeToDescriptorConverterType
    ) => {
        const _fieldBuild = builder.build()
        const newEntityScheme = objectConverter(`${_fieldBuild.name}-build`, _fieldBuild)
        const descriptor = converter(newEntityScheme)
        return new _fieldInput(descriptor)
    }

    /**
     * Creates a new instance of `_fieldInput` from the given field descriptor.
     *
     * @param descriptor - The descriptor object that defines the properties of the field.
     * @returns A new instance of `_fieldInput` initialized with the provided descriptor.
     */
    const newFieldFromDescriptor = (descriptor: IFieldDescriptor) => {
        return new _fieldInput(descriptor)
    }

    /**
     * Creates an array of `IFieldInput` instances from an array of `IFieldDescriptor` objects.
     *
     * @param descriptors - An array of field descriptors used to create the field inputs.
     * @returns An array of `IFieldInput` instances created from the provided descriptors.
     */
    const newFieldFromDescriptors = (descriptors: IFieldDescriptor[]): IFieldInput[] => {
        const output: IFieldInput[] = []
        for (const descriptor of descriptors) {
            output.push(new _fieldInput(descriptor))
        }
        return output
    }
    return {
        newFieldFromBuilder,
        newFieldFromDescriptor,
        newFieldFromDescriptors,
        useField
    }
}
