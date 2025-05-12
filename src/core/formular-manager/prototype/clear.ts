import { IFormular, IFormularManager } from '../formular-manager.types'

export default function clear(this: IFormularManager, form: IFormular): void {
    this.forms.delete(form.id)
}
