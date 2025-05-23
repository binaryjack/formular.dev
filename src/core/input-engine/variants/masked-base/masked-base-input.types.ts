import { IExtendedInputBase } from '@core/input-engine/core/input-base/input-base.types'

export interface IMaskedBaseInput extends IExtendedInputBase {
    new (mask: string): IMaskedBaseInput
    readonly mask: string
    ref: (ref: HTMLInputElement | null) => void
    register: () => any
    onChange: (e: Event) => void
    initialize: () => void
}
