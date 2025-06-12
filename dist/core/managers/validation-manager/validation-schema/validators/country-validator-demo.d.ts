import { CountryCode } from './index';
declare function createSwissFormValidation(): {
    phone: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    postalCode: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    ssn: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
};
declare function createEuropeanFormValidation(): {
    phone: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    postalCode: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    country: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
};
declare function createDynamicCountryValidation(selectedCountry: CountryCode): {
    phone: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    postalCode: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    ssn: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
};
declare const regionalValidationGroups: {
    dach: CountryCode[];
    benelux: CountryCode[];
    mediterranean: CountryCode[];
    anglophone: CountryCode[];
};
declare function createRegionalValidation(region: keyof typeof regionalValidationGroups): {
    phone: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    postalCode: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
};
declare function getSafePattern(type: 'phone' | 'postal' | 'ssn', countryCode: CountryCode): RegExp | import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
interface CountryFormData {
    selectedCountry: CountryCode;
    phone: string;
    postalCode: string;
    ssn: string;
}
declare function validateCountryForm(data: CountryFormData): {
    phone: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    postalCode: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    ssn: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
};
interface SwissBusinessForm {
    companyPhone: string;
    headquartersNPA: string;
    employeeAHV: string;
}
declare function validateSwissBusinessForm(data: SwissBusinessForm): {
    companyPhone: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    headquartersNPA: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    employeeAHV: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
};
export { createDynamicCountryValidation, createEuropeanFormValidation, createRegionalValidation, createSwissFormValidation, getSafePattern, regionalValidationGroups, validateCountryForm, validateSwissBusinessForm };
