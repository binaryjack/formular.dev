import DelayInput from '@components/delay-input/delay-input'
import FormularForm from '@components/formular-form/formular-form'
import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { useField } from '@core/framework/react/fields/hooks/use-field'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'

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
import { FormsContentFrame } from './components/form-content-frame'
import { Required } from './components/required'
import { TriggerMode } from './components/trigger-mode'
import { useDemoSettings } from './hooks/useDemoSettings'

const fieldName = 'delayValue'

interface ISubmitObject {
    delayValue: string
}
const formularManager = new FormularManager(
    lifeCylceInstances.notificationManager,
    lifeCylceInstances.autoTracker
)

const validationOptionsMock: IValidationOptions = new GenericValidationBuilder()
    .setConstraints<any>([
        requiredDataValidationMock(fieldName, true),
        minLengthValidationMock(fieldName, 3),
        maxLengthValidationMock(fieldName, 50)
    ])
    .build()

const optionsMocks: IOptionItem[] = []

const config = newDependencyConfiguration(
    fileDescriptorMock(fieldName, fieldName, 'text', validationOptionsMock),
    defaultInitializationParameters,
    defaultInitializationDependencies
)
const ValidationDemoDelayInput = () => {
    const formular = formularManager.createfromConfiguration('validation-demo-delay-input-form', [
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
        'onClick',
        'onBlur',
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
                        childrenInput={
                            <>
                                {instance?.input.valueManager?.getAsString?.(
                                    instance as unknown as IExtendedInput
                                )}
                                <DelayInput
                                    delay={500}
                                    onChangeCallback={(value) => console.log(value)}
                                    onClearCallback={() => console.log('Cleared')}
                                    canGotFocus={true}
                                    // fieldName={fieldName}
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
