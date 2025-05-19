import { useField } from '@core/framework/react/fields/hooks/use-field'
import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { IRadioBaseInput } from '@core/input-engine/variants/radio-base/radio-base-input.types'
import { conventions } from '../context/conventions/conventions'
import FieldSet from '../field-set/field-set'
import useFormularContext from '../formular-form/formular-form.context'
import ValidationResultComponent from '../validation-result/validation-result'
import './radio-input.css'
import RadioInputOption from './radio-input.option'
interface IRadioInputProps {
    fieldName: string
}

const RadioInput = ({ fieldName }: IRadioInputProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))

    // useFieldDefaultValue(field)

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
                    isFocus={instance?.input.isFocus ?? false}
                />
            }
            onClear={() => instance?.input?.clear()}
        >
            <ul className={`radio-group`} data-selected={instance?.input?.value ?? ''}>
                {instance?.optionBase?.options?.map((option: IOptionItem) => {
                    return (
                        <RadioInputOption
                            key={`${instance?.input.id}-${option.id}`}
                            field={instance as unknown as IRadioBaseInput}
                            option={option}
                        />
                    )
                })}
            </ul>
        </FieldSet>
    )
}
export default RadioInput
