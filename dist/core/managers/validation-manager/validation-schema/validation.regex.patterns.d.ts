export declare const numericOnly: RegExp;
export declare const namesPattern: RegExp;
export declare const dateEuPattern: RegExp;
export declare const dateIso8601Pattern: RegExp;
export declare const eMailPattern: RegExp;
export declare const phonePattern: RegExp;
export declare const phoneSimplePattern: RegExp;
export declare const phonePatterns: {
    US: RegExp;
    CA: RegExp;
    UK: RegExp;
    DE: RegExp;
    FR: RegExp;
    CH: RegExp;
    IT: RegExp;
    ES: RegExp;
    AT: RegExp;
    NL: RegExp;
    BE: RegExp;
    LU: RegExp;
};
export declare const firstNamePattern: RegExp;
export declare const lastNamePattern: RegExp;
export declare const fullNamePattern: RegExp;
export declare const passwordStrongPattern: RegExp;
export declare const passwordMediumPattern: RegExp;
export declare const urlPattern: RegExp;
export declare const creditCardPattern: RegExp;
export declare const postalCodeUSPattern: RegExp;
export declare const postalCodeCanadaPattern: RegExp;
export declare const postalCodeUKPattern: RegExp;
export declare const postalCodePatterns: {
    US: RegExp;
    CA: RegExp;
    UK: RegExp;
    DE: RegExp;
    FR: RegExp;
    CH: RegExp;
    IT: RegExp;
    ES: RegExp;
    AT: RegExp;
    NL: RegExp;
    BE: RegExp;
    LU: RegExp;
};
export declare const ssnPattern: RegExp;
export declare const ssnPatterns: {
    US: RegExp;
    CA: RegExp;
    UK: RegExp;
    DE: RegExp;
    FR: RegExp;
    CH: RegExp;
    IT: RegExp;
    ES: RegExp;
    AT: RegExp;
    NL: RegExp;
    BE: RegExp;
    LU: RegExp;
};
export declare const currencyPattern: RegExp;
export declare const timePattern: RegExp;
export declare const time12HourPattern: RegExp;
export declare const agePattern: RegExp;
export declare const usernamePattern: RegExp;
export declare const countryMetadata: {
    readonly US: {
        readonly name: "United States";
        readonly code: "US";
        readonly phonePrefix: "+1";
    };
    readonly CA: {
        readonly name: "Canada";
        readonly code: "CA";
        readonly phonePrefix: "+1";
    };
    readonly UK: {
        readonly name: "United Kingdom";
        readonly code: "UK";
        readonly phonePrefix: "+44";
    };
    readonly DE: {
        readonly name: "Germany";
        readonly code: "DE";
        readonly phonePrefix: "+49";
    };
    readonly FR: {
        readonly name: "France";
        readonly code: "FR";
        readonly phonePrefix: "+33";
    };
    readonly CH: {
        readonly name: "Switzerland";
        readonly code: "CH";
        readonly phonePrefix: "+41";
    };
    readonly IT: {
        readonly name: "Italy";
        readonly code: "IT";
        readonly phonePrefix: "+39";
    };
    readonly ES: {
        readonly name: "Spain";
        readonly code: "ES";
        readonly phonePrefix: "+34";
    };
    readonly AT: {
        readonly name: "Austria";
        readonly code: "AT";
        readonly phonePrefix: "+43";
    };
    readonly NL: {
        readonly name: "Netherlands";
        readonly code: "NL";
        readonly phonePrefix: "+31";
    };
    readonly BE: {
        readonly name: "Belgium";
        readonly code: "BE";
        readonly phonePrefix: "+32";
    };
    readonly LU: {
        readonly name: "Luxembourg";
        readonly code: "LU";
        readonly phonePrefix: "+352";
    };
};
export type CountryCode = keyof typeof countryMetadata;
export type ValidationType = 'phone' | 'postal' | 'ssn';
export declare class PatternManager {
    static getPattern<T extends keyof typeof phonePatterns | keyof typeof postalCodePatterns | keyof typeof ssnPatterns>(type: ValidationType, countryCode: CountryCode): RegExp | undefined;
    static getAvailableCountries(type?: ValidationType): CountryCode[];
    static getCountryName(countryCode: CountryCode): string;
    static getPhonePrefix(countryCode: CountryCode): string;
    static createMultiCountryPattern(type: ValidationType, countryCodes: CountryCode[]): RegExp | undefined;
}
