import { Formular } from '@core/formular-engine/formular-base/formular-base'
import { IFormular } from '@core/formular-engine/formular-base/formular-base.types'
import { IFormularManager } from '../formular-manager.types'

export const createEmpty = function <T extends object>(
    this: IFormularManager,
    name: string
): IFormular<T> | undefined {
    const frm = new Formular(name, this)
    this.forms.set(frm.id, frm)
    return frm
}
