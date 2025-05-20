import FormularForm from '@components/formular-form/formular-form'
import Select from '@components/select-input/select-input'
import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { useField } from '@core/framework/react/fields/hooks/use-field'
import { IFieldDescriptor } from '@core/framework/schema/descriptor/field.descriptor'
import {
    defaultInitializationDependencies,
    defaultInitializationParameters
} from '@core/input-engine/generator/builder/settings/input-dependency-configuration.ts'
import { InputsProvider } from '@core/input-engine/generator/input-provider'
import { FormularManager } from '@core/managers/formular-manager/formular-manager'
import { lifeCylceInstances } from '@demo/common/common-instances'
import { mockOptions } from '@tests/mocks/i-options-items.mock'
import { selectFileDescriptorMock } from '@tests/mocks/select-file-descriptor-mock'
import { validationOptionsForSelectMock } from '@tests/mocks/validation-options-for-select-mock'
import { useEffect, useState } from 'react'
import { FormsContentFrame } from './components/form-content-frame'
import { Pattern } from './components/pattern'
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
    'validation-demo-select-form'
) as IFormular<ISubmitObject>

const selectBaseValidationOptionsMock = selectFileDescriptorMock(
    validationOptionsForSelectMock,
    mockOptions
) as IFieldDescriptor

const field = InputsProvider(
    [selectBaseValidationOptionsMock],
    defaultInitializationParameters,
    defaultInitializationDependencies
)?.[0]

const ValidationDemoSelectInput = () => {
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
        validationOptionsForSelectMock,
        'onFocus',
        'onBlur',
        'onChange',
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
                        childrenPattern={
                            <Pattern
                                validationOptions={validationOptions}
                                handleValidationOptionChange={handleValidationOptionChange}
                            />
                        }
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
                        childrenInput={<Select fieldName="selectedOption" />}
                        childrenSubmissionObjectResult={JSON.stringify(submissionObject, null, 2)}
                    />
                </FormularForm>
            )}
        </>
    )
}

export default ValidationDemoSelectInput
