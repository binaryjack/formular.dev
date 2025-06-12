import { ValidationLocalizeKeys } from '../../managers/validation-manager/validation-schema/validation.localize.keys';
import { IValidationLocalize } from './localize.type';
export type TranslatioBuilderType = (translations: IValidationLocalize) => (key: ValidationLocalizeKeys) => (data?: string, data2?: string) => string;
export declare const getTranslationBuilder: TranslatioBuilderType;
export declare const getTranslations: () => IValidationLocalize;
