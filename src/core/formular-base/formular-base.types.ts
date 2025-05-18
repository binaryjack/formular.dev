import { IFormularManager } from '@core/formular-manager/formular-manager.types'
import { InputDataTypes } from '@core/framework/common/common.input.data.types'
import { EventsType } from '@core/framework/events/events.types'
import { IExtendedInput, IInput } from '@core/input-engine/core/input-base/input-base.types'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import {
    IValidableForm,
    IValidationManager
} from '@core/managers/validation-manager/validation-manager.types'
import { LoadingStatus } from '@core/status'

export type IFormular = IFormularBase &
    INotificationManager &
    IFormularFlags &
    IValidationManager &
    IValidableForm

export interface IFormularFlags {
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

export interface IFormularBase {
    new (id: string, manager: IFormularManager): IFormular
    id: string
    fields: IExtendedInput[]
    originFields: IExtendedInput[]
    submitCount: number
    canValidate: boolean
    isFormularBinded: boolean
    manager: IFormularManager

    handleValidation: () => void
    validateAll: () => Promise<boolean>
    addFields: (...flds: IInput[]) => void
    getField: (fieldName: string) => IExtendedInput | undefined
    checkChanges: () => void
    setIsBusy: (status: LoadingStatus) => void
    hasChanges: (callback: () => void) => void
    getFormFlags: () => Partial<IFormularFlags>
    getData: () => Record<string, InputDataTypes>
    setValidationTriggerMode: (mode: EventsType[]) => void
}

export interface IFieldChange {
    name: string
    hasChanges: boolean
}
