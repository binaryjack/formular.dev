import { ICustomHandler } from '@core/input-engine/core/abstract/dom-registers-builder'
import { IExtendedInputBase } from '@core/input-engine/core/input-base/input-base.types'

export interface IMaskedBaseInput extends IExtendedInputBase {
    new (mask: string): IMaskedBaseInput
    readonly mask: string
    ref: (ref: HTMLInputElement | null) => void
    register: (...customHandlers: ICustomHandler[]) => any
    onChange: (e: Event) => void
    onKeyPress: (e: KeyboardEvent) => void
    onKeyUp: (e: KeyboardEvent) => void
    initialize: () => void
}
