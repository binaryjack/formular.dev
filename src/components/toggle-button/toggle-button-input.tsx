import { useState } from 'react'

import { useField } from '@core/framework/react/fields/hooks/use-field'
import { useFieldDefaultValue } from '@core/framework/react/hooks/use-field-default-value'
import { conventions, MissingPropEnum } from '../context/conventions/conventions'
import FieldSet from '../field-set/field-set'
import useFormularContext from '../formular-form/formular-form.context'
import ValidationResultComponent from '../validation-result/validation-result'
import { ToggleButton } from './toggle-button'

// filepath: e:/Sources/SignalsPatternsReact/src/components/toggleButton/ToggleButtonInput.tsx

interface IToggleButtonInputProps {
    fieldName: string
    children: React.ReactNode
}

const ToggleButtonInput = ({ fieldName, children }: IToggleButtonInputProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))
    const [toggleState, setToggleState] = useState<boolean>(false)

    const handleToggleChange = (id: string, newState: boolean) => {
        setToggleState(newState)
        instance?.input?.valueManager?.setValue(instance, value)
    }

    useFieldDefaultValue(instance, (value) => {
        if (value !== undefined) {
            setToggleState(value === true)
        }
    })

    return (
        <FieldSet
            inputId={
                instance?.input?.name ??
                conventions.IsMissing(MissingPropEnum.ID, ToggleButtonInput.name)
            }
            label={instance?.input?.label}
            type={instance?.input?.type}
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
            onClear={() => {
                instance?.input?.clear()
                setToggleState(false)
            }}
        >
            <ToggleButton
                id={`${instance?.input?.name ?? conventions.IsMissing(MissingPropEnum.ID, ToggleButtonInput.name)}-toggle`}
                toggle={toggleState}
                onToggle={handleToggleChange}
                name={
                    instance?.input?.name ??
                    conventions.IsMissing(MissingPropEnum.NAME, ToggleButtonInput.name)
                }
                children={children}
            />
        </FieldSet>
    )
}

export default ToggleButtonInput
