import { IFormy } from '../../formyBase/formyBase.types'
import { useForm } from './Formy.context'

interface FormyDebugProps {
    formy: IFormy
}

const FormyDebug = ({ formy }: FormyDebugProps) => {
    useForm(formy)
    return (
        <div className={`debug-table`}>
            {formy?.fields?.map((field) => {
                return (
                    <div
                        key={field.id}
                        className={`debug-table-row ${field.isValid ? 'valid' : 'invalid'}`}
                    >
                        <div className={`debug-table-col`}>Field: {field.id}</div>
                        <div className={`debug-table-col`}>Field Name: {field.name}</div>
                        <div className={`debug-table-col`}>
                            Field Value: {field?.get()?.toString() ?? 'NO VALUE'}
                        </div>
                        <div className={`debug-table-col`}>Field Dirty: {field.isDirty}</div>
                    </div>
                )
            })}
        </div>
    )
}
export default FormyDebug
