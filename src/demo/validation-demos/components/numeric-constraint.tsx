import { ValidationConstraintBuilder } from '@core/managers/validation-manager/constraint-builder/validation-constraint-builder'
import {
    IValidationGeneric,
    IValidationOptions
} from '@core/managers/validation-manager/validation-manager.types'
import { useEffect, useRef } from 'react'

export interface INumericConstraintProps<T extends IValidationGeneric> {
    fieldName: string
    type: keyof IValidationOptions
    validationOptions?: IValidationOptions
    errorMessage: string
    guideMessage: string
    handleValidationOptionChange: (key: keyof IValidationOptions, value: any) => void
}

export const NumericConstraint = <T extends IValidationGeneric>({
    fieldName,
    type,
    validationOptions,
    handleValidationOptionChange,
    errorMessage,
    guideMessage
}: INumericConstraintProps<T>) => {
    const inputSetting = useRef(null)

    useEffect(() => {
        if (!validationOptions?.[type]) return
        const val = ((validationOptions?.[type] as T)?.value as number) ?? false
        const element = inputSetting.current as unknown as HTMLInputElement
        if (!element) return
        if (val) {
            element.value = String(val)
        } else {
            element.value = ''
        }
    }, [validationOptions, type])

    return (
        <div className="flex px-2 flex-col w-full">
            <label htmlFor={`${fieldName}-${type}-number-constraint`}>{type}:</label>
            <input
                ref={inputSetting}
                id={`${fieldName}-${type}-number-constraint`}
                type="number"
                onChange={(e) =>
                    handleValidationOptionChange(
                        type,
                        new ValidationConstraintBuilder<number>(type)
                            .setConstraint(Number(e.target.value ?? 0))
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
