import { CountryCode } from '../validation.regex.patterns';
/**
 * Country-specific postal code validator
 */
export declare const postalCodeCountryValidator: (name: string, countryCode: CountryCode, required?: boolean) => import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
/**
 * Multi-country postal code validator
 */
export declare const postalCodeMultiCountryValidator: (name: string, countryCodes: CountryCode[], required?: boolean) => import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
/**
 * Switzerland-specific postal code validator (NPA - Numéro Postal d'Acheminement)
 */
export declare const postalCodeSwitzerlandValidator: (name: string, required?: boolean) => import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
/**
 * Switzerland NPA (postal code) validator with enhanced validation
 */
export declare const npaValidator: (name: string, required?: boolean) => import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
