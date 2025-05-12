export type InputStateType =
    | 'dirty'
    | 'valid'
    | 'pristine'
    | 'focus'
    | 'open'
    | 'errors'
    /* even if required is not necessary an input flag and while it's a dupplicate value whitch is available in validation 
    it's convinient to have it as an input flag. All the flags are calculated as a separate object which can be useed outside the component and the field itself */
    | 'required'
    /* this will reset the style flags */
    | 'clear'
