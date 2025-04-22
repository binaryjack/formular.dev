import { useState } from 'react'
import { useFieldDefaultValue } from '../../core/hooks/useFieldDefaultValue'
import { conventions } from '../context/conventions/conventions'
import FieldSet from '../fieldset/FieldSet'
import useFormyContext, { useField } from '../formy/Formy.context'
import ValidationResultComponent from '../validationResult/ValidationResult'
import { SwitchButton } from './SwitchButton'
import { ISwitchButtonOptions } from './SwitchButton.types'

// filepath: e:/Sources/SignalsPatternsReact/src/components/switchButton/SwitchButtonInput.tsx

interface ISwitchButtonInputProps {
    fieldName: string
    options: ISwitchButtonOptions
}

const SwitchButtonInput = ({
    fieldName,
    options = {
        orientation: 'horizontal',
        size: 'md',
        variant: 'primary'
    }
}: ISwitchButtonInputProps) => {
    const { formInstance } = useFormyContext()
    const { field, flags } = useField(formInstance?.getField(fieldName))
    const [isOn, setIsOn] = useState<boolean>(false)

    const handleToggleChange = (value: boolean) => {
        setIsOn(value)
        field?.setValue(value)
    }

    useFieldDefaultValue(field, (value) => {
        if (value !== undefined) {
            setIsOn(value === true)
        }
    })

    return (
        <FieldSet
            inputId={field?.name ?? conventions.IdIsEmpty()}
            label={field?.label}
            type={field?.type}
            flags={flags}
            onClick={() => {
                field?.focus()
            }}
            validationChildren={
                <ValidationResultComponent validationResults={field?.validationResults ?? []} />
            }
            onClear={() => {
                field?.clear()
                setIsOn(false)
            }}
        >
            <SwitchButton
                fieldName={field?.name ?? conventions.IdIsEmpty()}
                options={options}
                onToggle={handleToggleChange}
                isToggle={isOn}
            />
        </FieldSet>
    )
}

export default SwitchButtonInput
