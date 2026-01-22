// Localization types and interfaces
export type { ILocalize, IValidationLocalize } from './localize.type'

// Translation service
export {
    ValidationTranslationService,
    translateValidation,
    validationTranslationService,
    type IValidationTranslationConfig,
    type SupportedLocale
} from './validation-translation.service'

// Localized validator factory functions
export {
    createCommonLocalizedValidators,
    createLocalizedConstraint,
    createLocalizedFormValidators,
    createLocalizedValidator,
    createLocalizedValidatorFactory,
    withLocalization,
    type ILocalizedValidatorConfig
} from './localized-validator-factory'

// Legacy utilities (kept for backward compatibility)
export {
    getTranslationBuilder,
    getTranslations,
    type TranslatioBuilderType
} from './localize.utils'
