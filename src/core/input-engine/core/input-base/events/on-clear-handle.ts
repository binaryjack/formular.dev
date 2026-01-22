import { newEvent } from '@core/framework/events/new-event'

import { IExtendedInput } from '../input-base.types'

export const onClearHandle = (f: IExtendedInput) => {
    if (!f.input.validationManager?.triggerKeyWordType.includes('onClear')) return

    // console.log('onClearHandle', f.name, f.value)
    f.input.notificationManager?.debounceNotify(
        'onValidate',
        f.input.onValidateDelay,
        newEvent(
            f.input.name,
            onClearHandle.name,
            'onValidate',
            `field.state.${onClearHandle.name}`,
            f.input.name,
            f
        )
    )
}
