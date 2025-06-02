import { IFormularManager } from '@core/managers/formular-manager/formular-manager.types'
import { LoadingStatus } from '@core/status'
import { IFormular } from './formular-base.types'
import { addFields } from './prototype/add-fields'
import { checkAllFieldsAreValid } from './prototype/check-all-fields-are-valid'
import { checkChanges } from './prototype/check-changes'
import { getData } from './prototype/get-data'
import { getField } from './prototype/get-field'
import { getFormFlags } from './prototype/get-form-flags'
import { hasChanges } from './prototype/has-changes'
import { setIsBusy } from './prototype/set-is-busy'
import { setValidationTriggerMode } from './prototype/set-validation-trigger-mode'
import { submit } from './prototype/submit'

export const Formular = function <T extends object>(
    this: IFormular<T>,
    id: string,
    manager: IFormularManager<T>
) {
    Object.defineProperty(this, 'id', {
        value: id,
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })

    this.fields = []
    this.originFields = []
    this.isValid = true
    this.isBusy = LoadingStatus.Loaded
    this.validationTriggerModeType = []
    this.isDirty = false

    Object.defineProperty(this, 'manager', {
        value: manager,
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })

    Object.defineProperty(this, 'notificationManager', {
        value: manager.notificationManager,
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })
} as any as IFormular<any>

Object.assign(Formular.prototype, {
    addFields,
    checkAllFieldsAreValid,
    checkChanges,
    setIsBusy,
    hasChanges,
    getField,
    getData,
    getFormFlags,
    submit,
    setValidationTriggerMode
})
