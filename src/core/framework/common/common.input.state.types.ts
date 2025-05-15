export enum InputClassStatesValuesEnum {
    errors = 'errors',
    no_errors = 'no-errors',

    focus = 'focus',
    no_focus = 'no-focus',

    open = 'open',
    no_open = 'no-open',

    enabled = 'enabled',
    no_enabled = 'no-enabled',

    dirty = 'dirty',
    no_dirty = 'no-dirty',

    pristine = 'pristine',
    no_pristine = 'no-pristine',

    valid = 'valid',
    no_valid = 'no-valid',
    /* even if required is not necessary an input flag and while it's a dupplicate value whitch is available in validation 
    it's convinient to have it as an input flag. All the flags are calculated as a separate object which can be useed outside the component and the field itself */
    required = 'required',
    no_required = 'no-required',

    /* this will reset the style flags */
    clear = 'clear'
}

export enum InputClassStatesNamesEnum {
    errors = 'errors',
    focus = 'focus',
    open = 'open',
    enabled = 'enabled',
    dirty = 'dirty',
    pristine = 'pristine',
    valid = 'valid',
    required = 'required',
    clear = 'clear'
}

export type InputClassStatesValuesKeysType = keyof typeof InputClassStatesValuesEnum
export type InputClassStatesNamesType = keyof typeof InputClassStatesNamesEnum

export const InputClassStatesValuesArray = Object.values(InputClassStatesValuesEnum)
export type InputClassStatesValuesArrayType = typeof InputClassStatesValuesArray
export const InputClassStatesNamesArray: string[] = Object.values(InputClassStatesNamesEnum)
