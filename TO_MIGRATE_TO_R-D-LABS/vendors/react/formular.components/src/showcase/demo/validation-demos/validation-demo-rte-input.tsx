import { useField } from '@adapters/react/fields/hooks/use-field'
import { useService } from '@adapters/react/services/use-service'
import FormularForm from '@components/formular-form/formular-form'
import { RteInput } from '@components/rte-Input/rte-input'
import {
    fileDescriptorMock,
    GenericValidationBuilder,
    IFormular,
    IFormularManager,
    IOptionItem,
    IValidationOptions,
    maxLengthValidationMock,
    minLengthValidationMock,
    requiredDataValidationMock,
    SFormularManager
} from 'formular.dev.lib'
import { useEffect, useState } from 'react'
import { BooleanConstraint } from './components/boolean-constraint'
import { FormsContentFrame } from './components/form-content-frame'
import { TriggerMode } from './components/trigger-mode'
import { useDemoSettings } from './hooks/useDemoSettings'

const fieldName = 'rti'

export interface ISubmitObject {
    rti: string
}

const validationOptionsMock: IValidationOptions = new GenericValidationBuilder()
    .setConstraints<any>([
        requiredDataValidationMock(fieldName, true),
        minLengthValidationMock(fieldName, 10),
        maxLengthValidationMock(fieldName, 500)
    ])
    .build()

const optionsMocks: IOptionItem[] = []

const ValidationDemoRteInput = () => {
    const { getService } = useService()
    const formularManager = getService<IFormularManager>(SFormularManager)

    const descriptor = fileDescriptorMock(
        fieldName,
        fieldName,
        'richtext',
        validationOptionsMock,
        optionsMocks
    )

    const formular = formularManager?.createFromDescriptors('validation-demo-rte-input-form', [
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
    } = useDemoSettings(
        instance,
        internalForm,
        validationOptionsMock,
        'onClick',
        'onBlur',
        'onClear',
        'onSubmit'
    )

    useEffect(() => {
        formular.setTriggerKeyWord(triggerKeyWord)
        setInternalForm(formular)
    }, [])

    const handleSubmit = (data: Record<string, any>) => {
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
                        childrenTriggerMode={
                            <TriggerMode
                                triggerKeyWord={triggerKeyWord}
                                handleTriggerModeChange={handleTriggerModeChange}
                            />
                        }
                        childrenInput={
                            <RteInput
                                id={fieldName}
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
