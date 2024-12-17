import useFormyContext, { useField } from '../../../../form/components/Formy/Formy.context'
import FieldSet from '../../fieldset/FieldSet'
import ValidationResultComponent from '../../validation/ValidationResult'

interface IRadioInputProps {
    fieldName: string
}

const RadioInput = ({ fieldName }: IRadioInputProps) => {
    const { formInstance } = useFormyContext()
    const { field, flags } = useField(formInstance?.getField(fieldName))

    console.log('RadioInput RENDER')
    return (
        <FieldSet
            inputId={field?.name}
            label={field?.label}
            type={field?.type}
            flags={flags}
            validationChildren={
                <ValidationResultComponent validationResults={field?.validationResults ?? []} />
            }
            onClear={() => field?.clear()}
        >
            <span {...field?.register()} ref={field?.ref()}>
                selected value{field?.get()?.toString()}
                {<div />}
            </span>
            <ul>
                {field?.options?.map((option, index) => {
                    return (
                        <div key={`${field.id}-${option.id}`}>
                            <input
                                data-class="base-radio "
                                type="radio"
                                id={option.id}
                                name={field.name}
                                value={option.value}
                                {...field.registerOption()}
                                ref={field.refOption()}
                            />
                            <label htmlFor={option.id}>{option.text}</label>
                        </div>
                    )
                })}
            </ul>
        </FieldSet>
    )
}
export default RadioInput
