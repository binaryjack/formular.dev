import { default as FormularForm } from '@components/formular-form/formular-form'

import InputText from '@components/input-text/input-text'
import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { InputDataTypes } from '@core/framework/common/common.input.data.types'
import { getTranslationBuilder, getTranslations } from '@core/framework/localize/localize.utils'
import { FieldSchemaBuilder } from '@core/framework/schema/field-schema/field.schema.builder'
import { IEntityScheme } from '@core/framework/schema/field-schema/field.schema.types'
import { ValidationSchemaBuildersEnum } from '@core/framework/schema/validation-schema/presets/builders.enum'
import { ValidationSchemaBuilderType } from '@core/framework/schema/validation-schema/schema/builder/validation.schema.builder.types'
import validationSchemaFactory from '@core/framework/schema/validation-schema/schema/factory/validation.schema.factory'
import {
    eMailPattern,
    namesPattern
} from '@core/framework/schema/validation-schema/validation.regex.patterns'
import { IValidationSchema } from '@core/framework/schema/validation-schema/validation.schema.types'
import { Validators } from '@core/framework/schema/validation-schema/validators'
import {
    defaultInitializationDependencies,
    defaultInitializationParameters
} from '@core/input-engine/generator/builder/settings/input-dependency-configuration.ts'
import { FormularManager } from '@core/managers/formular-manager/formular-manager'
import { lifeCylceInstances } from '@demo/common/common-instances'
import { InputTextBuilder } from '@demo/form-demo/field-schema-builder/builders-preset/input-text-builder'
import { useEffect, useState } from 'react'

const fieldsIds: Record<string, number> = {
    'required-field': 0,
    'minlength-field': 1,
    'maxlength-field': 2,
    'pattern-field': 3,
    'multiple-field': 4
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

const fm = new FormularManager(lifeCylceInstances.autoTracker)

export const txtSchema: IEntityScheme = {
    name: 'datePickerDemoSchema',
    properties: [
        InputTextBuilder.setValidationData(true, Validators.baseRequiredNameValidator).build()
    ]
}

export const newForm =
    fm.createFromSchema(
        txtSchema,
        defaultInitializationParameters,
        defaultInitializationDependencies,
        getTranslationBuilder,
        getTranslations()
    ) ?? null

const setupForm = <T extends object>(
    id: number,
    name: string,
    type: InputDataTypes,
    required: boolean,
    setForm: React.Dispatch<React.SetStateAction<IFormular<T> | null>>,
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

    const demoFormInstance = fm.createFromSchema(
        scheme,
        defaultInitializationParameters,
        defaultInitializationDependencies,
        getTranslationBuilder,
        getTranslations()
    )

    setForm(demoFormInstance ?? null)
}

// Setup field with required validation
const setupRequiredField = <T extends object>(
    setForm: React.Dispatch<React.SetStateAction<IFormular<T> | null>>
) => {
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
const setupMinlengthField = <T extends object>(
    setForm: React.Dispatch<React.SetStateAction<IFormular<T> | null>>
) => {
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
const setupMaxlengthField = <T extends object>(
    setForm: React.Dispatch<React.SetStateAction<IFormular<T> | null>>
) => {
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
const setupPatternField = <T extends object>(
    setForm: React.Dispatch<React.SetStateAction<IFormular<T> | null>>
) => {
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
const setupMultipleValidations = <T extends object>(
    setForm: React.Dispatch<React.SetStateAction<IFormular<T> | null>>
) => {
    const customValidator = validationSchemaFactory.finalizer(
        true,
        minLengthBuilder,
        eMailPattern,
        'This field is required',
        'Invalid format'
    )

    setupForm(fieldsIds['multiple-field'], 'multiple-field', 'text', true, setForm, customValidator)
}

const ValidationTestPage = <T extends object>() => {
    const [formId, setFormId] = useState('validation-test-form')
    const [form, setForm] = useState<IFormular<T> | null>(null)

    // Setup form on mount
    useEffect(() => {
        setForm(newForm)
        return () => {
            // Cleanup if needed
        }
    }, [formId])

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (form) {
            // form.validate()
        }
    }

    if (!form) {
        return <>unable to locate form</>
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
                <FormularForm formular={form}>
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
                </FormularForm>
            )}
        </div>
    )
}

export default ValidationTestPage
