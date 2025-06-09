import { ICustomHandler } from '@core/input-engine/core/abstract/dom-registers-builder'
import { IExtendedInputBase } from '@core/input-engine/core/input-base/input-base.types'
export const SMaskedBaseInput = Symbol.for('IMaskedBaseInput')
export interface IMaskedBaseInput extends IExtendedInputBase {
    new (mask: string): IMaskedBaseInput
    readonly mask: string
    maskInitialized: boolean
    ref: (ref: HTMLInputElement | null) => void
    register: (...customHandlers: ICustomHandler[]) => any
    onChange: (e: Event) => void
    setMask: (mask: string) => void
    onKeyPress: (e: KeyboardEvent) => void
    onKeyUp: (e: KeyboardEvent) => void
    initialize: () => void
}
