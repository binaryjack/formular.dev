import validator from '../../validatiors/validator.strategy'
import { IValidationOrigin } from '../../validatiors/validator.types'
import { IFieldInput } from '../fieldInput.types'

export const handleOnChanged = function (this: IFieldInput, data?: any) {
    console.log('value changed', data, this.value)
}
export const handleOnClicked = function (this: IFieldInput, data?: any) {
    console.log('value clicked', data, this.value)
}

export const handleOnSelected = function (this: IFieldInput, data?: any) {
    console.log('value selected', data, this.value)
}

export const handleOnBlur = function (this: IFieldInput, data?: any) {
    console.log('Blur', data, this.value)
}

export const handleOnFocus = function (this: IFieldInput, data?: any) {
    console.log('Focus', data, this.value)
}

export const handleValidation = function (this: IFieldInput, origin?: any) {
    const validationOrigin = origin as IValidationOrigin
    this.validate(validator, validationOrigin)
}
