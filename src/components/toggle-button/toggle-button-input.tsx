import { useState } from 'react'

import { useFieldDefaultValue } from '@core/framework/react/hooks/use-field-default-value'
import { conventions } from '../context/conventions/conventions'
import FieldSet from '../field-set/field-set'
import useFormyContext, { useField } from '../formy/formy.context'
import ValidationResultComponent from '../validation-result/validation-result'
import { ToggleButton } from './toggle-button'

// filepath: e:/Sources/SignalsPatternsReact/src/components/toggleButton/ToggleButtonInput.tsx

interface IToggleButtonInputProps {
    fieldName: string
    children: React.ReactNode
}

const ToggleButtonInput = ({ fieldName, children }: IToggleButtonInputProps) => {
    const { formInstance } = useFormyContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))
    const [toggleState, setToggleState] = useState<boolean>(false)

    const handleToggleChange = (id: string, newState: boolean) => {
        setToggleState(newState)
        instance?.input?.setValue(newState)
    }

    useFieldDefaultValue(instance?.input, (value) => {
        if (value !== undefined) {
            setToggleState(value === true)
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
                setToggleState(false)
            }}
        >
            <ToggleButton
                id={`${instance?.input?.name ?? conventions.IdIsEmpty()}-toggle`}
                toggle={toggleState}
                onToggle={handleToggleChange}
                name={instance?.input?.name ?? conventions.NameIsEmpty()}
                children={children}
            />
        </FieldSet>
    )
}

export default ToggleButtonInput
