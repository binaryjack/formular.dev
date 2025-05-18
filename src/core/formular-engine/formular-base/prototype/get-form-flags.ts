import { IFormular, IFormularFlags } from '@core/formular-engine/formular-base/formular-base.types'

export const getFormFlags = function <T extends object>(
    this: IFormular<T>
): Partial<IFormularFlags> {
    if (!this.fields) return {}
    const isDirty = this.fields.some((field) => field.input.isDirty)
    const isValid = this.fields.every((field) => field.input.isValid)

    return {
        isBusy: this.isBusy,
        isDirty: isDirty,
        isValid: isValid
    }
}
