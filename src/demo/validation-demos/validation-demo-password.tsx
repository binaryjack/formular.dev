import FormularForm from '@components/formular-form/formular-form'
import Password from '@components/password/password'
import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { useField } from '@core/framework/react/fields/hooks/use-field'

import { newDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import {
    defaultInitializationDependencies,
    defaultInitializationParameters
} from '@core/input-engine/generator/builder/settings/input-dependency-configuration.ts'
import { FormularManager } from '@core/managers/formular-manager/formular-manager'
import { lifeCylceInstances } from '@demo/common/common-instances'

import { GenericValidationBuilder } from '@core/managers/validation-manager/generic-validation-builder/generic-validation-builder'
import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import { fileDescriptorMock } from '@tests/mocks/file-descriptor-mock'
import { maxLengthValidationMock } from '@tests/mocks/max-length-validation-mock'
import { minLengthValidationMock } from '@tests/mocks/min-length-validation-mock'
import { requiredDataValidationMock } from '@tests/mocks/required-data-validation-mock'
import { useEffect, useState } from 'react'
import { FormsContentFrame } from './components/form-content-frame'
import { Required } from './components/required'
import { TriggerMode } from './components/trigger-mode'
import { useDemoSettings } from './hooks/useDemoSettings'

const defaultFieldName = 'passwordValue'

interface ISubmitObject {
    passwordValue: string
}

const validationOptionsMock: IValidationOptions = new GenericValidationBuilder()
    .setConstraints<any>([
        requiredDataValidationMock(defaultFieldName, true),
        minLengthValidationMock(defaultFieldName, 8),
        maxLengthValidationMock(defaultFieldName, 20)
    ])
    .build()

const config = newDependencyConfiguration(
    fileDescriptorMock(defaultFieldName, defaultFieldName, 'text', validationOptionsMock),
    defaultInitializationParameters,
    defaultInitializationDependencies
)

const ValidationDemoPassword = () => {
    const formularManager = new FormularManager(
        lifeCylceInstances.notificationManager,
        lifeCylceInstances.autoTracker
    )
    const formular = formularManager.createfromConfiguration('validation-demo-password-form', [
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
                        childrenRequired={
                            <Required
                                validationOptions={validationOptions}
                                handleValidationOptionChange={handleValidationOptionChange}
                            />
                        }
                        childrenTriggerMode={
                            <TriggerMode
                                validationTriggerMode={validationTriggerMode}
                                handleTriggerModeChange={handleTriggerModeChange}
                            />
                        }
                        childrenInput={<Password fieldName={defaultFieldName} />}
                        childrenSubmissionObjectResult={JSON.stringify(submissionObject, null, 2)}
                    />
                </FormularForm>
            )}
        </>
    )
}

export default ValidationDemoPassword
