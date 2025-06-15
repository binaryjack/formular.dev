import React, { useEffect, useMemo } from 'react'

import {
    conventions,
    IExtendedInput,
    IFormular,
    IFormularFlags,
    InputDataTypes,
    LoadingStatus,
    MissingPropEnum,
    notification
} from 'formular.dev.lib'
import { Button } from '../button/button'

import { formularContext, IFormularContext } from './formular-form.context'
import './formular-form.css'
import FormularFormDebug from './formular-form.debug'

/**
 * Props for the FormularForm component.
 *
 * @template T - The type of data this form manages and returns upon submission
 */
interface IFormularProps<T extends object> {
    /** The form instance created by FormularManager that contains all form logic and state */
    formular: IFormular<T>

    /** Child components (typically form fields and buttons) to render within the form */
    children: React.ReactNode

    /** Optional loading state to disable form interaction during async operations */
    isloading?: boolean

    /**
     * Callback function invoked when the form is successfully submitted and validated
     * @param data - The validated form data as key-value pairs
     */
    onSubmit?: (data: Record<string, InputDataTypes>) => void
}

/**
 * Main form wrapper component that provides form context and manages form submission.
 *
 * This component serves as the primary container for all FORMULAR forms. It provides:
 * - Form context to child components via React Context
 * - Form submission handling with validation
 * - Loading state management
 * - Error and notification display
 * - Integration with the FORMULAR form engine
 *
 * The component automatically handles form validation, state management, and provides
 * a consistent interface for form operations across the application.
 *
 * @template T - The type of data this form manages
 *
 * @example
 * ```tsx
 * interface UserData {
 *   username: string;
 *   email: string;
 * }
 *
 * const UserForm = () => {
 *   const handleSubmit = (data: Record<string, InputDataTypes>) => {
 *     console.log('Form submitted:', data);
 *     // Handle form submission
 *   };
 *
 *   return (
 *     <FormularForm formular={userFormInstance} onSubmit={handleSubmit}>
 *       <InputText fieldName="username" />
 *       <InputText fieldName="email" />
 *       <button type="submit">Submit</button>
 *     </FormularForm>
 *   );
 * };
 * ```
 *
 * @param props - Component props containing form instance, children, and callbacks
 * @returns JSX element representing the form with context provider
 */
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
        // console.log('handleRefresh: FormularForm updated')
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
            return formularInstance?.fields?.find(
                (field: IExtendedInput) => field.input.name === fieldName
            )
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
            <div>{formularInstance.triggerKeyWordType.join(' ')}</div>
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
                    id={`${formularInstance?.id ?? conventions.IsMissing(MissingPropEnum.ID, FormularForm.name)}-submit`}
                    title={`Submit`}
                    children={`Submit`}
                    loading={isloading || formularInstance.isBusy === LoadingStatus.InProgress}
                    variantProperties={conventions.commands.submit}
                    onClickCallback={handleSubmit}
                />
            )}
            <FormularFormDebug formular={formularInstance} count={count} />
        </formularContext.Provider>
    )
}

export default FormularForm
