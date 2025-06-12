import { useField } from '@adapters/react/fields/hooks/use-field'
import DelayInput from '@components/delay-input/delay-input'
import FormularForm from '@components/formular-form/formular-form'
import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'

import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { GenericValidationBuilder } from '@core/managers/validation-manager/generic-validation-builder/generic-validation-builder'
import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import { fileDescriptorMock } from '@tests/mocks/file-descriptor-mock'
import { maxLengthValidationMock } from '@tests/mocks/max-length-validation-mock'
import { minLengthValidationMock } from '@tests/mocks/min-length-validation-mock'
import { requiredDataValidationMock } from '@tests/mocks/required-data-validation-mock'
import { useEffect, useState } from 'react'

import { useService } from '@adapters/react/services/use-service'
import {
    IFormularManager,
    SFormularManager
} from '@core/managers/formular-manager/formular-manager.types'
import { BooleanConstraint } from './components/boolean-constraint'
import { FormsContentFrame } from './components/form-content-frame'
import { TriggerMode } from './components/trigger-mode'
import { useDemoSettings } from './hooks/useDemoSettings'

const fieldName = 'delayValue'

interface ISubmitObject {
    delayValue: string
}

const validationOptionsMock: IValidationOptions = new GenericValidationBuilder()
    .setConstraints<any>([
        requiredDataValidationMock(fieldName, true),
        minLengthValidationMock(fieldName, 3),
        maxLengthValidationMock(fieldName, 50)
    ])
    .build()

const optionsMocks: IOptionItem[] = []

const ValidationDemoDelayInput = () => {
    const { getService } = useService()
    const formularManager = getService<IFormularManager>(SFormularManager)

    const descriptor = fileDescriptorMock(
        fieldName,
        fieldName,
        'text',
        validationOptionsMock,
        optionsMocks
    )

    const formular = formularManager?.createFromDescriptors('validation-demo-delay-input-form', [
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
