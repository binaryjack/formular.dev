import { FieldValuesTypes } from '../../../dependency/schema/descriptor/field.data.types'
import { INotifiableEntity } from '../../notifiable-entity/notifiable-entity-base.types'
import { LoadingStatus } from '../../status'
import { IFieldInput } from '../field-input-base/field-input.types'
import { IValidable, IValidableForm } from '../validation-strategy/validator.types'

export type IFormy = IFormyBase & INotifiableEntity & IFormyFlags & IValidable & IValidableForm

export interface IFormyFlags {
    isBusy: LoadingStatus
    isDirty: boolean
    /**originally this should be in IValidable
     * but! because of IfieldDescriptor
     * has already one let's asume that
     * this info belongs to the entity itself,
     * I am not happy with that but at least it's clear */
    isValid: boolean
    setIsBusy: (status: LoadingStatus) => void
}

export interface IFormyBase {
    new (id: string): IFormy
    id: string
    fields: IFieldInput[]
    originFields: IFieldInput[]
    submitCount: number
    canValidate: boolean
    setup: () => void
    addFields: (...flds: IFieldInput[]) => void
    getField: (fieldName: string) => IFieldInput | undefined
    checkChanges: () => void
    hasChanges: (callback: () => void) => void
    getData: () => Record<string, FieldValuesTypes>
}

export interface IFieldChange {
    name: string
    hasChanges: boolean
}
