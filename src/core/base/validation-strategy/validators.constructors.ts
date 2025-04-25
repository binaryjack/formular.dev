import { IValidationOrigin, ValidationTriggerModeType } from './validator.types'

export const newValidationOrigin = (fieldName: string, fieldState: ValidationTriggerModeType) => {
    return { fieldName, fieldState } as IValidationOrigin
}
