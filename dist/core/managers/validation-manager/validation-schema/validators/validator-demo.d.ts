import { Validators } from '.';
export declare const UserFormValidators: {
    phone: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    firstName: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    lastName: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    email: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    password: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    website: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    age: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    username: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    creditCard: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    numericScore: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    birthDate: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    usPostalCode: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
    canadianPostalCode: import('../../generic-validation-builder/generic-validation-builder').IGenericValidationBuilder;
};
export declare const buildUserFormField: () => {
    firstName: import('../../validation-manager.types').IValidationOptions;
    lastName: import('../../validation-manager.types').IValidationOptions;
    email: import('../../validation-manager.types').IValidationOptions;
    phone: import('../../validation-manager.types').IValidationOptions;
    password: import('../../validation-manager.types').IValidationOptions;
    age: import('../../validation-manager.types').IValidationOptions;
};
export type ValidatorName = keyof typeof Validators;
export declare const createValidationRule: (validatorName: ValidatorName, fieldName: string, required?: boolean) => any;
