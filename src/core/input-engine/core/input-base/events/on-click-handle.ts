import { newEvent } from '@core/framework/events/new-event'
import { IInputBase } from '../input-base.types'

export const onClickHandle = (f: IInputBase) => {
    if (!f.validationManager?.validationTriggerModeType.includes('onClick')) return
    console.log('onClickHandle', f.name, f.value)
    f.notificationManager?.debounceNotify(
        'onValidate',
        500,
        newEvent(f.name, onClickHandle.name, 'onValidate', `field.state.${onClickHandle.name}`)
    )
}
