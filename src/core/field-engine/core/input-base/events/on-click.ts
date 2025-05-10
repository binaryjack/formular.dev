import { newEvent } from '@core/framework/events/events.types'
import { IFieldBaseInput } from '../field-input-base-types'

export const onClick = (f: IFieldBaseInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement
    console.log('onClick', f.name, inputElement.value)
    f.styleManager?.update('dirty', f.originalValue !== f.value)

    e.stopPropagation()
    e.preventDefault()

    f?.notificationManager?.notify(
        'onClick',
        newEvent(f.name, onClick.name, 'onClick', `field.${onClick.name}`)
    )
}
