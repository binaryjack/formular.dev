import { IFormular } from '@core/formular-base/formular-base.types'
import { IFormularManager } from '../formular-manager.types'

export const getForm = function (this: IFormularManager, formId: string): IFormular | undefined {
    return this.forms.get(formId)
}
