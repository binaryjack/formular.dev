import { IEvents } from '@core/framework/events/events.types'
import { newEvent } from '@core/framework/events/new-event'
import { IClickBaseInput } from '../click-base-input.types'

export const onClickHandle = function <T extends IEvents>(this: IClickBaseInput, data?: T) {
    if (!data?.fieldRef?.input.validationManager?.triggerKeyWordType.includes('onClick')) return
    // console.log('onClickHandle', f.name, f.value)
    data?.fieldRef?.input.notificationManager?.debounceNotify(
        'onValidate',
        data?.fieldRef?.input.onValidateDelay,
        newEvent(
            data?.fieldRef?.input.name,
            onClickHandle.name,
            'onValidate',
            `field.state.${onClickHandle.name}`,
            data?.fieldRef?.input.name,
            data?.fieldRef
        ),
        String(data?.fieldRef?.input.id) // Pass field ID as channel
    )
}
