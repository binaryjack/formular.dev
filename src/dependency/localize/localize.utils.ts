import { ValidationLocalizeKeys } from '../schema/validationSchema/validation.localize.keys'
import translations from './locale.en.json'
import { IValidationLocalize } from './localize.type'

export type GetTranslatioBuilder = (
    translations: IValidationLocalize
) => (key: ValidationLocalizeKeys) => (data?: string, data2?: string) => string

export const getTranslationBuilder: GetTranslatioBuilder =
    (translations: IValidationLocalize) =>
    (key: ValidationLocalizeKeys) =>
    (data?: string, data2?: string) => {
        const translation = translations.validations.find((t) => t.key === key)
        if (translation) {
            return translation.value
                .replace('|data|', data ?? '')
                .replace('|data2|', data2 ?? '')
                .replace('|data|', '')
                .replace('|data2|', '')
        }
        return ''
    }

export const getTranslations = () => {
    return translations as IValidationLocalize
}
