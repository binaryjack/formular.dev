import { DataMutationObserverSubject } from '../../data-mutation-observer/data-mutation-observer-subject'
import { NotifiableEntity } from '../../notifiable-entity/notifiable-entity'
import { LoadingStatus } from '../../status'
import { Tracker } from '../tracker/tracker'
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

export const Formy = function (this: IFormy, id: string) {
    this.id = id
    this.fields = []
    this.originFields = []
    this.validationResults = []
    this.isValid = true
    this.isBusy = LoadingStatus.Loaded
    this.validationTriggerModeType = []
    this.isDirty = false
    this.observers = new DataMutationObserverSubject()
    NotifiableEntity.call(this)
} as any as IFormy

Formy.prototype = {
    ...NotifiableEntity.prototype,
    ...Tracker.prototype
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
