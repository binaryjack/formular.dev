import FormularForm from '@components/formular-form/formular-form'
import { RteInput } from '@components/rte-Input/rte-input'
import { useField } from '@core/framework/react/fields/hooks/use-field'
import {
    defaultInitializationDependencies,
    defaultInitializationParameters
} from '@core/input-engine/generator/builder/settings/input-dependency-configuration.ts'

import { useEffect, useState } from 'react'

import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { newDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import { FormularManager } from '@core/managers/formular-manager/formular-manager'
import { GenericValidationBuilder } from '@core/managers/validation-manager/generic-validation-builder/generic-validation-builder'
import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import { lifeCylceInstances } from '@demo/common/common-instances'
import { fileDescriptorMock } from '@tests/mocks/file-descriptor-mock'
import { maxLengthValidationMock } from '@tests/mocks/max-length-validation-mock'
import { minLengthValidationMock } from '@tests/mocks/min-length-validation-mock'
import { requiredDataValidationMock } from '@tests/mocks/required-data-validation-mock'
import { BooleanConstraint } from './components/boolean-constraint'
import { FormsContentFrame } from './components/form-content-frame'
import { TriggerMode } from './components/trigger-mode'
import { useDemoSettings } from './hooks/useDemoSettings'

const fieldName = 'rti'

export interface ISubmitObject {
    rti: string
}
const formularManager = new FormularManager(
    lifeCylceInstances.notificationManager,
    lifeCylceInstances.autoTracker
)

const validationOptionsMock: IValidationOptions = new GenericValidationBuilder()
    .setConstraints<any>([
        requiredDataValidationMock(fieldName, true),
        minLengthValidationMock(fieldName, 10),
        maxLengthValidationMock(fieldName, 500)
    ])
    .build()

const optionsMocks: IOptionItem[] = []

const config = newDependencyConfiguration(
    fileDescriptorMock(fieldName, fieldName, 'richtext', validationOptionsMock, optionsMocks),
    defaultInitializationParameters,
    defaultInitializationDependencies
)

const ValidationDemoRteInput = () => {
    const formular = formularManager.createfromConfiguration('validation-demo-rte-input-form', [
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
    } = useDemoSettings(
        instance,
        internalForm,
        validationOptionsMock,
        'onClick',
        'onBlur',
        'onClear',
        'onSubmit'
    )

    useEffect(() => {
        formular.setValidationTriggerMode(validationTriggerMode)
        setInternalForm(formular)
    }, [])

    const handleSubmit = (data: Record<string, any>) => {
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
                        childrenInput={
                            <RteInput
                                id={fieldName}
                                onStateChange={() => {}}
                                initialState={{ data: '', ts: `${Date.now()}` }}
                                debug={true}
                            />
                        }
                        childrenSubmissionObjectResult={JSON.stringify(submissionObject, null, 2)}
                    />
                </FormularForm>
            )}
        </>
    )
}

export default ValidationDemoRteInput
