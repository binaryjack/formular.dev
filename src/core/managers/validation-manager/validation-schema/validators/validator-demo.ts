import {
    firstNameValidator,
    lastNameValidator,
    passwordStrongValidator,
    phoneValidator,
    urlValidator,
    Validators
} from '@core/managers/validation-manager/validation-schema/validators'

import { eMailBuilder } from '@core/managers/validation-manager/validation-schema/presets/e-mail-builder'

// Example usage of individual validators
export const UserFormValidators = {
    // Using individual imports
    phone: phoneValidator('phone', true),
    firstName: firstNameValidator('firstName', true),
    lastName: lastNameValidator('lastName', true),
    email: eMailBuilder('email', true),
    password: passwordStrongValidator('password', true),
    website: urlValidator('website', false), // optional field

    // Using the Validators object
    age: Validators.age('age', true),
    username: Validators.username('username', true),
    creditCard: Validators.creditCard('cardNumber', false),

    // Advanced usage with custom parameters
    numericScore: Validators.numeric('score', true, 0, 100),
    birthDate: Validators.date('birthDate', true, new Date('1900-01-01'), new Date()),
    usPostalCode: Validators.postalCode('zipCode', 'US', true),
    canadianPostalCode: Validators.postalCode('postalCode', 'CA', true)
}

// Example of building validation options for a form field
export const buildUserFormField = () => {
    return {
        firstName: UserFormValidators.firstName.build(),
        lastName: UserFormValidators.lastName.build(),
        email: UserFormValidators.email.build(),
        phone: UserFormValidators.phone.build(),
        password: UserFormValidators.password.build(),
        age: UserFormValidators.age.build()
    }
}

// Type-safe validator usage
export type ValidatorName = keyof typeof Validators

// Helper function to create validation rules
export const createValidationRule = (
    validatorName: ValidatorName,
    fieldName: string,
    required: boolean = true
) => {
    const validator = Validators[validatorName] as any
    return validator(fieldName, required)
}
