import {
    IValidationGeneric,
    IValidationOptions,
    ValidationConstraintBuilder
} from 'formular.dev.lib'
import { useEffect, useRef } from 'react'

export interface IBooleanConstraintProps<T extends IValidationGeneric> {
    fieldName: string
    type: keyof IValidationOptions
    validationOptions?: IValidationOptions
    errorMessage: string
    guideMessage: string
    handleValidationOptionChange: (key: keyof IValidationOptions, value: any) => void
}

export const BooleanConstraint = <T extends IValidationGeneric>({
    fieldName,
    type,
    validationOptions,
    handleValidationOptionChange,
    errorMessage,
    guideMessage
}: IBooleanConstraintProps<T>) => {
    const inputSetting = useRef(null)

    useEffect(() => {
        if (!validationOptions?.[type]) return
        const val = ((validationOptions?.[type] as T)?.value as boolean) ?? false
        const element = inputSetting.current as unknown as HTMLInputElement
        if (!element) return
        if (val) {
            element.checked = val
        } else {
            element.checked = false
        }
    }, [validationOptions, type])

    return (
        <div className="flex px-2 flex-col w-full">
            <label htmlFor={`${fieldName}-${type}-checkbox-constraint`}>{type}:</label>
            <input
                ref={inputSetting}
                id={`${fieldName}-${type}-checkbox-constraint`}
                type="checkbox"
                onChange={(e) =>
                    handleValidationOptionChange(
                        type,
                        new ValidationConstraintBuilder<boolean>(type)
                            .setConstraint(e.target.checked)
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
