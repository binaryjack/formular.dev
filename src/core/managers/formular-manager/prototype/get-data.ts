import { IFormularManager } from '../formular-manager.types'

export const getData = function <T extends object>(
    this: IFormularManager<T>,
    formId: string
): T | undefined {
    const form = this.forms.get(formId)
    return form ? (form.getData() as T) : undefined
}
