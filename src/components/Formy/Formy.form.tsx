import React, { useMemo } from 'react'

import { FieldValuesTypes } from '@core/framework/schema/descriptor/field.data.types'
import { IFieldInput } from '../../core/base/field-input/field-input.types'
import { IFormy, IFormyFlags } from '../../core/base/formy-base/formy-base.types'
import { Button } from '../button/button'
import { conventions } from '../context/conventions/conventions'
import { formyContext, IFormyContext, useForm } from './formy.context'
import './formy.css'
import FormyDebug from './formy.debug'
interface IFormyFormProps {
    formy: IFormy
    children: React.ReactNode
    onSubmit?: (data: Record<string, FieldValuesTypes>) => void
}

const FormyForm = ({ formy, children, onSubmit }: IFormyFormProps) => {
    // const [formInstance, setFormInstance] = useState<IFormy | undefined>()

    const formInstance = useMemo(() => {
        return formy
    }, [formy])
    useForm(formInstance)
    // useEffect(() => {
    //     if (formInstance) return
    //     const formy = newFormy(formId, schema, translationBuilder, validationLocalize)
    //     if (!formy) return
    //     setFormInstance(formy)
    // }, [schema, translationBuilder, validationLocalize])

    const handleSubmit = () => {
        formInstance.validateAll()
        const data = formInstance.getData()
        onSubmit?.(data)
    }

    const output: IFormyContext = {
        getFields: () => {
            return formInstance?.fields ?? []
        },
        getField: (fieldName: string): IFieldInput | undefined => {
            return formInstance?.fields?.find((field) => field.name === fieldName)
        },
        formInstance: formInstance,
        getFormFlags: () => {
            return {
                isValid: formInstance?.isValid,
                isDirty: formInstance?.isDirty,
                isBusy: formInstance?.isBusy
            } as IFormyFlags
        }
    }

    return (
        <formyContext.Provider value={output}>
            <div>{formInstance.validationTriggerModeType.join(' ')}</div>
            <div>{formInstance.isDirty ? 'Has changes!' : 'pristine'}</div>
            <form data-form-id={`${formInstance.id}`} className={`formy `}>
                {children}
            </form>
            {onSubmit && (
                <Button
                    id={`${formInstance?.id ?? conventions.IdIsEmpty()}-submit`}
                    title={`Submit`}
                    children={`Submit`}
                    variantProperties={{
                        rounded: true,
                        size: 'md',
                        width: '6em',
                        height: '2em',
                        className: 'ml-0'
                    }}
                    onClickCallback={handleSubmit}
                />
            )}
            <FormyDebug formy={formInstance} />
        </formyContext.Provider>
    )
}

export default FormyForm
