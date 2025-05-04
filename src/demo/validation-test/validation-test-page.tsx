import { newFormy } from '@components/formy/formy.context'
import FormyForm from '@components/formy/formy.form'
import InputText from '@components/input-text/input-text'
import { SchemaDataTypes } from '@dependency/form.common.enums'
import { getTranslationBuilder, getTranslations } from '@dependency/localize/localize.utils'
import { FieldSchemaBuilder } from '@dependency/schema/field-schema/field.schema.builder'
import { IEntityScheme } from '@dependency/schema/field-schema/field.schema.types'
import validationSchemaFactory from '@dependency/schema/validation-schema/schema/factory/validation.schema.factory'
import {
    eMailPattern,
    namesPattern
} from '@dependency/schema/validation-schema/validation.regex.patterns'
import React, { useEffect, useState } from 'react'

import { ValidationSchemaBuildersEnum } from '@dependency/schema/validation-schema/builders/builders.types'

import { Formy } from '@core/formy-base/formy-base'
import { IFormy } from '@core/formy-base/formy-base.types'
import { ValidationSchemaBuilderType } from '@dependency/schema/validation-schema/schema/builder/validation.schema.builder.types'
import { IValidationSchema } from '@dependency/schema/validation-schema/validation.schema.types'
import { _intNotificationTracker } from '../../core/notifiable-entity/notifiable-entity'

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
    validationSchemaFactory.createValidationSchemaBuilder<ValidationSchemaBuilderType>(
        ValidationSchemaBuildersEnum.MinLengthAndMaxLengthBuilder
    )?.(3, 50)

const minLengthBuilder =
    validationSchemaFactory.createValidationSchemaBuilder<ValidationSchemaBuilderType>(
        ValidationSchemaBuildersEnum.MinLengthBuilder
    )?.(5)

const maxLengthBuilder =
    validationSchemaFactory.createValidationSchemaBuilder<ValidationSchemaBuilderType>(
        ValidationSchemaBuildersEnum.MaxLengthBuilder
    )?.(20)

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

    const formInstance = newFormy(
        'demoForm',
        scheme,
        getTranslationBuilder,
        getTranslations,
        ['onChange', 'onBlur', 'onSubmit'],
        _intNotificationTracker
    )
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
        minLengthBuilder,
        namesPattern,
        'Value is too short',
        'Enter at least 5 characters'
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

// Setup field with required validation
const setupMaxlengthField = (setForm: React.Dispatch<React.SetStateAction<IFormy | null>>) => {
    const customValidator = validationSchemaFactory.finalizer(
        true,
        maxLengthBuilder,
        namesPattern,
        'Value is too long',
        'Enter at most 20 characters'
    )

    setupForm(
        fieldsIds['maxlength-field'],
        'maxlength-field',
        'text',
        true,
        setForm,
        customValidator
    )
}

// Setup field with required validation
const setupPatternField = (setForm: React.Dispatch<React.SetStateAction<IFormy | null>>) => {
    const customValidator = validationSchemaFactory.finalizer(
        true,
        minLengthBuilder,
        eMailPattern,
        'Invalid format',
        'Enter a valid email address'
    )

    setupForm(fieldsIds['pattern-field'], ' pattern-field', 'text', true, setForm, customValidator)
}

// Setup field with required validation
const setupMultipleValidations = (setForm: React.Dispatch<React.SetStateAction<IFormy | null>>) => {
    const customValidator = validationSchemaFactory.finalizer(
        true,
        minLengthBuilder,
        eMailPattern,
        'This field is required',
        'Invalid format'
    )

    setupForm(fieldsIds['multiple-field'], 'multiple-field', 'text', true, setForm, customValidator)
}

const ValidationTestPage = () => {
    const [formId, setFormId] = useState('validation-test-form')
    const [form, setForm] = useState<typeof Formy | null>(null)

    // Setup form on mount
    useEffect(() => {
        const newForm = new Formy(formId, _intNotificationTracker)
        setForm(newForm)
        return () => {
            // Cleanup if needed
        }
    }, [formId])

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
                        onClick={() => setupMaxlengthField(setForm)}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        MaxLength Field
                    </button>
                    <button
                        data-test="setup-pattern"
                        onClick={() => setupPatternField(setForm)}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Pattern Field
                    </button>
                    <button
                        data-test="setup-multiple"
                        onClick={() => setupMultipleValidations(setForm)}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Multiple Validations
                    </button>
                </div>
            </div>

            {form && (
                <FormyForm formy={form}>
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
                </FormyForm>
            )}
        </div>
    )
}

export default ValidationTestPage
