import { ValidationConstraintBuilder } from '@core/managers/validation-manager/constraint-builder/validation-constraint-builder'
import {
    IValidationGeneric,
    IValidationOptions
} from '@core/managers/validation-manager/validation-manager.types'
import { useEffect, useRef } from 'react'

export interface IRegExpConstraintProps<T extends IValidationGeneric> {
    fieldName: string
    type: keyof IValidationOptions
    validationOptions?: IValidationOptions
    errorMessage: string
    guideMessage: string
    handleValidationOptionChange: (key: keyof IValidationOptions, value: any) => void
}

export const RegExpConstraint = <T extends IValidationGeneric>({
    fieldName,
    type,
    validationOptions,
    handleValidationOptionChange,
    errorMessage,
    guideMessage
}: IRegExpConstraintProps<T>) => {
    const inputSetting = useRef(null)

    useEffect(() => {
        if (!validationOptions?.[type]) return
        const val = ((validationOptions?.[type] as T)?.value as RegExp) ?? false
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
            <label htmlFor={`${fieldName}-${type}-text-constraint`}>{type}:</label>
            <input
                ref={inputSetting}
                id={`${fieldName}-${type}-text-constraint`}
                type="text"
                onChange={(e) =>
                    handleValidationOptionChange(
                        type,
                        new ValidationConstraintBuilder<RegExp>(type)
                            .setConstraint(e.target.value ? new RegExp(e.target.value) : /^.*$/)
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
