import { DataMutationObserverSubject } from '../../dataMutationObserver/DataMutationObserverSubject'
import { IFieldInput } from '../../field/fieldInputBase/fieldInput.types'
import { IValidationResult } from '../../field/validation/validator.types'
import { NotifiableEntity } from '../../notifiableEntity/NotifiableEntity'
import { LoadingStatus } from '../../status'
import { IFieldChange, IFormy } from './formyBase.types'

export const Formy = function (this: IFormy, id: string) {
    this.id = id
    this.fields = []
    this.originFields = []
    this.validationResults = []
    this.isValid = true
    this.isBusy = LoadingStatus.Loaded
    this.validationTriggerModeType = ['onBlur']
    this.isDirty = false
    this.observers = new DataMutationObserverSubject()
    NotifiableEntity.call(this)
} as any as IFormy

Formy.prototype = {
    ...NotifiableEntity.prototype,
    addFields: function (...flds: IFieldInput[]) {
        this.originFields = []
        for (const fld of flds) {
            const existingFieldRef = this.fields.find((o: IFieldInput) => o.id === fld.id)
            if (!existingFieldRef) {
                fld.accept(this.checkChanges.bind(this))
                this.fields.push(fld)
                this.originFields.push(fld)
            }
        }
    },
    handleValidation: function (origin?: any) {
        this.validateAll()
    },
    validateAll: function () {
        const results: IValidationResult[] = []
        for (const fld of this.fields) {
            if (!fld.shouldValidate) {
                continue
            }
            results.push(fld.validate())
        }
        this.flags.isValid = results?.every((o) => o.state) ?? false
        this.errors = [...results.map((o) => o.error)]
        this.observers.trigger()
    },
    checkChanges: function () {
        const changes: IFieldChange[] = []
        for (const fld of this.fields) {
            const originalField = this.originFields.find((o: IFieldInput) => o.id === fld.id)
            if (originalField.get() !== fld.get()) {
                changes.push({ name: fld.name, hasChanges: true })
                break
            }
        }
        this.dirty = changes.some((o) => o.hasChanges)
        this.isValid = this.fields.every((o: IFieldInput) => o.isValid)
        this.observers.trigger()
    },
    setIsBusy: function (status: LoadingStatus) {
        this.isBusy = status
        this.observers.trigger()
    },
    hasChanges: function (callback: () => void) {
        this.observers.subscribe(callback.bind(this))
    },
    getField: function (fieldName: string) {
        return this.fields.find((field: IFieldInput) => field.name === fieldName)
    }
}
