import { CountryCode } from '../validation.regex.patterns';
/**
 * Country-specific SSN/ID validator
 */
export declare const ssnCountryValidator: (name: string, countryCode: CountryCode, required?: boolean) => import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
/**
 * Multi-country SSN/ID validator
 */
export declare const ssnMultiCountryValidator: (name: string, countryCodes: CountryCode[], required?: boolean) => import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
/**
 * Switzerland-specific AHV number validator
 */
export declare const ahvValidator: (name: string, required?: boolean) => import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
/**
 * Switzerland-specific SSN validator (alias for AHV)
 */
export declare const ssnSwitzerlandValidator: (name: string, required?: boolean) => import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
