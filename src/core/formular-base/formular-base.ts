import { LoadingStatus } from '@core/status'
import { IFormular } from './formular-base.types'
import { addFields } from './prototype/add-fields'
import { checkChanges } from './prototype/check-changes'
import { getData } from './prototype/get-data'
import { getField } from './prototype/get-field'
import { getFormFlags } from './prototype/get-form-flags'
import { handleValidation } from './prototype/handle-validation'
import { hasChanges } from './prototype/has-changes'
import { setIsBusy } from './prototype/set-is-busy'
import { setValidationTriggerMode } from './prototype/set-validation-trigger-mode'

import { validateAll } from './prototype/validate-all'

export const Formular = function (this: IFormular, id: string) {
    this.id = id
    this.fields = []
    this.originFields = []
    this.isValid = true
    this.isBusy = LoadingStatus.Loaded
    this.validationTriggerModeType = []
    this.isDirty = false
} as any as IFormular

Object.assign(Formular.prototype, {
    addFields,
    handleValidation,
    validateAll,
    checkChanges,
    setIsBusy,
    hasChanges,
    getField,
    getData,
    getFormFlags,
    setValidationTriggerMode
})
