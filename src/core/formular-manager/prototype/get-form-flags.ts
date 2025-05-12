import { IFormularFlags } from '@core/formular-base/formular-base.types'
import { IFormularManager } from '../formular-manager.types'

export const getFormFlags = function (this: IFormularManager, id: string): Partial<IFormularFlags> {
    const currentForm = this.forms.get(id)
    if (!currentForm) return {}
    return {
        isBusy: currentForm?.isBusy,
        isDirty: currentForm?.isDirty,
        isValid: currentForm?.isValid
    }
}
