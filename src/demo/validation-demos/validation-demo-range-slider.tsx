import FormularForm from '@components/formular-form/formular-form'
import { RangeSliderSF } from '@components/range-slider/range-slider.sf'
import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { useField } from '@core/framework/react/fields/hooks/use-field'
import { newDependencyConfiguration } from '@core/input-engine/core/configuration/dependency-configuration'
import {
    defaultInitializationDependencies,
    defaultInitializationParameters
} from '@core/input-engine/generator/builder/settings/input-dependency-configuration.ts'
import { FormularManager } from '@core/managers/formular-manager/formular-manager'
import { IValidationOptions } from '@core/managers/validation-manager/validation-manager.types'
import { lifeCylceInstances } from '@demo/common/common-instances'
import { fileDescriptorMock } from '@tests/mocks/file-descriptor-mock'
import { maxValidationMock } from '@tests/mocks/max-validation-mock'
import { minValidationMock } from '@tests/mocks/min-validation-mock'
import { requiredDataValidationMock } from '@tests/mocks/required-data-validation-mock'
import { useEffect, useState } from 'react'
import { FormsContentFrame } from './components/form-content-frame'
import { Required } from './components/required'
import { TriggerMode } from './components/trigger-mode'
import { useDemoSettings } from './hooks/useDemoSettings'

const fieldName = 'rangeValue'

interface ISubmitObject {
    rangeValue: number
}

const formularManager = new FormularManager(
    lifeCylceInstances.notificationManager,
    lifeCylceInstances.autoTracker
)

const validationOptionsMock: IValidationOptions = {
    requiredData: requiredDataValidationMock(fieldName, true),
    min: minValidationMock(fieldName, 0),
    max: maxValidationMock(fieldName, 100)
}

const config = newDependencyConfiguration(
    fileDescriptorMock(fieldName, 'Range Slider', 'range', validationOptionsMock),
    defaultInitializationParameters,
    defaultInitializationDependencies
)

const ValidationDemoRangeSlider = () => {
    const formular = formularManager.createfromConfiguration('validation-demo-range-slider-form', [
        config
    ]) as IFormular<ISubmitObject>

    const { instance } = useField(formular.fields[0])
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
        validationOptionsMock,
        'onFocus',
        'onBlur',
        'onChange',
        'onSubmit',
        'validateOnFormFirstSubmit'
    )

    useEffect(() => {
        formular.setValidationTriggerMode(validationTriggerMode)
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
                        childrenInput={<RangeSliderSF fieldName={fieldName} />}
                        childrenSubmissionObjectResult={JSON.stringify(submissionObject, null, 2)}
                    />
                </FormularForm>
            )}
        </>
    )
}

export default ValidationDemoRangeSlider
