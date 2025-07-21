import { useField } from '@adapters/react/fields/hooks/use-field'
import { useService } from '@adapters/react/services/use-service'
import FormularForm from '@components/formular-form/formular-form'
import { RangeSliderSF } from '@components/range-slider/range-slider.sf'
import {
    fileDescriptorMock,
    GenericValidationBuilder,
    IFormular,
    IFormularManager,
    IOptionItem,
    IValidationOptions,
    maxValidationMock,
    minValidationMock,
    requiredDataValidationMock,
    SFormularManager
} from 'formular.dev.lib'
import { useEffect, useState } from 'react'
import { BooleanConstraint } from './components/boolean-constraint'
import { FormsContentFrame } from './components/form-content-frame'
import { TriggerMode } from './components/trigger-mode'
import { useDemoSettings } from './hooks/useDemoSettings'

const fieldName = 'rangeValue'

interface ISubmitObject {
    rangeValue: number
}

const validationOptionsMock: IValidationOptions = new GenericValidationBuilder()
    .setConstraints<any>([
        requiredDataValidationMock(fieldName, true),
        minValidationMock(fieldName, 0),
        maxValidationMock(fieldName, 100)
    ])
    .build()

const optionsMocks: IOptionItem[] = []

const ValidationDemoRangeSlider = () => {
    const { getService } = useService()
    const formularManager = getService<IFormularManager>(SFormularManager)

    const descriptor = fileDescriptorMock(
        fieldName,
        'Range Slider',
        'range',
        validationOptionsMock,
        optionsMocks
    )

    const formular = formularManager?.createFromDescriptors('validation-demo-range-slider-form', [
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
                        childrenInput={<RangeSliderSF fieldName={fieldName} />}
                        childrenSubmissionObjectResult={JSON.stringify(submissionObject, null, 2)}
                    />
                </FormularForm>
            )}
        </>
    )
}

export default ValidationDemoRangeSlider
