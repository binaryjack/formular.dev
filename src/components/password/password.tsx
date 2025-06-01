import { useEffect, useState } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

import useFormularContext from '@components/formular-form/formular-form.context'
import { useField } from '@core/framework/react/fields/hooks/use-field'
import { useFieldDefaultValue } from '@core/framework/react/hooks/use-field-default-value'
import useKeyBindings from '@core/framework/react/hooks/use-key-bindings'
import React from 'react'
import { Button } from '../button/button'
import { conventions, MissingPropEnum } from '../context/conventions/conventions'
import FieldSet from '../field-set/field-set'
import { Portal } from '../portals/portals'
import ValidationResultComponent from '../validation-result/validation-result'
import './password.css'
// filepath: e:/Sources/SignalsPatternsReact/src/components/password/Password.tsx

interface IPasswordProps {
    fieldName: string
}

const Password = ({ fieldName }: IPasswordProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handleDelete = () => {
        instance?.input?.clear()
    }

    const { handleKeyDown } = useKeyBindings({ onDeleteCallback: handleDelete })

    useFieldDefaultValue(instance)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev)
    }

    const fieldId =
        instance?.input?.name ?? conventions.IsMissing(MissingPropEnum.ID, Password.name)

    useEffect(() => {
        instance?.register()
    }, [instance])

    return (
        <FieldSet
            inputId={fieldId}
            label={instance?.input?.label}
            type="password"
            flags={flags}
            onClick={() => {
                instance?.input?.focus()
            }}
            validationChildren={
                <ValidationResultComponent
                    validationResults={instance?.input?.validationResults ?? []}
                    isFocus={instance?.input.isFocus ?? false}
                />
            }
            onClear={() => instance?.input?.clear()}
        >
            <div className="relative flex items-center w-full">
                <input
                    tabIndex={0}
                    data-class="base-input "
                    {...instance?.register()}
                    ref={(r) => instance?.ref(r)}
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
                            id={`${fieldId}-toggle-password`}
                            title={'toggle password visibility'}
                            variantProperties={conventions.commands.basic}
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

export default React.memo(Password)
