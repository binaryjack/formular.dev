import FormularForm from '@components/formular-form/formular-form'
import RadioInput from '@components/radio-input/radio-input'
import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { useField } from '@core/framework/react/fields/hooks/use-field'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import {
    defaultInitializationDependencies,
    defaultInitializationParameters
} from '@core/input-engine/generator/builder/settings/input-dependency-configuration.ts'

import { InputsProvider } from '@core/input-engine/generator/input-provider'
import { FormularManager } from '@core/managers/formular-manager/formular-manager'
import { lifeCylceInstances } from '@demo/common/common-instances'
import { mockOptions } from '@tests/mocks/i-options-items.mock'
import { radioFileDescriptorMock } from '@tests/mocks/radio-file-descriptor-mock'
import { validationOptionsForRadioMock } from '@tests/mocks/validation-options-for-radio-mock'

import { useEffect, useState } from 'react'
import { FormsContentFrame } from './components/form-content-frame'
import { Required } from './components/required'
import { TriggerMode } from './components/trigger-mode'
import { useDemoSettings } from './hooks/useDemoSettings'

interface ISubmitObject {
    selectedOption: string
}

const formularManager = new FormularManager(
    lifeCylceInstances.notificationManager,
    lifeCylceInstances.autoTracker
)
const formular = formularManager.createEmpty(
    'validation-demo-radio-form'
) as IFormular<ISubmitObject>

const radioBaseValidationOptionsMock = radioFileDescriptorMock(
    validationOptionsForRadioMock,
    mockOptions
) as IFieldDescriptor

const field = InputsProvider(
    [radioBaseValidationOptionsMock],
    defaultInitializationParameters,
    defaultInitializationDependencies
)?.[0]

const ValidationDemoRadioInput = () => {
    const { instance } = useField(field)
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
        validationOptionsForRadioMock,
        'onClick',
        'onBlur',
        'onSubmit',
        'validateOnFormFirstSubmit'
    )

    useEffect(() => {
        formular.setValidationTriggerMode(validationTriggerMode)
        formular.addFields(field)
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
                        childrenInput={
                            <>
                                {instance?.valueManager?.getAsString?.(
                                    instance as unknown as IExtendedInput
                                )}
                                <RadioInput fieldName="radioSandbox" />
                            </>
                        }
                        childrenSubmissionObjectResult={JSON.stringify(submissionObject, null, 2)}
                    />
                </FormularForm>
            )}
        </>
    )
}

export default ValidationDemoRadioInput
