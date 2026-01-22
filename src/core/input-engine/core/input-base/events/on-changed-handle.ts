import { newEvent } from '@core/framework/events/new-event'

import { IExtendedInput } from '../input-base.types'

export const onChangedHandle = (f: IExtendedInput) => {
    if (!f.input.validationManager?.triggerKeyWordType.includes('onChange')) return
    // console.log('onChangedHandle', f.name, f.value)
    f.input.notificationManager?.debounceNotify(
        'onValidate',
        f.input.onValidateDelay,
        newEvent(
            f.input.name,
            onChangedHandle.name,
            'onValidate',
            onChangedHandle.name,
            f.input.name,
            f
        )
    )
}
