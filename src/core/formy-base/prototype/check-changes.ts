// check-changes.ts

import { IFieldInput } from '@core/field-engine/core/input-base/field-input-base-types'
import { IFieldChange, IFormy } from '../formy-base.types'

/**
 * Checks for changes in the Formy instance.
 */
export function checkChanges(this: IFormy) {
    const changes: IFieldChange[] = []
    for (const fld of this.fields) {
        const originalField = this.originFields.find((o: IFieldInput) => o.id === fld.id)

        const originalValue = originalField?.getValue()
        const newValue = fld.getValue()
        if (originalValue !== newValue) {
            changes.push({ name: fld.name, hasChanges: true })
            break
        }
    }
    this.isDirty = changes.some((o) => o.hasChanges)
    this.isValid = this.fields.every((o: IFieldInput) => o.isValid)
    // this.observers.trigger()
}
