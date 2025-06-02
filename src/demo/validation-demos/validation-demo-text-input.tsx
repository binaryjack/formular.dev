import FormularForm from '@components/formular-form/formular-form'

import InputText from '@components/input-text/input-text'
import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { useField } from '@core/framework/react/fields/hooks/use-field'
import {
    defaultInitializationDependencies,
    defaultInitializationParameters
} from '@core/input-engine/generator/builder/settings/input-dependency-configuration.ts'

import { FormularManager } from '@core/managers/formular-manager/formular-manager'

import { lifeCylceInstances } from '@demo/common/common-instances'

import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { newDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { GenericValidationBuilder } from '@core/managers/validation-manager/generic-validation-builder/generic-validation-builder'
import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import { fileDescriptorMock } from '@tests/mocks/file-descriptor-mock'
import { maxLengthValidationMock } from '@tests/mocks/max-length-validation-mock'
import { minLengthValidationMock } from '@tests/mocks/min-length-validation-mock'
import { requiredDataValidationMock } from '@tests/mocks/required-data-validation-mock'
import { useEffect, useState } from 'react'
import { BooleanConstraint } from './components/boolean-constraint'
import { FormsContentFrame } from './components/form-content-frame'
import { NumericConstraint } from './components/numeric-constraint'
import { RegExpConstraint } from './components/regexp-constraint'
import { TriggerMode } from './components/trigger-mode'
import { useDemoSettings } from './hooks/useDemoSettings'

const defaultFieldName = 'sandboxField'

export interface ISubmitObject {
    sandboxField: string
}

const formularManager = new FormularManager(
    lifeCylceInstances.notificationManager,
    lifeCylceInstances.autoTracker
)
const validationOptionsMock: IValidationOptions = new GenericValidationBuilder()
    .setConstraints<any>([
        requiredDataValidationMock(defaultFieldName, true),
        minLengthValidationMock(defaultFieldName, 3),
        maxLengthValidationMock(defaultFieldName, 50)
    ])
    .build()

const optionsMocks: IOptionItem[] = []

const config = newDependencyConfiguration(
    fileDescriptorMock(
        defaultFieldName,
        defaultFieldName,
        'text',
        validationOptionsMock,
        optionsMocks
    ),
    defaultInitializationParameters,
    defaultInitializationDependencies
)
const ValidationDemoTextInput = () => {
    const formular = formularManager.createfromConfiguration('validation-demo-text-input-form', [
        config
    ]) as IFormular<ISubmitObject>

    const { instance } = useField(formular.fields[0])
    const [internalForm, setInternalForm] = useState<IFormular<ISubmitObject> | null>(null)

    const {
        submissionObject,
        setSubmissionObject,
        validationOptions,
        validationTriggerMode,
        handleTriggerModeChange,
        handleValidationOptionChange
    } = useDemoSettings<ISubmitObject>(
        instance,
        internalForm,
        validationOptionsMock,
        'onFocus',
        'onBlur',
        'onChange',
        'onSubmit',
        'validateOnFormFirstSubmit'
    )

    useEffect(() => {
        formular.setValidationTriggerMode(validationTriggerMode)
        setInternalForm(formular)
    }, [])

    const handleSubmit = (data: any) => {
        setSubmissionObject(data as ISubmitObject)
    }

    return (
        <>
            {internalForm && (
                <FormularForm formular={internalForm} onSubmit={handleSubmit} isloading={false}>
                    <FormsContentFrame
                        childrenMin={
                            <NumericConstraint
                                validationOptions={validationOptions}
                                handleValidationOptionChange={handleValidationOptionChange}
                                fieldName={defaultFieldName}
                                type={'min'}
                                errorMessage={'This field must be greater than or equal to {{min}}'}
                                guideMessage={
                                    'This field must be greater than or equal to {{min}}.'
                                }
                            />
                        }
                        childrenMax={
                            <NumericConstraint
                                validationOptions={validationOptions}
                                handleValidationOptionChange={handleValidationOptionChange}
                                fieldName={defaultFieldName}
                                type={'max'}
                                errorMessage={'This field must be less than or equal to {{max}}'}
                                guideMessage={'This field must be less than or equal to {{max}}.'}
                            />
                        }
                        childrenMinLength={
                            <NumericConstraint
                                validationOptions={validationOptions}
                                handleValidationOptionChange={handleValidationOptionChange}
                                fieldName={defaultFieldName}
                                type={'minLength'}
                                errorMessage={
                                    'The caracter length must be greater than or equal to {{min}}'
                                }
                                guideMessage={
                                    'The caracter length must be greater than or equal to {{min}}.'
                                }
                            />
                        }
                        childrenMaxLength={
                            <NumericConstraint
                                validationOptions={validationOptions}
                                handleValidationOptionChange={handleValidationOptionChange}
                                fieldName={defaultFieldName}
                                type={'maxLength'}
                                errorMessage={
                                    'The caracter length must be less than or equal to {{max}}'
                                }
                                guideMessage={
                                    'The caracter length must be less than or equal to {{max}}.'
                                }
                            />
                        }
                        childrenPattern={
                            <RegExpConstraint
                                validationOptions={validationOptions}
                                handleValidationOptionChange={handleValidationOptionChange}
                                fieldName={defaultFieldName}
                                type={'pattern'}
                                errorMessage={'This field must match the pattern {{pattern}}'}
                                guideMessage={'This field must match the pattern {{pattern}}.'}
                            />
                        }
                        childrenRequired={
                            <BooleanConstraint
                                validationOptions={validationOptions}
                                handleValidationOptionChange={handleValidationOptionChange}
                                fieldName={defaultFieldName}
                                type={'required'}
                                errorMessage={'This field is required'}
                                guideMessage={'This field must be filled out.'}
                            />
                        }
                        childrenTriggerMode={
                            <TriggerMode
                                validationTriggerMode={validationTriggerMode}
                                handleTriggerModeChange={handleTriggerModeChange}
                            />
                        }
                        childrenInput={<InputText fieldName={defaultFieldName} />}
                        childrenSubmissionObjectResult={JSON.stringify(submissionObject, null, 2)}
                    />
                </FormularForm>
            )}
        </>
    )
}

export default ValidationDemoTextInput
