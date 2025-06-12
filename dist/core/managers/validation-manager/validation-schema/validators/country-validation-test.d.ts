import { CountryCode } from './index';
declare const testData: {
    CH: {
        phone: string[];
        postal: string[];
        ssn: string[];
    };
    US: {
        phone: string[];
        postal: string[];
        ssn: string[];
    };
    DE: {
        phone: string[];
        postal: string[];
        ssn: string[];
    };
    UK: {
        phone: string[];
        postal: string[];
        ssn: string[];
    };
    FR: {
        phone: string[];
        postal: string[];
        ssn: string[];
    };
};
declare const testSwitzerlandValidators: () => {
    swissPhone: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    swissNPA: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    swissAHV: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
};
declare const testCountryValidators: () => {
    germanPhone: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    ukPostal: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    usSSN: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
};
declare const testMultiCountryValidators: () => {
    europeanPhone: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    dachPostal: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
};
declare const testPatternManagement: () => {
    patterns: {
        swissPhonePattern: RegExp | undefined;
        germanPostalPattern: RegExp | undefined;
    };
    countries: {
        phoneCountries: ("US" | "CA" | "UK" | "DE" | "FR" | "CH" | "IT" | "ES" | "AT" | "NL" | "BE" | "LU")[];
        postalCountries: ("US" | "CA" | "UK" | "DE" | "FR" | "CH" | "IT" | "ES" | "AT" | "NL" | "BE" | "LU")[];
        ssnCountries: ("US" | "CA" | "UK" | "DE" | "FR" | "CH" | "IT" | "ES" | "AT" | "NL" | "BE" | "LU")[];
    };
    metadata: {
        swissName: string;
        swissPrefix: string;
    };
};
declare const testValidatorsObject: () => {
    swiss: {
        phoneValidatorFromObject: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
        npaValidatorFromObject: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
        ahvValidatorFromObject: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    };
    multi: {
        phoneMultiFromObject: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
        postalMultiFromObject: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    };
};
declare const testUtilityFunctions: () => {
    support: {
        allSupportedCountries: string[];
        phonePostalCountries: string[];
    };
    info: {
        countryInfo: {
            code: CountryCode;
            name: string;
            phonePrefix: string;
            supports: {
                phone: boolean;
                postal: boolean;
                ssn: boolean;
            };
        }[];
        swissInfo: {
            code: CountryCode;
            name: string;
            phonePrefix: string;
            supports: {
                phone: boolean;
                postal: boolean;
                ssn: boolean;
            };
        } | undefined;
    };
};
declare const testSwissBusinessApp: () => {
    mainPhone: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    mobilePhone: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    headquartersNPA: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    branchNPA: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    ceoAHV: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    hrManagerAHV: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
};
declare const testEuropeanApp: () => {
    customerPhone: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    shippingPostal: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    billingPostal: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
};
declare const testDynamicValidation: () => {
    swissValidation: {
        phone: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
        postal: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
        ssn: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    };
    germanValidation: {
        phone: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
        postal: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
        ssn: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    };
    ukValidation: {
        phone: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
        postal: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
        ssn: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    };
};
declare const generateTestReport: () => {
    totalTests: number;
    passedTests: number;
    categories: {
        swissValidators: string;
        countryValidators: string;
        multiCountryValidators: string;
        patternManagement: string;
        validatorsObject: string;
        utilityFunctions: string;
        realWorldPatterns: string;
    };
    features: {
        '\uD83C\uDDE8\uD83C\uDDED Switzerland Support': string;
        '\uD83C\uDF0D Multi-Country': string;
        '\uD83D\uDD27 Pattern Management': string;
        '\uD83D\uDCE6 Enhanced API': string;
        '\uD83D\uDEE0\uFE0F Utilities': string;
        '\uD83C\uDFD7\uFE0F Usage Patterns': string;
    };
};
declare const printCountriesSummary: () => void;
export { generateTestReport, printCountriesSummary, testCountryValidators, testData, testDynamicValidation, testEuropeanApp, testMultiCountryValidators, testPatternManagement, testSwissBusinessApp, testSwitzerlandValidators, testUtilityFunctions, testValidatorsObject };
