import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { IFormularManager } from '../formular-manager.types'

export const clear = function <T extends object>(this: IFormularManager, form: IFormular<T>): void {
    this.forms.delete(form.id)
}
