import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput } from '../input-base.types'

export const onClick = (f: IExtendedInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement
    // console.log('onClick', f.name, inputElement.value)

    f.input.valueManager.setValue(f, inputElement.value)

    f.input.styleManager?.update('dirty', f.input.originalValue !== f.input.value)

    e.stopPropagation()
    e.preventDefault()

    f.input.notificationManager?.notify(
        'onClick',
        newEvent(f.input.name, onClick.name, 'onClick', `field.${onClick.name}`, f.input.name, f)
    )
}
