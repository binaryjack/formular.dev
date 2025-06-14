import InputText from './input-text'

interface IInputTextProps {
    formId: string
    fieldName: string
}

const InputTextDebug = ({ formId, fieldName }: IInputTextProps) => {
    return (
        <div>
            <InputText fieldName={fieldName} />

            {/* <button onClick={() => field?.setFocus()}>focus Field</button>
            <button onClick={() => field?.enable(true)}>enable</button>
            <button onClick={() => field?.enable(false)}>disable</button>
            <button onClick={() => field?.clear()}>clear</button> */}
        </div>
    )
}
export default InputTextDebug
