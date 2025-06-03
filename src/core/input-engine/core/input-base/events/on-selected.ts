import { IExtendedInput } from '../input-base.types'

export const onSelected = (f: IExtendedInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement

    f.input.isFocus = false
    f.input.styleManager?.update('focus', f.input.isFocus)

    // e.preventDefault()

    // f?.input.notificationManager?.debounceNotify(
    //     'onSelect',
    //     conventions.events.onSelect.triggerDelay,
    //     newEvent(
    //         f.input.name,
    //         onSelected.name,
    //         'onSelect',
    //         `field.${onSelected.name}`,
    //         f.input.name,
    //         f
    //     )
    // )

    e.stopPropagation()
}
