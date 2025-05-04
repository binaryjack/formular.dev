import { EventsType } from '@core/events/events.types'
import { IFieldInput } from '@core/fields/field-base-input/field-input-base-types'
import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { INotifiableEntity } from '@core/notifiable-entity/notifiable-entity-base.types'
import { LoadingStatus } from '@core/status'
import {
    IValidableForm,
    IValidationStrategy
} from '@core/validation-strategy/validation-strategy.types'

export type IFormy = IFormyBase &
    INotifiableEntity &
    IFormyFlags &
    IValidationStrategy &
    IValidableForm

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
    getData: () => Record<string, FieldDataTypes>
    setValidationTriggerMode: (mode: EventsType[]) => void
}

export interface IFieldChange {
    name: string
    hasChanges: boolean
}
