import { newEvent } from '@core/framework/events/new-event'
import { IInputBase } from '../input-base.types'

export const onChange = (f: IInputBase, e: Event) => {
    const inputElement = e.target as HTMLInputElement
    console.log('onChange', f.name, inputElement.value)
    //f.value = inputElement.value
    f.valueManager.setValue(inputElement.value)

    f.isPristine = f.originalValue === f.value
    f.styleManager?.update('pristine', f.isPristine)
    f.isDirty = f.originalValue !== f.value
    f.styleManager?.update('dirty', f.isDirty)

    f?.notificationManager?.notify(
        'onChange',
        newEvent(f.name, onChange.name, 'onChange', `field.${onChange.name}`)
    )

    e.stopPropagation()
}
