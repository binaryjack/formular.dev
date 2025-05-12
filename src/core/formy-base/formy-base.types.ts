import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { EventsType } from '@core/framework/events/events.types'
import { IExtendedInput, IInput } from '@core/input-engine/core/input-base/input-base.types'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import {
    IValidableForm,
    IValidationManager,
    IValidationStrategyData
} from '@core/managers/validation-manager/validation-manager.types'
import { LoadingStatus } from '@core/status'

export type IFormy = IFormyBase &
    INotificationManager &
    IFormyFlags &
    IValidationManager &
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
    new (id: string, autoTracker?: INotificationManager): IFormy
    id: string
    fields: IInput[]
    originFields: IInput[]
    submitCount: number
    canValidate: boolean
    setup: (autoTracker?: INotificationManager) => void
    handleValidation: (data?: IValidationStrategyData) => void
    validateAll: (data?: IValidationStrategyData) => void
    addFields: (...flds: IInput[]) => void
    getField: (fieldName: string) => IExtendedInput | undefined
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
