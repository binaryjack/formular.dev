import { FieldDataTypes } from '@core/framework/common/common.field.data.types'
import { IOptionItem } from '@core/framework/schema/options-schema/options.scheme.types'
import { IEvents } from '../../events/events.types'
import { IClickBaseInput } from '../click-base-input/click-base-input.types'
import { IFieldBaseInput, IFieldInputExtended } from '../field-base-input/field-input-base-types'
import { IOptionInput } from '../option-based-input/option-base-input.types'

export type ISelectInput = ISelectBaseInput & IOptionInput & IClickBaseInput

export interface ISelectBaseInput extends IFieldInputExtended {
    new (): ISelectBaseInput

    initialize: (fieldInput: IFieldBaseInput) => void

    handleOnChanged: <T extends IEvents>(data?: T) => void
    handleOnClick: <T extends IEvents>(data?: T) => void
    handleOnSelected: <T extends IEvents>(data?: T) => void

    ref: (ref: HTMLInputElement | null) => void
    register: () => Partial<HTMLInputElement>

    refOption: (ref: HTMLInputElement | null) => void
    registerOption: () => Partial<HTMLInputElement>

    onSelectItem: (option: IOptionItem) => void
    setValue: (value: FieldDataTypes | null) => void
    getValue: () => FieldDataTypes
}
