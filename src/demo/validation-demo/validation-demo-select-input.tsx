import FormularForm from '@components/formular-form/formular-form'
import Select from '@components/select-input/select-input'
import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { EventsType } from '@core/framework/events/events.types'
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
    const [submissionObject, setSubmissionObject] = useState<ISubmitObject>()
    const [validationOptions, setValidationOptions] = useState(validationOptionsForSelectMock)

    const [internalForm, setInternalForm] = useState<IFormular<ISubmitObject> | null>(null)

    const { instance } = useField(field)

    const [validationTriggerMode, setValidationTriggerMode] = useState<EventsType[]>([
        'onFocus',
        'onBlur',
        'onChange',
        'onSubmit',
        'validateOnFormFirstSubmit'
    ])

    useEffect(() => {
        formular.setValidationTriggerMode(validationTriggerMode)
        formular.addFields(field)
        setInternalForm(formular)
    }, [])

    useEffect(() => {
        if (!validationOptions || !instance) return
        instance.input.validationOptions = validationOptions
    }, [instance, validationOptions])

    useEffect(() => {
        if (!internalForm) return
        internalForm?.setValidationTriggerMode(validationTriggerMode)
    }, [internalForm, validationTriggerMode])

    const handleValidationOptionChange = (
        key: keyof typeof validationOptionsForSelectMock,
        value: any
    ) => {
        setValidationOptions((prev) => ({
            ...prev,
            [key]: { ...prev[key], ...value }
        }))
        field.validationOptions = { ...validationOptions, [key]: value }
    }

    const handleTriggerModeChange = (mode: EventsType[]) => {
        setValidationTriggerMode(mode)
        field.input.validationManager.setValidationTriggerMode(mode)
    }

    const handleSubmit = (data: any) => {
        setSubmissionObject(data as ISubmitObject)
    }

    return (
        <>
            {internalForm && (
                <FormularForm formular={internalForm} onSubmit={handleSubmit} isloading={false}>
                    <div className="sandbox-container flex flex-row p-1 w-full h-full">
                        <div className="sandbox-container flex flex-col p-1 w-full h-full">
                            <div className="validation-controls">
                                <label htmlFor="required-v">Required:</label>
                                <input
                                    id="required-v"
                                    type="checkbox"
                                    checked={validationOptions.requiredData?.required ?? false}
                                    onChange={(e) =>
                                        handleValidationOptionChange('requiredData', {
                                            required: e.target.checked
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <Select fieldName="selectedOption" />
                    </div>
                </FormularForm>
            )}

            {submissionObject && (
                <div className="submission-result">
                    <h3>Submission Result:</h3>
                    <pre>{JSON.stringify(submissionObject, null, 2)}</pre>
                </div>
            )}
        </>
    )
}

export default ValidationDemoSelectInput
