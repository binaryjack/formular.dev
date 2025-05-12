// set-validation-trigger-mode.ts

import { IInput } from '@core/input-engine/core/input-base/input-base.types'
import { nnv } from '@core/managers/notification-manager/utils/new-notification-visitor'

import { EventsType } from '@core/framework/events/events.types'
import { newEvent } from '@core/framework/events/new-event'
import { IFormular } from '../formular-base.types'

/**
 * Sets the validation trigger mode for the Formy instance.
 * @param mode - An array of validation trigger modes to set.
 */
export function setValidationTriggerMode(this: IFormular, mode: EventsType[]) {
    this.validationTriggerModeType = mode
    const checkChangesOn: string[] = Object.values(mode)

    this.fields.forEach((f: IInput) => {
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
