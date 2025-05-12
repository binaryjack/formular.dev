import { IFormular } from '@core/formular-base/formular-base.types'
import { IFormularManager } from '../formular-manager.types'

export default function getForm(this: IFormularManager, formId: string): IFormular | undefined {
    return this.forms.get(formId)
}
