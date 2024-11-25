export interface IFieldObjectSchema {
    id: number
    name: string
    label: string
    placeholder: string
    min: number | null
    max: number | null
    minLength: number | null
    maxLength: number | null
    type: string
    pattern: string | null
    required: IFieldRequiredObject
    patternGuide: string | null
    patternError: string | null
}

export interface IFieldRequiredObject {
    required: boolean
    guide: string | null
    error: string | null
}
