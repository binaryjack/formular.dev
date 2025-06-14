// add-fields.ts

import { shallowCopy } from '@core/framework/utility/shallow-copy'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IFormular } from '../formular-base.types'

/**
 * Adds fields to the Formy instance.
 * @param flds - Fields to be added.
 */
export function addFields<T extends object>(this: IFormular<T>, ...flds: IExtendedInput[]) {
    this.originFields = []

    for (const fld of flds) {
        const existingFieldRef = this.fields.find(
            (o: IExtendedInput) => o.input.id === fld.input.id
        )
        if (!existingFieldRef) {
            if (this.triggerKeyWordType.length > 1) {
                // console.log('stop')
            }

            fld.input.validationManager.setTriggerKeyWord(this.triggerKeyWordType)

            if (this.autoTracker) {
                fld.input.notificationManager.autoTracker = this.autoTracker
            }

            fld.input.formular = this

            this.fields.push(fld)
            this.originFields.push(shallowCopy(fld))
        }
    }
}
