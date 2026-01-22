import { ValidationLocalizeKeys } from '../../managers/validation-manager/validation-schema/validation.localize.keys'
import translations from './locale.en.json'
import { IValidationLocalize } from './localize.type'

export type TranslatioBuilderType = (
    translations: IValidationLocalize,
    token1: string,
    token2: string
) => (key: ValidationLocalizeKeys) => (data?: string, data2?: string) => string

export const getTranslationBuilder: TranslatioBuilderType =
    (translations: IValidationLocalize, token1: string, token2: string) =>
    (key: ValidationLocalizeKeys) =>
    (data?: string, data2?: string) => {
        const translation = translations.validations.find((t) => t.key === key)
        if (translation) {
            return translation.value
                .replace(token1, data ?? '')
                .replace(token2, data2 ?? '')
                .replace(token1, '')
                .replace(token2, '')
        }
        return ''
    }

export const getTranslations = () => {
    return translations as IValidationLocalize
}
