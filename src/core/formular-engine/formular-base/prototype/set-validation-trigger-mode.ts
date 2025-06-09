// set-validation-trigger-mode.ts

import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'

import { EventsType } from '@core/framework/events/events.types'
import { IFormular } from '../formular-base.types'

/**
 * Sets the validation trigger mode for the Formy instance.
 * @param mode - An array of validation trigger modes to set.
 */
export const setTriggerKeyWord = function <T extends object>(
    this: IFormular<T>,
    mode: EventsType[]
) {
    this.triggerKeyWordType = mode
    /** this will make validation being activated only after the first submit invoke */
    this.validateOnFirstSubmit = mode.includes('validateOnFormFirstSubmit')

    /** DO NEVER REGISTER ON VALIDATE NOTIFICATION EVENT FOR EACH FIELD HERE!!! */
    this.fields.forEach((f: IExtendedInput) => {
        f.input.validationManager.setTriggerKeyWord(mode)
    })
}
