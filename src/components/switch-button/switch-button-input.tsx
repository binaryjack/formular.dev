import { useFieldDefaultValue } from '@core/framework/react/hooks/use-field-default-value'
import { useState } from 'react'
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
    const { instance, flags } = useField(formInstance?.getField(fieldName))
    const [isOn, setIsOn] = useState<boolean>(false)

    const handleToggleChange = (value: boolean) => {
        setIsOn(value)
        instance?.field?.setValue(value)
    }

    useFieldDefaultValue(instance?.field, (value) => {
        if (value !== undefined) {
            setIsOn(value === true)
        }
    })

    return (
        <FieldSet
            inputId={instance?.field?.name ?? conventions.IdIsEmpty()}
            label={instance?.field?.label}
            type={instance?.field?.type}
            flags={flags}
            onClick={() => {
                instance?.field?.focus()
            }}
            validationChildren={
                <ValidationResultComponent
                    validationResults={instance?.field?.validationResults ?? []}
                />
            }
            onClear={() => {
                instance?.field?.clear()
                setIsOn(false)
            }}
        >
            <SwitchButton
                fieldName={instance?.field?.name ?? conventions.IdIsEmpty()}
                options={options}
                onToggle={handleToggleChange}
                isToggle={isOn}
            />
        </FieldSet>
    )
}

export default SwitchButtonInput
