// add-fields.ts

import { shallowCopy } from '@core/framework/utility/shallow-copy'
import { IInput } from '@core/input-engine/core/input-base/input-base.types'
import { IFormular } from '../formular-base.types'

/**
 * Adds fields to the Formy instance.
 * @param flds - Fields to be added.
 */
export function addFields(this: IFormular, ...flds: IInput[]) {
    this.originFields = []

    for (const fld of flds) {
        const existingFieldRef = this.fields.find((o: IInput) => o.id === fld.id)
        if (!existingFieldRef) {
            if (this.validationTriggerModeType.length > 1) {
                console.log('stop')
            }

            fld.setValidationTriggerMode(this.validationTriggerModeType)

            if (this.autoTracker) {
                fld.autoTracker = this.autoTracker
            }

            this.fields.push(fld)
            this.originFields.push(shallowCopy(fld))
        }
    }
}
