import CheckInput from '@components/check-Input/check-Input'
import FormularForm from '@components/formular-form/formular-form'
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
import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import { fileDescriptorMock } from '@tests/mocks/file-descriptor-mock'
import { useEffect, useState } from 'react'
import { FormsContentFrame } from './components/form-content-frame'
import { Required } from './components/required'
import { TriggerMode } from './components/trigger-mode'
import { useDemoSettings } from './hooks/useDemoSettings'

const fieldName = 'checkInput'

interface ISubmitObject {
    checkInput: boolean
}

const formularManager = new FormularManager(
    lifeCylceInstances.notificationManager,
    lifeCylceInstances.autoTracker
)

const validationOptionsMock: IValidationOptions = {}
const optionsMocks: IOptionItem[] = []

const config = newDependencyConfiguration(
    fileDescriptorMock(fieldName, 'isChecked', 'checkbox', validationOptionsMock),
    defaultInitializationParameters,
    defaultInitializationDependencies
)

const ValidationDemoCheckInput = () => {
    const formular = formularManager.createfromConfiguration('validation-demo-check-form', [
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
        'onFocus',
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
                        childrenInput={<CheckInput fieldName={fieldName} />}
                        childrenSubmissionObjectResult={JSON.stringify(submissionObject, null, 2)}
                    />
                </FormularForm>
            )}
        </>
    )
}

export default ValidationDemoCheckInput
