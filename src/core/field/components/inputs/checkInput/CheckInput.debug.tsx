interface ICheckInputProps {
    formId: string
    fieldName: string
}

const CheckInputDebug = ({ formId, fieldName }: ICheckInputProps) => {
    return (
        <div>
            {/* <button onClick={() => field?.setFocus()}>focus Field</button>
            <button onClick={() => field?.enable(true)}>enable</button>
            <button onClick={() => field?.enable(false)}>disable</button>
            <button onClick={() => field?.clear()}>clear</button> */}
        </div>
    )
}
export default CheckInputDebug
