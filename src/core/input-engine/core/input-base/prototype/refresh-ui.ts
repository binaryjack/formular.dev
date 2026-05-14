import { newEvent } from '@core/framework/events/new-event'

import { IExtendedInput, IInput, IInputBase } from '../input-base.types'

export const refreshUi = function (this: IInput, ref?: IInputBase | IExtendedInput) {
    ref?.input?.notificationManager?.debounceNotify(
        'onUiUpdate',
        ref?.input.onUiUpdateDelay,
        newEvent(ref?.input?.name, refreshUi.name, 'onUiUpdate', `field`, ref?.input?.name, ref),
        String(ref?.input?.id)
    )
}
