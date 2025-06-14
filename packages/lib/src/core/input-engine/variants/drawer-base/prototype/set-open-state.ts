import { ToggleableStateType } from '@core/framework/common/common.toggleable'
import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput } from '@core/input-engine/core/input-base/input-base.types'
import { IDrawerBaseInput } from '../drawer-base-input.types'

/**
 * Sets the open state of the field input and notifies observers of the change.
 *
 * @param state - The new open state to set for the field input.
 *
 * @this IFieldInput - The field input instance on which the open state is being set.
 *
 * @remarks
 * This method updates the `openState` property of the field input and triggers a notification
 * to observers with the event type `'changed'`. The notification includes the field name and
 * a field state of `'reset'`.
 */
export const setOpenState = function (this: IDrawerBaseInput, state: ToggleableStateType) {
    this.openState = state
    //this.observers.trigger()
    this.input.notificationManager?.notify(
        'onOpen',
        newEvent(
            this.input.name,
            setOpenState.name,
            'onOpen',
            `field.state.${setOpenState.name}`,
            this.input.name,
            this as unknown as IExtendedInput
        )
    )
}
