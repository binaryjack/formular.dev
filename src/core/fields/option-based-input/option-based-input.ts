import { IFieldInput } from '../field-base-input/field-input-base-types'
import { IOptionBaseInput } from './option-based-input.types'
import { checkOptionsInitialized } from './prototype/check-options-initialized'
import { getOptionById } from './prototype/get-option-by-id'
import { getOptionBySequenceId } from './prototype/get-option-by-sequence-id'
import { getOptionByValue } from './prototype/get-option-by-value'
import { getSelectedValue } from './prototype/get-selected-value'
import { handleOnSelected } from './prototype/handle-on-selected'
import { initialize } from './prototype/initialize'
import { onSelectItem } from './prototype/on-select-item'
import { ref } from './prototype/ref'
import { refOption } from './prototype/ref-option'
import { register } from './prototype/register'
import { registerLabel } from './prototype/register-label'
import { registerOption } from './prototype/register-option'
import { tryGetOptionByIdOrValue } from './prototype/try-get-otion-by-id-or-value'
import { tryGetOptionBySequenceIdThenIdOrValue } from './prototype/try-get-otion-by-sequence-id-then-id-or-value'

export const OptionBaseInput = function (this: IOptionBaseInput, field: IFieldInput) {
    this.field = field

    /** works with IOptionItem[] and fields of type select*/
} as any as IOptionBaseInput

Object.assign(OptionBaseInput.prototype, {
    onSelectItem,
    checkOptionsInitialized,
    getSelectedValue,
    getOptionByValue,
    getOptionById,
    getOptionBySequenceId,
    tryGetOptionByIdOrValue,
    tryGetOptionBySequenceIdThenIdOrValue,
    handleOnSelected,
    initialize,
    refOption,
    ref,
    registerLabel,
    registerOption,
    register
})
