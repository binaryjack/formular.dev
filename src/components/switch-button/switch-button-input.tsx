import { useField } from '@core/framework/react/fields/hooks/use-field'
import { useFieldDefaultValue } from '@core/framework/react/hooks/use-field-default-value'
import { useState } from 'react'
import { conventions } from '../context/conventions/conventions'
import FieldSet from '../field-set/field-set'
import useFormularContext from '../formular-form/formular-form.context'
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
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))
    const [isOn, setIsOn] = useState<boolean>(false)

    const handleToggleChange = (value: boolean) => {
        setIsOn(value)
        instance?.input?.setValue(value)
    }

    useFieldDefaultValue(instance?.input, (value) => {
        if (value !== undefined) {
            setIsOn(value === true)
        }
    })

    return (
        <FieldSet
            inputId={instance?.input?.name ?? conventions.IdIsEmpty()}
            label={instance?.input?.label}
            type={instance?.input?.type}
            flags={flags}
            onClick={() => {
                instance?.input?.focus()
            }}
            validationChildren={
                <ValidationResultComponent
                    validationResults={instance?.input?.validationResults ?? []}
                />
            }
            onClear={() => {
                instance?.input?.clear()
                setIsOn(false)
            }}
        >
            <SwitchButton
                fieldName={instance?.input?.name ?? conventions.IdIsEmpty()}
                options={options}
                onToggle={handleToggleChange}
                isToggle={isOn}
            />
        </FieldSet>
    )
}

export default SwitchButtonInput
