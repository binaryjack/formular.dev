import { useEffect, useState } from 'react'
import { conventions } from '../context/conventions/conventions'
import FieldSet from '../fieldset/FieldSet'
import useFormyContext, { useField } from '../formy/Formy.context'
import ValidationResultComponent from '../validationResult/ValidationResult'
import { ToggleButton } from './ToggleButton'

// filepath: e:/Sources/SignalsPatternsReact/src/components/toggleButton/ToggleButtonInput.tsx

interface IToggleButtonInputProps {
    fieldName: string
    children: React.ReactNode
}

const ToggleButtonInput = ({ fieldName, children }: IToggleButtonInputProps) => {
    const { formInstance } = useFormyContext()
    const { field, flags } = useField(formInstance?.getField(fieldName))
    const [toggleState, setToggleState] = useState<boolean>(false)

    const handleToggleChange = (id: string, newState: boolean) => {
        setToggleState(newState)
        field?.setValue(newState)
    }

    useEffect(() => {
        if (field?.defaultValue !== undefined) {
            setToggleState(field.defaultValue === true)
        }
    }, [field?.defaultValue])

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
                setToggleState(false)
            }}
        >
            <ToggleButton
                id={`${field?.name ?? conventions.IdIsEmpty()}-toggle`}
                toggle={toggleState}
                onToggle={handleToggleChange}
                name={field?.name ?? conventions.NameIsEmpty()}
                children={children}
            />
        </FieldSet>
    )
}

export default ToggleButtonInput
