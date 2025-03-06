import { IFormy } from '../../core/base/formyBase/formyBase.types'
import { useForm } from './Formy.context'

interface FormyDebugProps {
    formy: IFormy
}

const FormyDebug = ({ formy }: FormyDebugProps) => {
    useForm(formy)
    return (
        <div className={`debug-table`}>
            <div className={`debug-table-row`}>
                <div className={`debug-table-col auto-cols-min`}>ID</div>
                <div className={`debug-table-col auto-cols-min`}> Name</div>
                <div className={`debug-table-col auto-cols-min`}>Value</div>
                <div className={`debug-table-col auto-cols-min`}>Dirty</div>
            </div>
            {formy?.fields?.map((field) => {
                return (
                    <div
                        key={field.id}
                        className={`debug-table-row  ${field.isValid ? 'valid' : 'invalid'}`}
                    >
                        <div className={`debug-table-col auto-cols-min`}>
                            <div className={`text-elipsis`}>{field.id}</div>
                        </div>
                        <div className={`debug-table-col auto-cols-min`}>
                            <div className={`text-elipsis`}> {field.name}</div>
                        </div>
                        <div className={`debug-table-col auto-cols-min`}>
                            <div className={`text-elipsis`}>
                                {field?.get()?.toString() ?? 'NO VALUE'}
                            </div>
                        </div>
                        <div className={`debug-table-col auto-cols-min`}>
                            <div className={`text-elipsis`}>{field.isDirty ? 'TRUE' : 'FALSE'}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default FormyDebug
