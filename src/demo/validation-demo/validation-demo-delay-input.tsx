import DelayInput from '@components/delay-input/delay-input'
import FormularForm from '@components/formular-form/formular-form'
import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { useField } from '@core/framework/react/fields/hooks/use-field'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'

import {
    defaultInitializationDependencies,
    defaultInitializationParameters
} from '@core/input-engine/generator/builder/settings/input-dependency-configuration.ts'
import { InputsProvider } from '@core/input-engine/generator/input-provider'
import { FormularManager } from '@core/managers/formular-manager/formular-manager'
import { lifeCylceInstances } from '@demo/common/common-instances'

import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
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

interface ISubmitObject {
    delayValue: string
}

const formularManager = new FormularManager(
    lifeCylceInstances.notificationManager,
    lifeCylceInstances.autoTracker
)
const formular = formularManager.createEmpty(
    'validation-demo-delay-input-form'
) as IFormular<ISubmitObject>

const validationOptionsMock: IValidationOptions = {
    requiredData: requiredDataValidationMock('delayValue', true),
    minLength: minLengthValidationMock('delayValue', 3),
    maxLength: maxLengthValidationMock('delayValue', 50)
}
const optionsMocks: IOptionItem[] = []

const field = InputsProvider(
    [fileDescriptorMock('delayInputSandbox', 'delayValue', 'text', validationOptionsMock)],
    defaultInitializationParameters,
    defaultInitializationDependencies
)?.[0]

const ValidationDemoDelayInput = () => {
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
        validationOptionsMock,
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
                                <DelayInput
                                    delay={500}
                                    onChangeCallback={(value) => console.log(value)}
                                    onClearCallback={() => console.log('Cleared')}
                                    canGotFocus={true}
                                    classNames="custom-class"
                                    tabIndex={0}
                                />
                            </>
                        }
                        childrenSubmissionObjectResult={JSON.stringify(submissionObject, null, 2)}
                    />
                </FormularForm>
            )}
        </>
    )
}

export default ValidationDemoDelayInput
