import {
    fileDescriptorMock,
    IFormular,
    IFormularManager,
    IOptionItem,
    IValidationOptions,
    SFormularManager
} from 'formular.dev.lib'
import { useState } from 'react'

import { useField } from '@adapters/react/fields/hooks/use-field'
import { useService } from '@adapters/react/services/use-service'
import CheckInput from '@components/check-Input/check-input'
import FormularForm from '@components/formular-form/formular-form'

import { BooleanConstraint } from './components/boolean-constraint'
import { FormsContentFrame } from './components/form-content-frame'
import { TriggerMode } from './components/trigger-mode'
import { useDemoSettings } from './hooks/useDemoSettings'

const fieldName = 'checkInput'

interface ISubmitObject {
    checkInput: boolean
}

const validationOptionsMock: IValidationOptions = {}
const optionsMocks: IOptionItem[] = []

const ValidationDemoCheckInput = () => {
    const { getService } = useService()
    const formularManager = getService<IFormularManager>(SFormularManager)

    const descriptor = fileDescriptorMock(
        fieldName,
        'isChecked',
        'checkbox',
        validationOptionsMock,
        optionsMocks
    )

    const formular = formularManager?.createFromDescriptors('validation-demo-check-form', [
        descriptor
    ]) as IFormular<ISubmitObject>

    const { instance } = useField(formular.fields[0])
    const [internalForm, setInternalForm] = useState<IFormular<ISubmitObject>>(formular)

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
        'onClick',
        'onFocus',
        'onBlur',
        'onClear',
        'onSubmit',
        'validateOnFormFirstSubmit'
    )

    formular.setTriggerKeyWord(triggerKeyWord)

    const handleSubmit = (data: any) => {
        setSubmissionObject({} as ISubmitObject)
        setSubmissionObject(data as ISubmitObject)
    }

    return (
        <FormsContentFrame
            childrenRequired={
                <BooleanConstraint
                    validationOptions={instance?.input?.validationOptions ?? {}}
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
                <FormularForm formular={internalForm} onSubmit={handleSubmit} isloading={false}>
                    <CheckInput fieldName={fieldName} checked={true} />
                </FormularForm>
            }
            childrenSubmissionObjectResult={JSON.stringify(submissionObject, null, 2)}
        />
    )
}

export default ValidationDemoCheckInput
