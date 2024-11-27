import { DataMutationObserverSubject } from '../../dataMutationObserver/DataMutationObserverSubject'
import { IFieldInput } from '../../field/fieldInputBase/fieldInputBase.types'
import { IValidationResult } from '../../field/validation/validator.types'
import { IFormBase } from './formBase.types'

export const Formy = function (this: IFormBase, id: string) {
    this.id = id
    this.fields = []
    this.originFields = []
    this.errors = []

    this.isSubmitting = false
    this.isValidating = false
    this.isValid = false

    this.observers = new DataMutationObserverSubject()
} as any as IFormBase

Formy.prototype = {
    addFields: function (...flds: IFieldInput[]) {
        this.originFields = []
        for (const fld of flds) {
            if (this.fields.find((o: IFieldInput) => o.id !== fld.id)) {
                this.fields.push(fld)
                this.originFields.push(fld)
            }
        }
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
    hasChanges: function (callback: () => void) {
        this.observers.subscribe(callback.bind(this))
    }
}
