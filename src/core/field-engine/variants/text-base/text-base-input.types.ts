import { IExtendedInputBase } from '@core/field-engine/core/input-base/input-base.types'
import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { IEvents } from '@core/framework/events/events.types'

export interface ITextBaseInput extends IExtendedInputBase {
    new (): ITextBaseInput
    ref: (ref: HTMLInputElement | null) => void
    register: () => any
    setValue: (value: FieldDataTypes) => void
    getValue: () => FieldDataTypes
    handleOnChanged: <T extends IEvents>(data?: T) => void
    handleOnClear: <T extends IEvents>(data?: T) => void
}
