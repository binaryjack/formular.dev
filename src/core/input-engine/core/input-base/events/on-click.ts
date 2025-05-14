import { newEvent } from '@core/framework/events/new-event'
import { IInputBase } from '../input-base.types'

export const onClick = (f: IInputBase, e: Event) => {
    const inputElement = e.target as HTMLInputElement
    // console.log('onClick', f.name, inputElement.value)

    f.valueManager.setValue(inputElement.value)

    f.styleManager?.update('dirty', f.originalValue !== f.value)

    e.stopPropagation()
    e.preventDefault()

    f?.notificationManager?.notify(
        'onClick',
        newEvent(f.name, onClick.name, 'onClick', `field.${onClick.name}`)
    )
}
