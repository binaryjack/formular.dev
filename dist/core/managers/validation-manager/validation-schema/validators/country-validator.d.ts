import { CountryCode, ValidationType } from '../validation.regex.patterns';
/**
 * Country code validator - validates against supported country codes
 */
export declare const countryCodeValidator: (name: string, supportedTypes?: ValidationType[], required?: boolean) => import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
/**
 * Multi-country selector validator
 */
export declare const multiCountryValidator: (name: string, supportedTypes?: ValidationType[], required?: boolean, minCountries?: number, maxCountries?: number) => import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
/**
 * Switzerland validator - ensures Switzerland is included in country selection
 */
export declare const switzerlandIncludedValidator: (name: string, required?: boolean) => import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
/**
 * Get countries that support specific validation types
 */
export declare function getCountriesWithSupport(types: ValidationType[]): string[];
/**
 * Get country metadata with validation support information
 */
export declare function getCountryValidationInfo(): Array<{
    code: CountryCode;
    name: string;
    phonePrefix: string;
    supports: {
        phone: boolean;
        postal: boolean;
        ssn: boolean;
    };
}>;
/**
 * Get validation pattern summary for a country
 */
export declare function getCountryPatternSummary(countryCode: CountryCode): {
    country: string;
    patterns: {
        phone?: RegExp;
        postal?: RegExp;
        ssn?: RegExp;
    };
    examples: {
        phone?: string;
        postal?: string;
        ssn?: string;
    };
};
