import { IExtendedInput } from '../input-base.types'
import { onBlurHandle } from './on-blur-handle'

export const onBlur = (f: IExtendedInput, e: Event) => {
    const inputElement = e.target as HTMLInputElement
    f.input.isFocus = false
    f.input.styleManager?.update('focus', f.input.isFocus)
    f.input.cursorPosition = null
    // Connect DOM blur event to the notification chain so onBlurHandle
    // can fire onValidate → handleValidation → onUiUpdate → Pulsar observers
    onBlurHandle(f)
    e.stopPropagation()
}
