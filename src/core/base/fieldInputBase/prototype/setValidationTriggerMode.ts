import { ValidationTriggerModeType } from '../../validatiors/validator.types'
import { IFieldInput } from '../fieldInput.types'

export const setValidationTriggerMode = function (
    this: IFieldInput,
    mode: ValidationTriggerModeType[]
) {
    this.validationTriggerModeType = mode
}
