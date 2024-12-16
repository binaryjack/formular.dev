interface ICheckTextProps {
    formId: string
    fieldName: string
}

const CheckTextDebug = ({ formId, fieldName }: ICheckTextProps) => {
    return (
        <div>
            {/* <button onClick={() => field?.setFocus()}>focus Field</button>
            <button onClick={() => field?.enable(true)}>enable</button>
            <button onClick={() => field?.enable(false)}>disable</button>
            <button onClick={() => field?.clear()}>clear</button> */}
        </div>
    )
}
export default CheckTextDebug
