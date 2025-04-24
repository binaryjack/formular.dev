import { conventions } from '../context/conventions/conventions'
import FieldSet from '../field-set/field-set'
import useFormyContext, { useField } from '../formy/formy.context'
import ValidationResultComponent from '../validation-result/validation-result'
import './radio-input.css'
import RadioInputOption from './radio-input.option'
interface IRadioInputProps {
    fieldName: string
}

const RadioInput = ({ fieldName }: IRadioInputProps) => {
    const { formInstance } = useFormyContext()
    const { field, flags } = useField(formInstance?.getField(fieldName))

    // useFieldDefaultValue(field)

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
            onClear={() => field?.clear()}
        >
            <ul className={`radio-group`}>
                {field?.options?.map((option: any) => {
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
