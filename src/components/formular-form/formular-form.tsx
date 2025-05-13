import React, { useMemo } from 'react'

import { IFormular, IFormularFlags } from '@core/formular-base/formular-base.types'
import { InputDataTypes } from '@core/framework/common/common.input.data.types'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { Button } from '../button/button'
import { conventions } from '../context/conventions/conventions'
import { formularContext, IFormularContext } from './formular-form.context'
import './formular-form.css'
import FormularFormDebug from './formular-form.debug'
interface IFormularProps {
    formular: IFormular
    children: React.ReactNode
    onSubmit?: (data: Record<string, InputDataTypes>) => void
}

const FormularForm = ({ formular, children, onSubmit }: IFormularProps) => {
    // const [formInstance, setFormInstance] = useState<IFormy | undefined>()

    const formularInstance = useMemo(() => {
        return formular
    }, [formular])
    // useForm(formInstance)
    // useEffect(() => {
    //     if (formInstance) return
    //     const formy = newFormy(formId, schema, translationBuilder, validationLocalize)
    //     if (!formy) return
    //     setFormInstance(formy)
    // }, [schema, translationBuilder, validationLocalize])

    const handleSubmit = () => {
        formularInstance.validateAll()
        const data = formularInstance.getData()
        onSubmit?.(data)
    }

    const output: IFormularContext = {
        getFields: () => {
            return formularInstance?.fields ?? []
        },
        getField: (fieldName: string): IExtendedInput | undefined => {
            return formularInstance?.fields?.find((field) => field.input.name === fieldName)
        },
        formInstance: formularInstance,
        getFormFlags: () => {
            return {
                isValid: formularInstance?.isValid,
                isDirty: formularInstance?.isDirty,
                isBusy: formularInstance?.isBusy
            } as IFormularFlags
        }
    }

    return (
        <formularContext.Provider value={output}>
            <div>{formularInstance.validationTriggerModeType.join(' ')}</div>
            <div>{formularInstance.isDirty ? 'Has changes!' : 'pristine'}</div>
            <form data-form-id={`${formularInstance.id}`} className={`formy `}>
                {children}
            </form>
            {onSubmit && (
                <Button
                    id={`${formularInstance?.id ?? conventions.IdIsEmpty()}-submit`}
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
            <FormularFormDebug formular={formularInstance} />
        </formularContext.Provider>
    )
}

export default FormularForm
