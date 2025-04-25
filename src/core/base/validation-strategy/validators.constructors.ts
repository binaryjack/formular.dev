import { IValidationOrigin, ValidationTriggerModeType } from './validator.types'

export const newValidationOrogin = (fieldName: string, fieldState: ValidationTriggerModeType) => {
    return { fieldName, fieldState } as IValidationOrigin
}
