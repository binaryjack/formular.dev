import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { IFormularManager } from '../formular-manager.types'

export const getForm = function <T extends object>(
    this: IFormularManager<T>,
    formId: string
): IFormular<T> | undefined {
    return this.forms.get(formId)
}
