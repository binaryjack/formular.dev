import { IFormularManager } from '../formular-manager.types'

export const validate = async function (this: IFormularManager, formId: string): Promise<boolean> {
    const form = this.forms.get(formId)
    if (!form) return false

    const validationResults = await form.validateAll()
    return validationResults
}
