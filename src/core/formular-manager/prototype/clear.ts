import { IFormular } from '@core/formular-base/formular-base.types'
import { IFormularManager } from '../formular-manager.types'

export const clear = function (this: IFormularManager, form: IFormular): void {
    this.forms.delete(form.id)
}
