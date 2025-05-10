// set-validation-trigger-mode.ts

import { IFieldInput } from '@core/field-engine/core/input-base/field-input-base-types'
import { nnv } from '@core/managers/notification-manager/utils/new-notification-visitor'
import { EventsType, newEvent } from '../../framework/events/events.types'
import { IFormy } from '../formy-base.types'

/**
 * Sets the validation trigger mode for the Formy instance.
 * @param mode - An array of validation trigger modes to set.
 */
export function setValidationTriggerMode(this: IFormy, mode: EventsType[]) {
    this.validationTriggerModeType = mode
    const checkChangesOn: string[] = Object.values(mode)

    this.fields.forEach((f: IFieldInput) => {
        checkChangesOn.forEach((action) => {
            f.setValidationTriggerMode(mode)
            f.accept(
                nnv(
                    newEvent(
                        this.name,
                        setValidationTriggerMode.name,
                        action as EventsType,
                        this.checkChanges.name
                    ),
                    this.checkChanges.bind(this)
                )
            )
        })
    })
}
