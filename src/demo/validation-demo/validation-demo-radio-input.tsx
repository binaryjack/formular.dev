import FormularForm from '@components/formular-form/formular-form'
import RadioInput from '@components/radio-input/radio-input'
import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { EventsType } from '@core/framework/events/events.types'
import { useField } from '@core/framework/react/fields/hooks/use-field'
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

import { validationOptionsMock } from '@tests/mocks/validation-options-mock'
import { useEffect, useState } from 'react'

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

const field = InputsProvider(
    [radioFileDescriptorMock(validationOptionsForRadioMock, mockOptions)],
    defaultInitializationParameters,
    defaultInitializationDependencies
)?.[0]

const ValidationDemoRadioInput = () => {
    const [submissionObject, setSubmissionObject] = useState<ISubmitObject>()

    const [validationOptions, setValidationOptions] = useState(validationOptionsMock)

    const { instance } = useField(field)

    const [internalForm, setInternalForm] = useState<IFormular<ISubmitObject> | null>(null)

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

    const handleValidationOptionChange = (key: keyof typeof validationOptionsMock, value: any) => {
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
                            <div className="validation-controls w-full">
                                <div className="flex px-1 flex-row w-full ">
                                    <div className="flex px-2 flex-col w-full">
                                        <label htmlFor="required-v">Required:</label>
                                        <input
                                            className="mx-2"
                                            id="required-v"
                                            type="checkbox"
                                            checked={
                                                validationOptions.requiredData?.required || false
                                            }
                                            onChange={(e) =>
                                                handleValidationOptionChange('requiredData', {
                                                    required: e.target.checked
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex px-2  flex-col w-full">
                                    <label htmlFor="validationTriggerMode-v">
                                        Validation Trigger Mode:
                                    </label>
                                    <select
                                        id="validationTriggerMode-v"
                                        multiple
                                        value={validationTriggerMode}
                                        onChange={(e) =>
                                            handleTriggerModeChange(
                                                Array.from(
                                                    e.target.selectedOptions,
                                                    (option) => option.value as EventsType
                                                )
                                            )
                                        }
                                    >
                                        <option value="onClick">onClick</option>
                                        <option value="validateOnFormFirstSubmit">
                                            validateOnFormFirstSubmit
                                        </option>
                                        <option value="onFocus">onFocus</option>
                                        <option value="onBlur">onBlur</option>
                                        <option value="onChange">onChange</option>
                                        <option value="onSubmit">onSubmit</option>
                                        <option value="onLoad">onLoad</option>
                                        <option value="reset">reset</option>
                                    </select>
                                </div>
                            </div>
                            {instance?.valueManager?.getAsString?.(
                                instance as unknown as IExtendedInput
                            )}
                            <div className="input-container w-full mt-14 mb-20">
                                <RadioInput fieldName="radioSandbox" />
                            </div>
                            <div className="w-full">
                                <h3 className="text-lg font-bold">Submission Object:</h3>
                                {JSON.stringify(submissionObject, null, 2)}
                            </div>
                        </div>
                    </div>
                </FormularForm>
            )}
        </>
    )
}

export default ValidationDemoRadioInput
