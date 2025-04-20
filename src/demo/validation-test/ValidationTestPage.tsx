import React, { useEffect, useState } from 'react'
import FormyProvider, { newFormy } from '../../components/formy/Formy.context'
import InputText from '../../components/inputText/InputText'
import { FieldInput } from '../../core/base/fieldInputBase/FieldInput'
import { Formy } from '../../core/base/formyBase/FormyBase'
import { IFormy } from '../../core/base/formyBase/formyBase.types'
import { SchemaDataTypes } from '../../dependency/form.common.enums'
import { getTranslationBuilder, getTranslations } from '../../dependency/localize/localize.utils'
import { FieldSchemaBuilder } from '../../dependency/schema/fieldSchema/field.schema.builder'
import { IEntityScheme } from '../../dependency/schema/fieldSchema/field.schema.types'
import { namesPattern } from '../../dependency/schema/validationSchema/validation.regex.patterns'
import {
    minMaxTypeMethodBuilder2,
    ValidationSchemaBuildersEnum
} from '../../dependency/schema/validationSchema/validation.schema.builder.types'
import validationSchemaFactory from '../../dependency/schema/validationSchema/validation.schema.factory'
import { IValidationSchema } from '../../dependency/schema/validationSchema/validation.schema.types'
import { hasMaxLength, hasMinLength, hasPattern, isRequired } from '../../dependency/validation'

const fieldsIds: Record<string, number> = {
    'required-field': 0,
    'minlength-field': 1,
    'maxlength-field': 2,
    'pattern-field': 3,
    'multiple-field': 4
}

const fieldDescriptionValues = {
    defaultValue: '',
    errors: [],
    guides: [],
    isDirty: false,
    isFocus: false,
    isPristine: false,
    isValid: false,
    objectValue: null,
    options: [],
    shouldValidate: true,
    changed: false,
    expectedValue: undefined,
    loaded: true,
    target: undefined
}

const minMaxNameBuilder =
    validationSchemaFactory.createMinMaxBasedBuilder<minMaxTypeMethodBuilder2>(
        ValidationSchemaBuildersEnum.MinLengthAndMaxLengthBuilder
    )?.(3, 50)

const setupForm = (
    id: number,
    name: string,
    type: SchemaDataTypes,
    required: boolean,
    setForm: React.Dispatch<React.SetStateAction<IFormy | null>>,
    customValidator: IValidationSchema | undefined
) => {
    const field = new FieldSchemaBuilder(id, name)
        .setTypeData(type)
        .setValidationData(required, customValidator)
        .setValidationTriggerMode(['onBlur', 'onChange', 'onSubmit'])
        .build()

    const scheme: IEntityScheme = {
        name: 'demo-schema',
        properties: [field]
    }

    const formInstance = newFormy('demoForm', scheme, getTranslationBuilder, getTranslations, [
        'onChange',
        'onBlur',
        'onSubmit'
    ])
    setForm(formInstance)
}

// Setup field with required validation
const setupRequiredField = (setForm: React.Dispatch<React.SetStateAction<IFormy | null>>) => {
    const customValidator = validationSchemaFactory.finalizer(
        true,
        minMaxNameBuilder,
        namesPattern,
        'This field is required',
        'Please enter a value'
    )

    setupForm(fieldsIds['required-field'], 'required-field', 'text', true, setForm, customValidator)
}
// Setup field with required validation
const setupMinlengthField = (setForm: React.Dispatch<React.SetStateAction<IFormy | null>>) => {
    const customValidator = validationSchemaFactory.finalizer(
        true,
        minMaxNameBuilder,
        namesPattern,
        'This field is required',
        'Please enter a value'
    )

    setupForm(
        fieldsIds['minlength-field'],
        'minlength-field',
        'text',
        true,
        setForm,
        customValidator
    )
}

const ValidationTestPage = () => {
    const [formId, setFormId] = useState('validation-test-form')
    const [form, setForm] = useState<typeof Formy | null>(null)

    // Setup form on mount
    useEffect(() => {
        const newForm = new Formy(formId)
        setForm(newForm)
        return () => {
            // Cleanup if needed
        }
    }, [formId])

    // Setup field with minLength validation
    const setupMinLengthField = () => {
        const field = new FieldInput({
            id: fieldsIds['minlength-field'],
            name: 'minLengthField',
            label: 'Min Length Field',
            type: 'text',
            value: '',
            validationOptions: {
                minLength: hasMinLength(5, 'Value is too short', 'Enter at least 5 characters')
            },
            ...fieldDescriptionValues
        })
        field.setValidationTriggerMode(['onBlur', 'onChange', 'onSubmit'])

        if (form) {
            form.addFields(field)
            setForm({ ...form } as IFormy)
        }
    }

    // Setup field with maxLength validation
    const setupMaxLengthField = () => {
        const field = new FieldInput({
            id: fieldsIds['maxlength-field'],
            name: 'maxLengthField',
            label: 'Max Length Field',
            type: 'text',
            value: '',
            validationOptions: {
                maxLength: hasMaxLength(20, 'Value is too long', 'Enter at most 20 characters')
            },
            ...fieldDescriptionValues
        })
        field.setValidationTriggerMode(['onBlur', 'onChange', 'onSubmit'])

        if (form) {
            form.addFields(field)
            setForm({ ...form } as IFormy)
        }
    }

    // Setup field with pattern validation
    const setupPatternField = () => {
        const field = new FieldInput({
            id: fieldsIds['pattern-field'],
            name: 'patternField',
            label: 'Email Field',
            type: 'text',
            value: '',
            validationOptions: {
                pattern: hasPattern(
                    '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
                    'Invalid format',
                    'Enter a valid email address'
                )
            },
            ...fieldDescriptionValues
        })
        field.setValidationTriggerMode(['onBlur', 'onChange', 'onSubmit'])

        if (form) {
            form.addFields(field)
            setForm({ ...form } as IFormy)
        }
    }

    // Setup field with multiple validations
    const setupMultipleValidations = () => {
        const field = new FieldInput({
            id: fieldsIds['multiple-field'],
            name: 'multipleField',
            label: 'Email Field (Required, Min 5 chars)',
            type: 'text',
            value: '',
            validationOptions: {
                required: isRequired(true, 'This field is required'),
                minLength: hasMinLength(5, 'Value is too short'),
                pattern: hasPattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$', 'Invalid format')
            },
            ...fieldDescriptionValues
        })
        field.setValidationTriggerMode(['onBlur', 'onChange', 'onSubmit'])

        if (form) {
            form.addFields(field)
            setForm({ ...form } as IFormy)
        }
    }

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (form) {
            form.validateAll()
        }
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Validation Test Page</h1>

            <div className="mb-6">
                <h2 className="text-xl mb-2">Setup Test Field</h2>
                <div className="flex space-x-2">
                    <button
                        data-test="setup-required"
                        onClick={() => setupRequiredField(setForm)}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Required Field
                    </button>
                    <button
                        data-test="setup-minLength"
                        onClick={() => setupMinlengthField(setForm)}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        MinLength Field
                    </button>
                    <button
                        data-test="setup-maxLength"
                        onClick={setupMaxLengthField}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        MaxLength Field
                    </button>
                    <button
                        data-test="setup-pattern"
                        onClick={setupPatternField}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Pattern Field
                    </button>
                    <button
                        data-test="setup-multiple"
                        onClick={setupMultipleValidations}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Multiple Validations
                    </button>
                </div>
            </div>

            {form && (
                <FormyProvider formInstance={form}>
                    <form onSubmit={handleSubmit} className="mb-6">
                        <div className="mb-4">
                            <InputText fieldName="requiredField" />
                            <InputText fieldName="minLengthField" />
                            <InputText fieldName="maxLengthField" />
                            <InputText fieldName="patternField" />
                            <InputText fieldName="multipleField" />
                        </div>

                        <button
                            data-test="submit-button"
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Submit
                        </button>
                    </form>
                </FormyProvider>
            )}
        </div>
    )
}

export default ValidationTestPage
