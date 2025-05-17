import { IFormularFlags } from '@core/formular-base/formular-base.types'
import { IFormular } from '../../formular-manager/formular-manager.types'

export const getFormFlags = function (this: IFormular): Partial<IFormularFlags> {
    if (!this.fields) return {}
    const isDirty = this.fields.some((field) => field.input.isDirty)
    const isValid = this.fields.every((field) => field.input.isValid)

    return {
        isBusy: this.isBusy,
        isDirty: isDirty,
        isValid: isValid
    }
}
