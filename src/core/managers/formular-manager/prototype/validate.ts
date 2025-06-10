import { IFormularManager } from '../formular-manager.types'

export const validate = async function <T extends object>(
    this: IFormularManager,
    formId: string
): Promise<boolean> {
    const form = this.forms.get(formId)
    if (!form) return false

    return await form.checkAllFieldsAreValid()
}
