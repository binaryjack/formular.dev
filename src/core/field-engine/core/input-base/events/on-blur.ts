import { newEvent } from '@core/framework/events/events.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const onBlur = (f: IFieldBaseInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement
    console.log('onBlur', f.name, inputElement.value)
    f.isFocus = false
    f.styleManager?.update('focus', f.isFocus)

    e.stopPropagation()
    e.preventDefault()

    f?.notificationManager?.notify(
        'onBlur',
        newEvent(f.name, onBlur.name, 'onBlur', `field.${onBlur.name}`)
    )
}
