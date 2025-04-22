import { useState } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { useFieldDefaultValue } from '../../core/hooks/useFieldDefaultValue'
import useKeyBindings from '../../core/hooks/useKeyBindings'
import { Button } from '../button/Button'
import { conventions } from '../context/conventions/conventions'
import FieldSet from '../fieldset/FieldSet'
import useFormyContext, { useField } from '../formy/Formy.context'
import { Portal } from '../portals/Portal'
import ValidationResultComponent from '../validationResult/ValidationResult'
import './password.css'
// filepath: e:/Sources/SignalsPatternsReact/src/components/password/Password.tsx

interface IPasswordProps {
    fieldName: string
}

const Password = ({ fieldName }: IPasswordProps) => {
    const { formInstance } = useFormyContext()
    const { field, flags } = useField(formInstance?.getField(fieldName))
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handleDelete = () => {
        field?.clear()
    }

    const { handleKeyDown } = useKeyBindings({ onDeleteCallback: handleDelete })

    useFieldDefaultValue(field)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev)
    }

    const fieldId = field?.name ?? conventions.IdIsEmpty()

    return (
        <FieldSet
            inputId={fieldId}
            label={field?.label}
            type="password"
            flags={flags}
            onClick={() => {
                field?.focus()
            }}
            validationChildren={
                <ValidationResultComponent validationResults={field?.validationResults ?? []} />
            }
            onClear={() => field?.clear()}
        >
            <div className="relative flex items-center w-full">
                <input
                    tabIndex={0}
                    data-class="base-input "
                    {...field?.register()}
                    ref={(r) => field?.ref(r)}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    type={isPasswordVisible ? 'text' : 'password'}
                    className="password-input"
                />

                <Portal
                    id={fieldId}
                    slotName={'toggle-password'}
                    children={
                        <Button
                            id={`${fieldId}-clear-field-btn`}
                            title={'toggle password visibility'}
                            variantProperties={{
                                rounded: true,
                                size: 'md',
                                width: '2em',
                                height: '2em',
                                className: 'ml-1'
                            }}
                            onClickCallback={togglePasswordVisibility}
                            aria-label="Toggle password visibility"
                        >
                            {isPasswordVisible ? <MdVisibilityOff /> : <MdVisibility />}
                        </Button>
                    }
                />
            </div>
        </FieldSet>
    )
}

export default Password
