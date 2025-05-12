import { IFormularManager } from '../formular-manager.types'

export default function getData<T extends object>(
    this: IFormularManager,
    formId: string
): T | undefined {
    const form = this.forms.get(formId)
    return form ? (form.getData() as T) : undefined
}
