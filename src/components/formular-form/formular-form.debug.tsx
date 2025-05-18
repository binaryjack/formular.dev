import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import useFormularContext from './formular-form.context'

interface FormyDebugProps<T extends object> {
    formular: IFormular<T>
}

const FormularFormDebug = <T extends object>({ formular }: FormyDebugProps<T>) => {
    // useForm(formular)
    const { getFormFlags } = useFormularContext()
    const flags = getFormFlags()
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
                        <div className={`text-elipsis`}>{flags.isDirty ? 'Yes' : 'No'}</div>
                    </div>
                    <div className={`debug-table-col auto-cols-min`}>
                        <div className={`text-elipsis`}>{flags.isValid ? 'Yes' : 'No'}</div>
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
                                    {field?.input.type === 'date'
                                        ? JSON.stringify(field?.input.valueManager.getValue(field))
                                        : String(
                                              field?.input.valueManager.getAsString(field) ??
                                                  'NO VALUE'
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
