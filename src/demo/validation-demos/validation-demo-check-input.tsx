import CheckInput from '@components/check-Input/check-Input'
import FormularForm from '@components/formular-form/formular-form'
import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { useField } from '@core/framework/react/fields/hooks/use-field'

import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import { fileDescriptorMock } from '@tests/mocks/file-descriptor-mock'
import { useEffect, useState } from 'react'

import { useService } from '@core/framework/react/services/use-service'
import {
    IFormularManager,
    SFormularManager
} from '@core/managers/formular-manager/formular-manager.types'
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
        'onClick',
        'onFocus',
        'onBlur',
        'onClear',
        'onSubmit',
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
                        childrenInput={<CheckInput fieldName={fieldName} />}
                        childrenSubmissionObjectResult={JSON.stringify(submissionObject, null, 2)}
                    />
                </FormularForm>
            )}
        </>
    )
}

export default ValidationDemoCheckInput
