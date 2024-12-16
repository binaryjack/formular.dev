export enum EFormActions {
    ADD_FORM = 'ADD_FORM',
    RESET_FIELD = 'RESET_FIELD',
    UPDATE_FIELD = 'UPDATE_FIELD',
    IS_VALIDATING = 'IS_VALIDATING',
    IS_RESETTING = 'IS_RESETTING',
    IS_SUBMITTING = 'IS_SUBMITTING',
    FORM_VALID = 'FORM_VALID',
    FIELD_VALID = 'FIELD_VALID',
    FIELD_PRISTINE = 'FIELD_PRISTINE',
    FIELD_FOCUS = 'FIELD_FOCUS',
    FIELD_DIRTY = 'FIELD_DIRTY',
    FIELD_ERROR = 'FIELD_ERROR',
    FIELD_GUIDE = 'FIELD_GUIDE',
    FIELD_VALUE = 'FIELD_VALUE',
    OBJECT_VALUE = 'OBJECT_VALUE',
    FIELD_DEFAULT_VALUE = 'FIELD_DEFAULT_VALUE',
    SUBMIT_REQUEST = 'SUBMIT_REQUEST',
    IS_LOADING = 'IS_LOADING',
    IS_LOADED = 'IS_LOADED',
    CHECKSUM = 'CHECKSUM'
}

export type UpdateFieldType =
    | 'VALID'
    | 'DIRTY'
    | 'FOCUS'
    | 'PRISTINE'
    | 'VALUE'
    | 'DEFAULT_VALUE'
    | 'OBJECT_VALUE'
    | 'IS_LOADED'
    | 'PROCESS_VALIDATION'

export type UpdateFormType = 'VALID' | 'VALIDATING'

export const isPrimitiveValuedField = (fieldType: string) => {
    return [
        'text',
        'string',
        'textarea',
        'number',
        'select',
        'radio',
        'bigint',
        'check',
        'boolean'
    ].includes(fieldType)
}

export type SchemaDataTypes =
    | 'number'
    | 'string'
    | 'checkbox'
    | 'boolean'
    | 'text'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'bigint'
    | 'datetime'
    | 'range'
    | 'toggle'
    | 'time'
