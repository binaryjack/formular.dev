import { IFormy } from '../../core/base/formy-base/formy-base.types'
import useFormyContext, { useForm } from './formy.context'

interface FormyDebugProps {
    formy: IFormy
}

const FormyDebug = ({ formy }: FormyDebugProps) => {
    useForm(formy)
    const { getFormFlags } = useFormyContext()
    return (
        <div className={`form-debug  flex flex-col p-1 w-full h-full`}>
            <div className={`debug-table flex flex-col w-full`}>
                <div className={`debug-table-row `}>
                    <div className={`debug-table-col auto-cols-min`}>Name</div>
                    <div className={`debug-table-col auto-cols-min`}>Dirty</div>
                    <div className={`debug-table-col auto-cols-min`}>Valid</div>
                    <div className={`debug-table-col auto-cols-min`}>Errors</div>
                </div>

                <div className={`debug-table-row`}>
                    <div className={`debug-table-col auto-cols-min`}>
                        <div className={`text-elipsis`}>{formy.name}</div>
                    </div>
                    <div className={`debug-table-col auto-cols-min`}>
                        <div className={`text-elipsis`}>
                            {getFormFlags().isDirty ? 'Yes' : 'No'}
                        </div>
                    </div>
                    <div className={`debug-table-col auto-cols-min`}>
                        <div className={`text-elipsis`}>
                            {getFormFlags().isValid ? 'Yes' : 'No'}
                        </div>
                    </div>
                    <div className={`debug-table-col auto-cols-min`}>
                        <div className={`text-elipsis`}>
                            {/* {getFormFlags()?.errors ? 'Yes' : 'No'} */}
                        </div>
                    </div>
                </div>
            </div>
            <div className={`debug-table flex flex-col w-full`}>
                <div className={`debug-table-row `}>
                    <div className={`debug-table-col auto-cols-min`}>ID</div>
                    <div className={`debug-table-col auto-cols-min`}>Name</div>
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
                                    {field?.getValue() === 'object'
                                        ? JSON.stringify(field.getValue())
                                        : String(field?.toString() ?? 'NO VALUE')}
                                </div>
                            </div>
                            <div className={`debug-table-col auto-cols-min`}>
                                <div className={`text-elipsis`}>
                                    {field.isDirty ? 'TRUE' : 'FALSE'}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default FormyDebug
