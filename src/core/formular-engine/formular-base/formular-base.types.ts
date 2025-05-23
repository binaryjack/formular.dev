import { InputDataTypes } from '@core/framework/common/common.input.data.types'
import { EventsType } from '@core/framework/events/events.types'
import { IExtendedInput, IInput } from '@core/input-engine/core/input-base/input-base.types'
import { IFormularManager } from '@core/managers/formular-manager/formular-manager.types'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import {
    IValidableForm,
    IValidationManager
} from '@core/managers/validation-manager/validation-manager.types'
import { LoadingStatus } from '@core/status'

export type IFormular<T extends object> = IFormularBase<T> &
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

export interface IFormularBase<T extends object> {
    new (id: string, manager: IFormularManager<T>): IFormular<T>
    readonly id: string
    fields: IExtendedInput[]
    originFields: IExtendedInput[]
    submitCount: number
    validateOnFirstSubmit: boolean
    isFormularBinded: boolean
    readonly manager: IFormularManager<T>
    readonly notificationManager?: INotificationManager

    handleValidation: () => void
    checkAllFieldsAreValid: () => Promise<boolean>
    addFields: (...flds: IInput[]) => void
    getField: (fieldName: string) => IExtendedInput | undefined
    checkChanges: () => void
    submit: () => Promise<T | null>
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
