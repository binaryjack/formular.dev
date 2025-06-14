import { IOptionItem } from './options.scheme.types'

const baseOptionSchemaItem = (
    // when selected
    sequenceId: number,
    id: string,
    value: string,
    text: string,
    disabled?: boolean,
    selected?: boolean
): IOptionItem => {
    return {
        sequenceId: sequenceId,
        id: id,
        text: text,
        value: value,
        disabled: disabled ?? false,
        selected: selected ?? false
    }
}

export default baseOptionSchemaItem
