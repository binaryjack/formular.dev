import { useField } from '@adapters/react/fields/hooks/use-field'
import FormularForm from '@components/formular-form/formular-form'
import InputText from '@components/input-text/input-text'

import { useService } from '@adapters/react/services/use-service'

import {
    defaultConfiguration,
    fileDescriptorMock,
    GenericValidationBuilder,
    IConfigurationManager,
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
import { NumericConstraint } from './components/numeric-constraint'
import { RegExpConstraint } from './components/regexp-constraint'
import { TriggerMode } from './components/trigger-mode'
import { useDemoSettings } from './hooks/useDemoSettings'

const defaultFieldName = 'sandboxField'

export interface ISubmitObject {
    sandboxField: string
}

const validationOptionsMock: IValidationOptions = new GenericValidationBuilder()
    .setConstraints<any>([
        requiredDataValidationMock(defaultFieldName, true),
        minLengthValidationMock(defaultFieldName, 3),
        maxLengthValidationMock(defaultFieldName, 50)
    ])
    .build()

const optionsMocks: IOptionItem[] = []

const ValidationDemoTextInput = () => {
    const { getService } = useService()

    const configurationManager = getService<IConfigurationManager>(SFormularManager)
    configurationManager?.setConfiguration('development', defaultConfiguration)
    configurationManager?.useConfiguration('development')

    const formularManager = getService<IFormularManager>(SFormularManager)

    const descriptor = fileDescriptorMock(
        defaultFieldName,
        defaultFieldName,
        'text',
        validationOptionsMock,
        optionsMocks
    )

    const formular = formularManager?.createFromDescriptors('validation-demo-text-input-form', [
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
                        childrenMin={
                            <NumericConstraint
                                validationOptions={validationOptions}
                                handleValidationOptionChange={handleValidationOptionChange}
                                fieldName={defaultFieldName}
                                type={'min'}
                                errorMessage={'This field must be greater than or equal to {{min}}'}
                                guideMessage={
                                    'This field must be greater than or equal to {{min}}.'
                                }
                            />
                        }
                        childrenMax={
                            <NumericConstraint
                                validationOptions={validationOptions}
                                handleValidationOptionChange={handleValidationOptionChange}
                                fieldName={defaultFieldName}
                                type={'max'}
                                errorMessage={'This field must be less than or equal to {{max}}'}
                                guideMessage={'This field must be less than or equal to {{max}}.'}
                            />
                        }
                        childrenMinLength={
                            <NumericConstraint
                                validationOptions={validationOptions}
                                handleValidationOptionChange={handleValidationOptionChange}
                                fieldName={defaultFieldName}
                                type={'minLength'}
                                errorMessage={
                                    'The caracter length must be greater than or equal to {{min}}'
                                }
                                guideMessage={
                                    'The caracter length must be greater than or equal to {{min}}.'
                                }
                            />
                        }
                        childrenMaxLength={
                            <NumericConstraint
                                validationOptions={validationOptions}
                                handleValidationOptionChange={handleValidationOptionChange}
                                fieldName={defaultFieldName}
                                type={'maxLength'}
                                errorMessage={
                                    'The caracter length must be less than or equal to {{max}}'
                                }
                                guideMessage={
                                    'The caracter length must be less than or equal to {{max}}.'
                                }
                            />
                        }
                        childrenPattern={
                            <RegExpConstraint
                                validationOptions={validationOptions}
                                handleValidationOptionChange={handleValidationOptionChange}
                                fieldName={defaultFieldName}
                                type={'pattern'}
                                errorMessage={'This field must match the pattern {{pattern}}'}
                                guideMessage={'This field must match the pattern {{pattern}}.'}
                            />
                        }
                        childrenRequired={
                            <BooleanConstraint
                                validationOptions={validationOptions}
                                handleValidationOptionChange={handleValidationOptionChange}
                                fieldName={defaultFieldName}
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
                        childrenInput={<InputText fieldName={defaultFieldName} />}
                        childrenSubmissionObjectResult={JSON.stringify(submissionObject, null, 2)}
                    />
                </FormularForm>
            )}
        </>
    )
}

export default ValidationDemoTextInput
