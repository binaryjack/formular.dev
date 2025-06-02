import FormularForm from '@components/formular-form/formular-form'
import Select from '@components/select-input/select-input'
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
import { mockOptions } from '@tests/mocks/i-options-items.mock'
import { patternValidationMock } from '@tests/mocks/pattern-validation-mock'
import { requiredDataValidationMock } from '@tests/mocks/required-data-validation-mock'
import { useEffect, useState } from 'react'
import { BooleanConstraint } from './components/boolean-constraint'
import { FormsContentFrame } from './components/form-content-frame'
import { TriggerMode } from './components/trigger-mode'
import { useDemoSettings } from './hooks/useDemoSettings'

const fieldName = 'selectedOption'

interface ISubmitObject {
    selectedOption: string
}

const formularManager = new FormularManager(
    lifeCylceInstances.notificationManager,
    lifeCylceInstances.autoTracker
)

const validationOptionsMock: IValidationOptions = new GenericValidationBuilder()
    .setConstraints<any>([
        requiredDataValidationMock(fieldName, true),
        patternValidationMock(fieldName, /\\.*/)
    ])
    .build()

const optionsMocks: IOptionItem[] = mockOptions

const config = newDependencyConfiguration(
    fileDescriptorMock(fieldName, 'Select Input', 'select', validationOptionsMock, optionsMocks),
    defaultInitializationParameters,
    defaultInitializationDependencies
)

const ValidationDemoSelectInput = () => {
    const formular = formularManager.createfromConfiguration('validation-demo-select-form', [
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
        'onClear',
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
                        childrenRequired={
                            <BooleanConstraint
                                validationOptions={validationOptions}
                                handleValidationOptionChange={handleValidationOptionChange}
                                fieldName={fieldName}
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
                        childrenInput={<Select fieldName={fieldName} />}
                        childrenSubmissionObjectResult={JSON.stringify(submissionObject, null, 2)}
                    />
                </FormularForm>
            )}
        </>
    )
}

export default ValidationDemoSelectInput
