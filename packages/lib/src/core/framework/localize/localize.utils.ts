import { conventions } from '@conventions/conventions'
import { ValidationLocalizeKeys } from '../../managers/validation-manager/validation-schema/validation.localize.keys'
import translations from './locale.en.json'
import { IValidationLocalize } from './localize.type'

export type TranslatioBuilderType = (
    translations: IValidationLocalize
) => (key: ValidationLocalizeKeys) => (data?: string, data2?: string) => string

export const getTranslationBuilder: TranslatioBuilderType =
    (translations: IValidationLocalize) =>
    (key: ValidationLocalizeKeys) =>
    (data?: string, data2?: string) => {
        const translation = translations.validations.find((t) => t.key === key)
        if (translation) {
            return translation.value
                .replace(conventions.tokens.validationDataToken1, data ?? '')
                .replace(conventions.tokens.validationDataToken2, data2 ?? '')
                .replace(conventions.tokens.validationDataToken1, '')
                .replace(conventions.tokens.validationDataToken2, '')
        }
        return ''
    }

export const getTranslations = () => {
    return translations as IValidationLocalize
}
