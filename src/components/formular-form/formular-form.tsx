import React, { useEffect, useMemo } from 'react'

import { IFormular, IFormularFlags } from '@core/formular-engine/formular-base/formular-base.types'
import { InputDataTypes } from '@core/framework/common/common.input.data.types'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { notification } from '@core/managers/notification-manager/utils/new-notification-visitor'
import { LoadingStatus } from '@core/status'
import { Button } from '../button/button'
import { conventions } from '../context/conventions/conventions'
import { formularContext, IFormularContext } from './formular-form.context'
import './formular-form.css'
import FormularFormDebug from './formular-form.debug'
interface IFormularProps<T extends object> {
    formular: IFormular<T>
    children: React.ReactNode
    isloading?: boolean
    onSubmit?: (data: Record<string, InputDataTypes>) => void
}

const FormularForm = <T extends object>({
    formular,
    children,
    isloading,
    onSubmit
}: IFormularProps<T>) => {
    const [messages, setMessages] = React.useState<string[]>([])
    const [count, setCount] = React.useState(0)

    const formularInstance = useMemo(() => {
        return formular
    }, [formular])

    const handleRefresh = () => {
        console.log('handleRefresh: FormularForm updated')
        setMessages([...messages])
        setCount((prev) => prev + 1)
    }

    useEffect(() => {
        if (!formular?.notificationManager) return
        /** Bind the function handleRefresh to followng field events*/
        formular?.notificationManager?.accept(
            notification(
                FormularForm,
                handleRefresh,
                'onUiUpdate',
                `FormularForm.onUiUpdate'`,
                'onUiUpdate'
            )
        )

        return () => {
            formular.notificationManager?.dismiss(
                notification(
                    FormularForm,
                    handleRefresh,
                    'onUiUpdate',
                    `FormularForm.onUiUpdate'`,
                    'onUiUpdate'
                )
            )
        }
    }, [formular])

    const handleSubmit = async <T extends object>() => {
        try {
            const result = await formularInstance.submit()

            if (result !== null && typeof result === 'object' && JSON.stringify(result) !== `{}`) {
                onSubmit?.(result as Record<string, InputDataTypes>)
                setMessages([])
            } else {
                const errorMessage = 'Form submission returned null or empty object'
                setMessages((o) => [...o, errorMessage])
            }
        } catch (error: any) {
            const errorMessage = error?.message ?? error
            setMessages((o) => [...o, errorMessage])
        }
    }

    const output: IFormularContext<T> = {
        getFields: () => {
            return formularInstance?.fields ?? []
        },
        getField: (fieldName: string): IExtendedInput | undefined => {
            return formularInstance?.fields?.find((field) => field.input.name === fieldName)
        },
        formInstance: formularInstance,
        getFormFlags: () => {
            return {
                ...formularInstance.getFormFlags()
            } as IFormularFlags
        },
        message: messages
    }

    return (
        <formularContext.Provider value={output}>
            <div>{formularInstance.validationTriggerModeType.join(' ')}</div>
            <div>{formularInstance.isDirty ? 'Has changes!' : 'pristine'}</div>
            <form data-form-id={`${formularInstance.id}`} className={`formular `}>
                {children}
            </form>
            <div className={`formular-messages`}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`formular-message ${
                            message.includes('error') ? 'error' : 'info'
                        }`}
                    >
                        {message}
                    </div>
                ))}
            </div>
            {onSubmit && (
                <Button
                    id={`${formularInstance?.id ?? conventions.IdIsEmpty()}-submit`}
                    title={`Submit`}
                    children={`Submit`}
                    loading={isloading || formularInstance.isBusy === LoadingStatus.InProgress}
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
            <FormularFormDebug formular={formularInstance} count={count} />
        </formularContext.Provider>
    )
}

export default FormularForm
