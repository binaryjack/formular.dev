import { useState } from 'react'
import { useFieldDefaultValue } from '../../core/hooks/use-field-default-value'
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
        instance?.field?.setValue(newState)
    }

    useFieldDefaultValue(instance?.field, (value) => {
        if (value !== undefined) {
            setToggleState(value === true)
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
                setToggleState(false)
            }}
        >
            <ToggleButton
                id={`${instance?.field?.name ?? conventions.IdIsEmpty()}-toggle`}
                toggle={toggleState}
                onToggle={handleToggleChange}
                name={instance?.field?.name ?? conventions.NameIsEmpty()}
                children={children}
            />
        </FieldSet>
    )
}

export default ToggleButtonInput
