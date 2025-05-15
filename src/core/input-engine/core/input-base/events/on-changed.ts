import { conventions } from '@components/context/conventions/conventions'
import { newEvent } from '@core/framework/events/new-event'
import { IExtendedInput } from '../input-base.types'

export const onChange = (f: IExtendedInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement
    // console.log('onChange', f.name, inputElement.value)
    //f.value = inputElement.value
    f.input.valueManager.setValue(f, inputElement.value)

    f.input.isPristine = f.input.originalValue === f.input.value
    f.input.isDirty = f.input.originalValue !== f.input.value

    f.input.styleManager?.update('pristine', f.input.isPristine)
    f.input.styleManager?.update('dirty', f.input.isDirty)

    f.input.notificationManager?.debounceNotify(
        'onChange',
        conventions.events.onChange.triggerDelay,
        newEvent(f.input.name, onChange.name, 'onChange', `field.${onChange.name}`, f.input.name, f)
    )

    e.stopPropagation()
}
