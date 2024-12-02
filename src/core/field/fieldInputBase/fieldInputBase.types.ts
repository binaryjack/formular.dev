import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import { FieldValuesTypes } from '../../../dependency/schema/descriptor/field.data.types'
import { IFieldDescriptor } from '../../../dependency/schema/descriptor/field.descriptor'
import { IEntityScheme } from '../../../dependency/schema/fieldSchema/field.schema.types'
import { INotifiableEntity } from '../../notifiableEntity/notifiableEntityBase.types'
import { IFieldStateStyle } from '../fieldStateStyle/fieldStateStyle.types'
import {
    IValidationOrigin,
    IValidationResult,
    IValidator,
    ValidationTriggerModeType
} from '../validation/validator.types'
import { IValueStrategy } from '../valueStrategy/valueStrategy.types'

export type SchemeToDescriptorConverterType = (scheme: IEntityScheme) => IFieldDescriptor

export type IFieldInput = IFieldInputBase & IFieldDescriptor & INotifiableEntity

export interface IFieldInputBase {
    new (descriptor: IFieldDescriptor): IFieldInput
    name: string
    internalHTMLElementRef: React.RefObject<HTMLInputElement> | null
    originalValue: FieldValuesTypes | null
    enabled: boolean
    type: string
    fieldStateStyle: IFieldStateStyle
    className: string
    valueStrategy: IValueStrategy | null
    validationTriggerModeType: ValidationTriggerModeType[]
    setup: () => void
    setValidationTriggerMode: (...mode: ValidationTriggerModeType[]) => void
    classNames: () => string
    hasChanges: (callback: () => void) => void
    setFocus: () => void
    enable: (enabled: boolean) => void
    show: (show: boolean) => void
    clear: () => void
    validate: (vtor: IValidator, origin?: IValidationOrigin) => IValidationResult[]
    register: () => DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    ref: () => React.RefObject<HTMLInputElement>
    get: () => FieldValuesTypes | null
    getAsString: () => string | null
}
