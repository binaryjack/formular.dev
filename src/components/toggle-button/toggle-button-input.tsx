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
    const { field, flags } = useField(formInstance?.getField(fieldName))
    const [toggleState, setToggleState] = useState<boolean>(false)

    const handleToggleChange = (id: string, newState: boolean) => {
        setToggleState(newState)
        field?.setValue(newState)
    }

    useFieldDefaultValue(field, (value) => {
        if (value !== undefined) {
            setToggleState(value === true)
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
