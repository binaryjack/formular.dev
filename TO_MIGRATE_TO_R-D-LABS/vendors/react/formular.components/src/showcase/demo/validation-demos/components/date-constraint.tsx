import {
    IValidationGeneric,
    IValidationOptions,
    ValidationConstraintBuilder
} from 'formular.dev.lib'
import { useEffect, useRef, useState } from 'react'

export interface IDateConstraintProps<T extends IValidationGeneric> {
    fieldName: string
    type: keyof IValidationOptions
    validationOptions?: IValidationOptions
    errorMessage: string
    guideMessage: string
    handleValidationOptionChange: (key: keyof IValidationOptions, value: any) => void
}

export const DateConstraint = <T extends IValidationGeneric>({
    fieldName,
    type,
    validationOptions,
    handleValidationOptionChange,
    errorMessage,
    guideMessage
}: IDateConstraintProps<T>) => {
    const [dateValue, setDateValue] = useState<string | undefined>()
    const inputSetting = useRef(null)

    useEffect(() => {
        const element = inputSetting.current as unknown as HTMLInputElement
        if (!element) return
        if (dateValue) {
            element.value = dateValue
        } else {
            element.value = ''
        }
    }, [dateValue])

    useEffect(() => {
        if (!validationOptions?.[type]) return
        const timestamp = new Date((validationOptions?.[type] as T)?.value as number).getTime()
        const dateString = new Date(timestamp).toISOString().split('T')[0] // Gets YYYY-MM-DD format
        setDateValue(dateString)
    }, [validationOptions])

    return (
        <div className="flex px-2 flex-col w-full">
            <label htmlFor={`${fieldName}-${type}-date-constraint`}>{type}:</label>
            <input
                ref={inputSetting}
                id={`${fieldName}-${type}-date-constraint`}
                type="date"
                onChange={(e) =>
                    handleValidationOptionChange(
                        type,
                        new ValidationConstraintBuilder<number>(type)
                            .setConstraint(e.target.value ? new Date(e.target.value).getTime() : 0)
                            .setName(fieldName)
                            .setErrorMessage(errorMessage)
                            .setGuideMessage(guideMessage)
                            .build()
                    )
                }
            />
        </div>
    )
}
