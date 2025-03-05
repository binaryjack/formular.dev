import { useRef } from 'react'

import useFormyContext, { useField } from '../../core/form/components/Formy/Formy.context'
import FieldSet from '../fieldset/FieldSet'
import ValidationResultComponent from '../validationResult/ValidationResult'
import RadioInputOption from './RadioInput.option'

interface IRadioInputProps {
    fieldName: string
}

const RadioInput = ({ fieldName }: IRadioInputProps) => {
    const { formInstance } = useFormyContext()
    const { field, flags } = useField(formInstance?.getField(fieldName))
    const optionRefs = useRef<HTMLInputElement[]>([])
    return (
        <FieldSet
            inputId={field?.name}
            label={field?.label}
            type={field?.type}
            flags={flags}
            onClick={() => {
                field?.focus()
            }}
            validationChildren={
                <ValidationResultComponent validationResults={field?.validationResults ?? []} />
            }
            onClear={() => field?.clear()}
        >
            <ul className={`radio-group`}>
                {field?.options?.map((option) => {
                    return (
                        <RadioInputOption
                            key={`${field.id}-${option.id}`}
                            field={field}
                            option={option}
                        />
                    )
                })}
            </ul>
        </FieldSet>
    )
}
export default RadioInput
