// add-fields.ts

import { newNotificationVisitor } from '../../../notifiable-entity/utils/new-notification-visitor'
import { shallowCopy } from '../../../utility/shallow-copy'
import { IFieldInput } from '../../field-input-base/field-input.types'
import { newNotificationVisitorName } from '../../field-input-base/utils/new-notification-visitor'
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
            fld.accept(
                newNotificationVisitor(
                    newNotificationVisitorName('changed', this.id, this.name),
                    this.checkChanges.bind(this),
                    'changed'
                )
            )

            if (this.autoTracker) {
                console.log(`add ${this.autoTracker.name} to ${fld.name}`)
            }

            fld.autoTracker = this.autoTracker
            this.fields.push(fld)
            this.originFields.push(shallowCopy(fld))
        }
    }
}
