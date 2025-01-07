import useFormyContext, { useField } from '../../../../form/components/Formy/Formy.context'
import FieldSet from '../../fieldset/FieldSet'
import ValidationResultComponent from '../../validation/ValidationResult'

interface IInputTextProps {
    fieldName: string
}

const InputText = ({ fieldName }: IInputTextProps) => {
    const { formInstance } = useFormyContext()
    const { field, flags } = useField(formInstance?.getField(fieldName))

    console.log('InputText RENDER')
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
            <input data-class="base-input" {...field?.register()} ref={field?.ref()} />
        </FieldSet>
    )
}
export default InputText
