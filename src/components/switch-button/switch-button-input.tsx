import { useState } from 'react'
import { useFieldDefaultValue } from '../../core/hooks/use-field-default-value'
import { conventions } from '../context/conventions/conventions'
import FieldSet from '../field-set/field-set'
import useFormyContext, { useField } from '../formy/formy.context'
import ValidationResultComponent from '../validation-result/validation-result'
import { SwitchButton } from './switch-button'
import { ISwitchButtonOptions } from './switch-button.types'

// filepath: e:/Sourcecs/SignalsPatternsReact/src/components/switchButton/SwitchButtonInput.tsx

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
