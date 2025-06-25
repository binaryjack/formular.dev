import { newEvent } from '@core/framework/events/new-event'

import { IExtendedInput } from '../input-base.types'

export const onFocusHandle = (f: IExtendedInput) => {
    if (!f.input.validationManager?.triggerKeyWordType.includes('onFocus')) return

    // console.log('onFocusHandle', f.name, f.value)
    f.input.notificationManager?.debounceNotify(
        'onValidate',
        f.input.validationDelay,
        newEvent(
            f.input.name,
            onFocusHandle.name,
            'onValidate',
            `field.state.${onFocusHandle.name}`,
            f.input.name,
            f
        )
    )
}
