import { Formular } from '@core/formular-base/formular-base'
import { IFormular } from '@core/formular-base/formular-base.types'
import { IFormularManager } from '../formular-manager.types'

export const createEmpty = function (this: IFormularManager, name: string): IFormular | undefined {
    const frm = new Formular(name, this)
    this.forms.set(frm.id, frm)
    return frm
}
