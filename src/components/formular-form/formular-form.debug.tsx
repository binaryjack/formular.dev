import { IFormular } from '@core/formular-base/formular-base.types'
import useFormularContext from './formular-form.context'

interface FormyDebugProps {
    formular: IFormular
}

const FormularFormDebug = ({ formular }: FormyDebugProps) => {
    // useForm(formy)
    const { getFormFlags } = useFormularContext()
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
                        <div className={`text-elipsis`}>{formular.name}</div>
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
                {formular?.fields?.map((field) => {
                    return (
                        <div
                            key={field?.input.id}
                            className={`debug-table-row  ${field?.input.isValid ? 'valid' : 'invalid'}`}
                        >
                            <div className={`debug-table-col auto-cols-min`}>
                                <div className={`text-elipsis`}>{field?.input.id}</div>
                            </div>
                            <div className={`debug-table-col auto-cols-min`}>
                                <div className={`text-elipsis`}> {field?.input.name}</div>
                            </div>
                            <div className={`debug-table-col auto-cols-min`}>
                                <div className={`text-elipsis`}>
                                    {field?.input.valueManager.getValue(field) === 'object'
                                        ? JSON.stringify(field?.input.valueManager.getValue(field))
                                        : String(
                                              field?.input.valueManager.toString() ?? 'NO VALUE'
                                          )}
                                </div>
                            </div>
                            <div className={`debug-table-col auto-cols-min`}>
                                <div className={`text-elipsis`}>
                                    {field?.input.isDirty ? 'TRUE' : 'FALSE'}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default FormularFormDebug
