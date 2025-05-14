// set-validation-trigger-mode.ts

import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'

import { EventsType } from '@core/framework/events/events.types'
import { IFormular } from '../formular-base.types'

/**
 * Sets the validation trigger mode for the Formy instance.
 * @param mode - An array of validation trigger modes to set.
 */
export function setValidationTriggerMode(this: IFormular, mode: EventsType[]) {
    this.validationTriggerModeType = mode
    const checkChangesOn: EventsType[] = Object.values(mode)
    /** DO NEVER REGISTER ON VALIDATE NOTIFICATION EVENT FOR EACH FIELD HERE!!! */
    this.fields.forEach((f: IExtendedInput) => {
        checkChangesOn.forEach((action) => {
            f.input.validationManager.setValidationTriggerMode(mode)
        })
    })
}
