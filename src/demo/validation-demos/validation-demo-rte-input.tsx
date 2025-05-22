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
import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import { lifeCylceInstances } from '@demo/common/common-instances'
import { fileDescriptorMock } from '@tests/mocks/file-descriptor-mock'
import { maxLengthValidationMock } from '@tests/mocks/max-length-validation-mock'
import { minLengthValidationMock } from '@tests/mocks/min-length-validation-mock'
import { requiredDataValidationMock } from '@tests/mocks/required-data-validation-mock'
import { FormsContentFrame } from './components/form-content-frame'
import { Required } from './components/required'
import { TriggerMode } from './components/trigger-mode'
import { useDemoSettings } from './hooks/useDemoSettings'

export interface ISubmitObject {
    rti: string
}
const formularManager = new FormularManager(
    lifeCylceInstances.notificationManager,
    lifeCylceInstances.autoTracker
)

const validationOptionsMock: IValidationOptions = {
    requiredData: requiredDataValidationMock('rti', true),
    minLength: minLengthValidationMock('rti', 10),
    maxLength: maxLengthValidationMock('rti', 500)
}
const optionsMocks: IOptionItem[] = []

const config = newDependencyConfiguration(
    fileDescriptorMock('rteInputSandbox', 'RTE Input', 'richtext', validationOptionsMock),
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
                        childrenInput={
                            <RteInput
                                id="rteInputSandbox"
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
