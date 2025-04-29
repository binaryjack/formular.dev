import { FieldValuesTypes } from '../../../dependency/schema/descriptor/field.data.types'
import { INotifiableEntity } from '../../notifiable-entity/notifiable-entity-base.types'
import { LoadingStatus } from '../../status'
import { EventsType } from '../events/events.types'
import { IFieldInput } from '../field-input/field-input.types'
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
    new (id: string, autoTracker?: INotifiableEntity): IFormy
    id: string
    fields: IFieldInput[]
    originFields: IFieldInput[]
    submitCount: number
    canValidate: boolean
    setup: (autoTracker?: INotifiableEntity) => void
    handleValidation: (origin?: any) => void
    validateAll: () => void
    addFields: (...flds: IFieldInput[]) => void
    getField: (fieldName: string) => IFieldInput | undefined
    checkChanges: () => void
    setIsBusy: (status: LoadingStatus) => void
    hasChanges: (callback: () => void) => void
    getData: () => Record<string, FieldValuesTypes>
    setValidationTriggerMode: (mode: EventsType[]) => void
}

export interface IFieldChange {
    name: string
    hasChanges: boolean
}
