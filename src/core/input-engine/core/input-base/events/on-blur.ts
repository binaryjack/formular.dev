import { newEvent } from '@core/framework/events/new-event'
import { IInputBase } from '../input-base.types'

export const onBlur = (f: IInputBase, e: Event) => {
    const inputElement = e.target as HTMLInputElement
    // console.log('onBlur', f.name, inputElement.value)
    f.isFocus = false
    f.styleManager?.update('focus', f.isFocus)

    f?.notificationManager?.notify(
        'onBlur',
        newEvent(f.name, onBlur.name, 'onBlur', `field.${onBlur.name}`)
    )
    e.stopPropagation()
    e.preventDefault()
}
