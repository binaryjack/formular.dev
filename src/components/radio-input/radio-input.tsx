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
    const { instance, flags } = useField(formInstance?.getField(fieldName))

    // useFieldDefaultValue(field)

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
            onClear={() => instance?.field?.clear()}
        >
            <ul className={`radio-group`}>
                {instance?.field?.options?.map((option: any) => {
                    return (
                        <RadioInputOption
                            key={`${instance?.field.id}-${option.id}`}
                            field={instance?.field}
                            option={option}
                        />
                    )
                })}
            </ul>
        </FieldSet>
    )
}
export default RadioInput
