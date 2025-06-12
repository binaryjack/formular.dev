import { CountryCode } from '../validation.regex.patterns';
/**
 * Country-specific phone validator
 */
export declare const phoneCountryValidator: (name: string, countryCode: CountryCode, required?: boolean) => import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
/**
 * Multi-country phone validator - validates against multiple country patterns
 */
export declare const phoneMultiCountryValidator: (name: string, countryCodes: CountryCode[], required?: boolean) => import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
/**
 * Switzerland-specific phone validator
 */
export declare const phoneSwitzerlandValidator: (name: string, required?: boolean) => import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
