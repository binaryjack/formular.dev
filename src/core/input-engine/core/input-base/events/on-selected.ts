import { IExtendedInput } from '../input-base.types'

export const onSelected = (f: IExtendedInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement

    f.input.isFocus = false
    f.input.styleManager?.update('focus', f.input.isFocus)

    e.stopPropagation()
}
