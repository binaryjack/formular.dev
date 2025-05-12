import { IFieldGuide } from './i-field-guide'

export const newFieldGuide = (name: string, code: string, message?: string): IFieldGuide => {
    return {
        name,
        code,
        message
    } as IFieldGuide
}
