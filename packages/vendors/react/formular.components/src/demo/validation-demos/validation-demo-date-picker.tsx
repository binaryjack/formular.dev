import { useField } from '@adapters/react/fields/hooks/use-field'
import { useService } from '@adapters/react/services/use-service'
import DatePicker from '@components/date-picker/date-picker'
import FormularForm from '@components/formular-form/formular-form'
import {
    fileDescriptorMock,
    GenericValidationBuilder,
    IConfigurationManager,
    IFormular,
    IFormularManager,
    IOptionItem,
    IValidationOptions,
    maxValidationMock,
    minLengthValidationMock,
    minValidationMock,
    requiredDataValidationMock,
    SConfigurationManager,
    SFormularManager
} from 'formular.dev.lib'
import { useEffect, useState } from 'react'
import { BooleanConstraint } from './components/boolean-constraint'
import { DateConstraint } from './components/date-constraint'
import { FormsContentFrame } from './components/form-content-frame'
import { TriggerMode } from './components/trigger-mode'
import { useDemoSettings } from './hooks/useDemoSettings'

const fieldName = 'dateValue'

interface ISubmitObject {
    dateValue: string
}

const validationOptionsMock: IValidationOptions = new GenericValidationBuilder()
    .setConstraints<any>([
        requiredDataValidationMock(fieldName, true),
        minValidationMock(fieldName, new Date('2023-01-01').getTime()),
        maxValidationMock(fieldName, new Date('2025-12-31').getTime()),
        minLengthValidationMock(fieldName, 10)
    ])
    .build()

const optionsMocks: IOptionItem[] = []

const ValidationDemoDatePicker = () => {
    const { getService } = useService()

    const formularManager = getService<IFormularManager>(SFormularManager)
    const configurationManager = getService<IConfigurationManager>(SConfigurationManager)

    // Access basic configuration properly
    console.log('=== CONFIGURATION ACCESS ===')
    if (configurationManager) {
        console.log('Configuration Manager Available: true')
        console.log('Active Configuration:', configurationManager.activeConfiguration?.name)

        // Correct way to access configuration values using getConfigByName
        const formBehavior = configurationManager.getConfigByName('behavior', 'form')
        const validationTriggers = configurationManager.getConfigByName(
            'behavior',
            'form',
            'validationTriggers'
        )
        const defaultCulture = configurationManager.getConfigByName('cultures', 'defaultCulture')
        const targetEnvironment = configurationManager.activeConfiguration?.targetEnvironment

        console.log('Form Behavior:', formBehavior)
        console.log('Validation Triggers:', validationTriggers)
        console.log('Default Culture:', defaultCulture)
        console.log('Target Environment:', targetEnvironment)
    } else {
        console.error('Configuration Manager not available!')
    }

    const descriptor = fileDescriptorMock(
        fieldName,
        'Date Picker',
        'date',
        validationOptionsMock,
        optionsMocks,
        '##/##/####'
    )

    const formular = formularManager?.createFromDescriptors('validation-demo-date-picker-form', [
        descriptor
    ]) as IFormular<ISubmitObject>

    const { instance } = useField(formular.fields[0])
    const [internalForm, setInternalForm] = useState<IFormular<ISubmitObject> | null>(null)

    const {
        submissionObject,
        setSubmissionObject,
        validationOptions,
        triggerKeyWord,
        handleTriggerModeChange,
        handleValidationOptionChange
    } = useDemoSettings<ISubmitObject>(
        instance,
        internalForm,
        validationOptionsMock,
        'onFocus',
        'onBlur',
        'onChange',
        'onSubmit',
        'onClear',
        'validateOnFormFirstSubmit'
    )

    useEffect(() => {
        formular.setTriggerKeyWord(triggerKeyWord)
        setInternalForm(formular)
    }, [])

    const handleSubmit = (data: any) => {
        setSubmissionObject({} as ISubmitObject)
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
                        childrenMin={
                            <DateConstraint
                                validationOptions={validationOptions}
                                handleValidationOptionChange={handleValidationOptionChange}
                                fieldName={fieldName}
                                type={'min'}
                                errorMessage={'This field must be greater than or equal to {{min}}'}
                                guideMessage={
                                    'This field must be greater than or equal to {{min}}.'
                                }
                            />
                        }
                        childrenMax={
                            <DateConstraint
                                validationOptions={validationOptions}
                                handleValidationOptionChange={handleValidationOptionChange}
                                fieldName={fieldName}
                                type={'max'}
                                errorMessage={'This field must be less than or equal to {{max}}'}
                                guideMessage={'This field must be less than or equal to {{max}}.'}
                            />
                        }
                        childrenTriggerMode={
                            <TriggerMode
                                triggerKeyWord={triggerKeyWord}
                                handleTriggerModeChange={handleTriggerModeChange}
                            />
                        }
                        childrenInput={<DatePicker fieldName={fieldName} />}
                        childrenSubmissionObjectResult={JSON.stringify(submissionObject, null, 2)}
                    />
                </FormularForm>
            )}
        </>
    )
}

export default ValidationDemoDatePicker
