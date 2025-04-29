// add-fields.ts

import { shallowCopy } from '../../../utility/shallow-copy'
import { IFieldInput } from '../../field-input/field-input.types'
import { IFormy } from '../formy-base.types'

/**
 * Adds fields to the Formy instance.
 * @param flds - Fields to be added.
 */
export function addFields(this: IFormy, ...flds: IFieldInput[]) {
    this.originFields = []

    for (const fld of flds) {
        const existingFieldRef = this.fields.find((o: IFieldInput) => o.id === fld.id)
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
