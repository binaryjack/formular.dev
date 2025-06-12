export type PostalCodeRegion = 'US' | 'CA' | 'UK';
export declare const postalCodeValidator: (name: string, region?: PostalCodeRegion, required?: boolean) => import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
