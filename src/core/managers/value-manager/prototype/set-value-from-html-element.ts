import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IValueManager } from '../value-manager.types'

export const setValueFromHtmlElement = function (
    this: IValueManager,
    field: IExtendedInput,
    value: HTMLInputElement | null
) {
    try {
        switch (field.input.type) {
            case 'checkbox':
                this.setValue(field, value?.checked ?? false)
                break
            default:
                return this.setValue(field, value?.value ?? null)
        }
    } catch (e) {
        console.error(
            `setValueFromHtmlElement ERROR IN PARSING ${this.input.type} in field: ${this.input.name} `,
            e
        )
    }
}
