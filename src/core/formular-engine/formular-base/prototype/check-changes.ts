// check-changes.ts

import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IFieldChange, IFormular } from '../formular-base.types'

/**
 * Checks for changes in the Formy instance.
 */
export function checkChanges<T extends object>(this: IFormular<T>) {
    const changes: IFieldChange[] = []
    for (const fld of this.fields) {
        const originalField = this.originFields.find(
            (o: IExtendedInput) => o.input.id === fld.input.id
        )

        const originalValue = originalField?.input.valueManager.getValue(originalField)
        const newValue = fld.input.valueManager.getValue(fld)
        if (originalValue !== newValue) {
            changes.push({ name: fld.input.name, hasChanges: true })
            break
        }
    }
    this.isDirty = changes.some((o) => o.hasChanges)
    this.isValid = this.fields.every((o: IExtendedInput) => o.input.isValid)
    // this.observers.trigger()
}
