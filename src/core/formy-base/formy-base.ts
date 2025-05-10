import { TrackingManager } from '@core/managers/tracking-manager/tracker-manager'

import { NotifiableEntity } from '@core/managers/notification-manager/notification-manager'
import { INotificationManager } from '@core/managers/notification-manager/notification-manager-base.types'
import { LoadingStatus } from '@core/status'
import { IFormy } from './formy-base.types'
import { addFields } from './prototype/add-fields'
import { checkChanges } from './prototype/check-changes'
import { getData } from './prototype/get-data'
import { getField } from './prototype/get-field'
import { handleValidation } from './prototype/handle-validation'
import { hasChanges } from './prototype/has-changes'
import { setIsBusy } from './prototype/set-is-busy'
import { setValidationTriggerMode } from './prototype/set-validation-trigger-mode'
import { setup } from './prototype/setup'
import { validateAll } from './prototype/validate-all'

export const Formy = function (this: IFormy, id: string, autoTracker?: INotificationManager) {
    this.id = id
    this.fields = []
    this.originFields = []
    this.isValid = true
    this.isBusy = LoadingStatus.Loaded
    this.validationTriggerModeType = []
    this.isDirty = false
    NotifiableEntity.call(this, autoTracker)
} as any as IFormy

Formy.prototype = {
    ...NotifiableEntity.prototype,
    ...TrackingManager.prototype
}

Object.assign(Formy.prototype, {
    setup,
    addFields,
    handleValidation,
    validateAll,
    checkChanges,
    setIsBusy,
    hasChanges,
    getField,
    getData,
    setValidationTriggerMode
})
