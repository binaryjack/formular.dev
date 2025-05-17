import { conventions } from '@components/context/conventions/conventions'
import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput, IInput, IInputBase } from '../input-base.types'

export const refreshUi = function (this: IInput, ref?: IInputBase | IExtendedInput) {
    ref?.input?.notificationManager?.debounceNotify(
        'onUiUpdate',
        conventions.events.onUiUpdate.triggerDelay,
        newEvent(ref?.input?.name, refreshUi.name, 'onUiUpdate', `field`, ref?.input?.name, ref)
    )
}
