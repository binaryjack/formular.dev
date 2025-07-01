import {
    IExtendedInput,
    IFormular,
    INotification,
    IValidationResult,
    notification
} from 'formular.dev.lib'
import { useCallback, useEffect, useState } from 'react'
import useFormularContext from './formular-form.context'

interface FormyDebugProps<T extends object> {
    formular: IFormular<T>
    count?: number
}

const FormularFormDebug = <T extends object>({ formular, count }: FormyDebugProps<T>) => {
    const { getFormFlags } = useFormularContext()
    const [debugData, setDebugData] = useState<Record<string, any>>({})
    const [lastUpdate, setLastUpdate] = useState(Date.now())

    const updateDebugData = useCallback(() => {
        const data = formular.fields.reduce(
            (acc: Record<string, any>, field: IExtendedInput) => {
                acc[field.input.name] = {
                    value: field.input.value,
                    defaultValue: field.input.defaultValue,
                    isValid: field.input.isValid,
                    isDirty: field.input.isDirty,
                    isFocused: field.input.isFocus,
                    validationErrors:
                        field.input.validationResults?.map((v: IValidationResult) => v.error) || [],
                    type: field.input.type,
                    flags: field.input?.styleManager?.getFlagsObject?.() || {}
                }
                return acc
            },
            {} as Record<string, any>
        )

        setDebugData(data)
        setLastUpdate(Date.now())
    }, [formular])

    useEffect(() => {
        if (!formular?.fields) return

        // Subscribe to all field changes
        const allNotifications = formular.fields.flatMap((field: IExtendedInput) => [
            // notification(
            //     field,
            //     updateDebugData,
            //     'onValueChange',
            //     'debug.onValueChange',
            //     'FormDebug'
            // ),
            notification(field, updateDebugData, 'onUiUpdate', 'debug.onUiUpdate', 'FormDebug'),
            // notification(
            //     field,
            //     updateDebugData,
            //     'onValidationChange',
            //     'debug.onValidationChange',
            //     'FormDebug'
            // ),
            notification(field, updateDebugData, 'onFocus', 'debug.onFocus', 'FormDebug'),
            notification(field, updateDebugData, 'onBlur', 'debug.onBlur', 'FormDebug')
        ])

        // Also subscribe to form-level changes
        // if (formular.notificationManager) {
        //     allNotifications.push(
        //         notification(
        //             formular,
        //             updateDebugData,
        //             'onUiUpdate',
        //             'debug.form.onUiUpdate',
        //             'FormDebug'        //         )
        //     )
        // }

        allNotifications.forEach((notif: INotification) => {
            formular.notificationManager?.accept(notif)
        })

        // Initial data load
        updateDebugData()

        return () => {
            allNotifications.forEach((notif: INotification) => {
                formular.notificationManager?.dismiss(notif)
            })
        }
    }, [formular, updateDebugData])

    const flags = getFormFlags()

    return (
        <div className="form-debug flex flex-col p-2 w-full h-full bg-gray-100 border rounded">
            <div className="debug-header mb-2">
                <h3>Form Debug Panel</h3>
                <div className="text-sm text-gray-600">
                    Renders: {count} | Last Update: {new Date(lastUpdate).toLocaleTimeString()}
                </div>
                <div className="text-sm">
                    Form Status: {flags.isDirty ? 'Dirty' : 'Pristine'} | Valid:{' '}
                    {flags.isValid ? 'Yes' : 'No'}
                </div>
            </div>

            <div className="debug-table flex flex-col w-full overflow-auto">
                <div className="debug-table-header flex bg-gray-200 p-1 font-semibold">
                    <div className="flex-1">Field</div>
                    <div className="flex-1">Value</div>
                    <div className="flex-1">Valid</div>
                    <div className="flex-1">Dirty</div>
                    <div className="flex-1">Focused</div>
                    <div className="flex-2">Errors</div>
                </div>

                {Object.entries(debugData).map(([fieldName, fieldData]) => (
                    <div key={fieldName} className="debug-table-row flex p-1 border-b">
                        <div className="flex-1 text-sm">{fieldName}</div>
                        <div className="flex-1 text-sm truncate" title={String(fieldData.value)}>
                            {String(fieldData.value ?? '')}
                        </div>
                        <div className="flex-1 text-sm">
                            <span className={fieldData.isValid ? 'text-green-600' : 'text-red-600'}>
                                {fieldData.isValid ? '✓' : '✗'}
                            </span>
                        </div>
                        <div className="flex-1 text-sm">
                            <span
                                className={fieldData.isDirty ? 'text-orange-600' : 'text-gray-400'}
                            >
                                {fieldData.isDirty ? '●' : '○'}
                            </span>
                        </div>
                        <div className="flex-1 text-sm">
                            <span
                                className={fieldData.isFocused ? 'text-blue-600' : 'text-gray-400'}
                            >
                                {fieldData.isFocused ? '●' : '○'}
                            </span>
                        </div>
                        <div className="flex-2 text-xs text-red-600">
                            {fieldData.validationErrors.join(', ')}
                        </div>
                    </div>
                ))}
            </div>

            <details className="mt-2">
                <summary className="cursor-pointer text-sm">Raw Debug Data</summary>
                <pre className="text-xs bg-white p-2 rounded overflow-auto max-h-40">
                    {JSON.stringify(debugData, null, 2)}
                </pre>
            </details>
        </div>
    )
}

export default FormularFormDebug
