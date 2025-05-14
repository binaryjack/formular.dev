import FormularForm from '@components/formular-form/formular-form'

import InputText from '@components/input-text/input-text'
import { Formular } from '@core/formular-base/formular-base'
import { IFormular } from '@core/formular-base/formular-base.types'
import { EventsType } from '@core/framework/events/events.types'
import { newFieldError } from '@core/framework/models/errors/new-field-error'
import { newFieldGuide } from '@core/framework/models/errors/new-field-guide'
import { useField } from '@core/framework/react/fields/hooks/use-field'
import {
    defaultInitializationDependencies,
    defaultInitializationParameters
} from '@core/input-engine/generator/builder/settings/input-dependency-configuration.ts'
import { InputsProvider } from '@core/input-engine/generator/input-provider'

import { NotifierDebugUi } from '@core/managers/notification-manager/notifier-debug-ui/notifier-debug-ui'
import {
    IValidationOptions,
    ValidationErrorsCodes
} from '@core/managers/validation-manager/validation-manager.types'
import { lifeCylceInstances } from '@demo/common/common-instances'
import { txtFileDescriptorMock } from '@mocks/txt-file-descriptor-mock'
import { validationOptionsMock } from '@mocks/validation-options-mock'
import { useEffect, useState } from 'react'

const field = InputsProvider(
    [txtFileDescriptorMock(validationOptionsMock)],
    defaultInitializationParameters,
    defaultInitializationDependencies
)?.[0]

const FieldInputValidationSandbox = () => {
    const [validationOptions, setValidationOptions] =
        useState<IValidationOptions>(validationOptionsMock)

    const { instance } = useField(field)

    const [internalForm, setInternalForm] = useState<IFormular | null>(null)

    const [validationTriggerMode, setValidationTriggerMode] = useState<EventsType[]>([
        'onBlur',
        'onChange'
    ])

    useEffect(() => {
        const validationDemoForm = new Formular(
            'validation-demo-form',
            lifeCylceInstances._intNotificationTracker
        )
        validationDemoForm.setValidationTriggerMode(validationTriggerMode)

        validationDemoForm.addFields(field)
        setInternalForm(validationDemoForm)
    }, [])

    useEffect(() => {
        if (!validationOptions || !instance) return
        instance.input.validationOptions = validationOptions
    }, [instance, validationOptions])

    useEffect(() => {
        if (!internalForm) return

        internalForm?.setValidationTriggerMode(validationTriggerMode)
    }, [internalForm, validationTriggerMode])

    const handleValidationOptionChange = (key: keyof IValidationOptions, value: any) => {
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
        console.log(data)
    }

    return (
        <>
            {internalForm && (
                <FormularForm formular={internalForm} onSubmit={handleSubmit}>
                    <div className="sandbox-container flex flex-row p-1 w-full h-full">
                        <div className="sandbox-container flex flex-col p-1 w-full h-full">
                            <div className="validation-controls w-full">
                                <div className="flex px-1 flex-row w-full ">
                                    <div className="flex px-2 flex-col w-full">
                                        <label htmlFor="max-v">Max:</label>{' '}
                                        <input
                                            id="max-v"
                                            type="number"
                                            value={validationOptions.max?.max ?? ''}
                                            onChange={(e) =>
                                                handleValidationOptionChange('max', {
                                                    max: parseInt(e.target.value, 10),
                                                    error: newFieldError(
                                                        'sandboxField',
                                                        ValidationErrorsCodes.max,
                                                        `This field requires a value that must not be greater than ${parseInt(e.target.value, 10)}!`
                                                    ),
                                                    guide: newFieldGuide(
                                                        'sandboxField',
                                                        ValidationErrorsCodes.max,
                                                        `please enter a value less than ${parseInt(e.target.value, 10)}.`
                                                    )
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="flex px-2  flex-col w-full">
                                        <label htmlFor="min-v">Min:</label>{' '}
                                        <input
                                            id="min-v"
                                            type="number"
                                            value={validationOptions.min?.min ?? ''}
                                            onChange={(e) =>
                                                handleValidationOptionChange('min', {
                                                    min: parseInt(e.target.value, 10),
                                                    error: newFieldError(
                                                        'sandboxField',
                                                        ValidationErrorsCodes.min,
                                                        `This field requires a value that must not be less than ${parseInt(e.target.value, 10)}!`
                                                    ),
                                                    guide: newFieldGuide(
                                                        'sandboxField',
                                                        ValidationErrorsCodes.min,
                                                        `please enter a value greater than ${parseInt(e.target.value, 10)}.`
                                                    )
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex px-1 flex-row w-full ">
                                    <div className="flex px-2 flex-col w-full">
                                        <label htmlFor="maxLength-v">Max Length:</label>{' '}
                                        <input
                                            id="maxLength-v"
                                            type="number"
                                            value={validationOptions.maxLength?.maxLength ?? ''}
                                            onChange={(e) =>
                                                handleValidationOptionChange('maxLength', {
                                                    maxLength: parseInt(e.target.value, 10),
                                                    error: newFieldError(
                                                        'sandboxField',
                                                        ValidationErrorsCodes.maxLength,
                                                        `This field requires a value with a length not exceeding ${parseInt(e.target.value, 10)} characters!`
                                                    ),
                                                    guide: newFieldGuide(
                                                        'sandboxField',
                                                        ValidationErrorsCodes.maxLength,
                                                        `please enter a value with fewer than ${parseInt(e.target.value, 10)} characters.`
                                                    )
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="flex px-2 flex-col w-full">
                                        <label htmlFor="minLength-v">Min Length:</label>{' '}
                                        <input
                                            id="minLength-v"
                                            type="number"
                                            value={validationOptions.minLength?.minLength ?? ''}
                                            onChange={(e) =>
                                                handleValidationOptionChange('minLength', {
                                                    minLength: parseInt(e.target.value, 10),
                                                    error: newFieldError(
                                                        'sandboxField',
                                                        ValidationErrorsCodes.minLength,
                                                        `This field requires a value with a length of at least ${parseInt(e.target.value, 10)} characters!`
                                                    ),
                                                    guide: newFieldGuide(
                                                        'sandboxField',
                                                        ValidationErrorsCodes.minLength,
                                                        `please enter a value with more than ${parseInt(e.target.value, 10)} characters.`
                                                    )
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex px-2  flex-row w-full ">
                                    <div className="flex px-2 flex-col w-full">
                                        <label htmlFor="pattern-v">Pattern:</label>{' '}
                                        <input
                                            id="pattern-v"
                                            type="text"
                                            value={validationOptions.pattern?.pattern ?? ''}
                                            onChange={(e) =>
                                                handleValidationOptionChange('pattern', {
                                                    pattern: e.target.value,
                                                    error: newFieldError(
                                                        'sandboxField',
                                                        ValidationErrorsCodes.custom,
                                                        `This field requires a value matching the pattern: ${e.target.value}!`
                                                    ),
                                                    guide: newFieldGuide(
                                                        'sandboxField',
                                                        ValidationErrorsCodes.custom,
                                                        `please enter a value that matches the pattern: ${e.target.value}.`
                                                    )
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="flex px-2 flex-row w-full items-center justify-center">
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
                                    </label>{' '}
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
                                        <option value="onBlur">onBlur</option>
                                        <option value="onChange">onChange</option>
                                        <option value="onSubmit">onSubmit</option>
                                        <option value="onLoad">onLoad</option>
                                        <option value="reset">reset</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input-container w-full">
                                <InputText fieldName="sandboxField" />
                            </div>
                        </div>
                        <div className="sandbox-container flex flex-col p-1 w-full h-full">
                            <NotifierDebugUi
                                internalNotifierInstance={
                                    lifeCylceInstances._intNotificationTracker
                                }
                            />
                        </div>
                    </div>
                </FormularForm>
            )}
        </>
    )
}

export default FieldInputValidationSandbox
