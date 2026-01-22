import { InputDataTypes } from '@core/framework/common/common.input.data.types'
import { IEvents } from '@core/framework/events/events.types'
import { ICustomHandler } from '@core/input-engine/core/dom-registers-builder/dom-registers-builder.type'

import { IExtendedInputBase } from '@core/input-engine/core/input-base/input-base.types'

export const SNumericBaseInput = Symbol.for('INumericBaseInput')

export interface INumericBaseInput extends IExtendedInputBase {
    new (): INumericBaseInput
    ref: (ref: HTMLInputElement | null) => void
    register: (...customHandlers: ICustomHandler[]) => any
    setValue: (value: InputDataTypes) => void
    getValue: () => InputDataTypes
    handleOnChanged: <T extends IEvents>(data?: T) => void
    handleOnClear: <T extends IEvents>(data?: T) => void
}
