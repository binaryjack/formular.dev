import { IFieldInput } from '../../field/fieldInputBase/fieldInput.types'
import { IValidable, IValidableForm } from '../../field/validation/validator.types'
import { INotifiableEntity } from '../../notifiableEntity/notifiableEntityBase.types'
import { LoadingStatus } from '../../status'

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
    checkChanges: () => void
    hasChanges: (callback: () => void) => void
}

export interface IFieldChange {
    name: string
    hasChanges: boolean
}
