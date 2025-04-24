import { useRef, useState } from 'react'
import { useFieldDefaultValue } from '../../core/hooks/use-field-default-value'
import { conventions } from '../context/conventions/conventions'
import FieldSet from '../field-set/field-set'
import useFormyContext, { useField } from '../formy/formy.context'

import ValidationResultComponent from '../validation-result/validation-result'
import { deserializeEngineState } from './core/io/deserialize-engine-state'
import { serializeEngineState } from './core/io/serialize-engine-state '
import { IStateData, newStateData } from './core/rti-engine.types'
import { RteInput } from './rte-input'

interface IRteInputFieldProps {
    fieldName: string
}

const RteInputField = ({ fieldName }: IRteInputFieldProps) => {
    const { formInstance } = useFormyContext()
    const { field, flags } = useField(formInstance?.getField(fieldName))
    const editorRef = useRef<HTMLDivElement>(null)
    const [editorId] = useState(`rte-${fieldName}-${Math.random().toString(36).substring(2, 9)}`)

    // Store the latest state to sync with field
    const [lastState, setLastState] = useState<IStateData>({
        data: null,
        ts: ''
    })
    const [initialState, setInitialState] = useState<IStateData>({
        data: null,
        ts: ''
    })

    // When editor state changes, serialize and update field value
    const handleEditorStateChange = (state: IStateData) => {
        // setLastState(state)

        if (field) {
            // Serialize the state to a safe format and store in field
            const serializedData = serializeEngineState(state?.data)

            if (lastState.data === serializedData) return
            field.setValue(serializedData)
            setLastState(newStateData(serializedData))
        }
    }

    useFieldDefaultValue(field, (value) => {
        if (value && typeof value === 'string') {
            try {
                // Deserialize from field value
                const editorState = deserializeEngineState(value)
                // Update editor (would need implementation in RteInput)
                // This would require adding a "setState" prop to RteInput
                setInitialState(newStateData(editorState))
            } catch (e) {
                console.error('Failed to deserialize RTE content', e)
            }
        }
    })

    return (
        <FieldSet
            inputId={field?.name ?? conventions.IdIsEmpty()}
            label={field?.label}
            type="richtext"
            flags={flags}
            onClick={() => {
                // Focus the editor via ref
                editorRef.current?.focus()
            }}
            validationChildren={
                <ValidationResultComponent validationResults={field?.validationResults ?? []} />
            }
            onClear={() => {
                field?.clear()
                setTimeout(() => setInitialState(newStateData(null)), 1)
            }}
        >
            <div className="w-full">
                <RteInput
                    id={editorId}
                    onStateChange={handleEditorStateChange}
                    initialState={initialState}
                    externalEditorRef={editorRef}
                />
            </div>
        </FieldSet>
    )
}

export default RteInputField
