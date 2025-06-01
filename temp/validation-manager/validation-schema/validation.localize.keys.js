"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationLocalizeKeys = void 0;
var ValidationLocalizeKeys;
(function (ValidationLocalizeKeys) {
    ValidationLocalizeKeys["nameError"] = "VALIDATION.NAME.ERROR";
    ValidationLocalizeKeys["nameGuide"] = "VALIDATION.NAME.GUIDE";
    ValidationLocalizeKeys["emailError"] = "VALIDATION.EMAIL.ERROR";
    ValidationLocalizeKeys["emailGuide"] = "VALIDATION.EMAIL.GUIDE";
    ValidationLocalizeKeys["phoneError"] = "VALIDATION.PHONE.ERROR";
    ValidationLocalizeKeys["phoneGuide"] = "VALIDATION.PHONE.GUIDE";
    ValidationLocalizeKeys["passwordError"] = "VALIDATION.PASSWORD.ERROR";
    ValidationLocalizeKeys["passwordGuide"] = "VALIDATION.PASSWORD.GUIDE";
    ValidationLocalizeKeys["confirmPasswordError"] = "VALIDATION.CONFIRM_PASSWORD.ERROR";
    ValidationLocalizeKeys["confirmPasswordGuide"] = "VALIDATION.CONFIRM_PASSWORD.GUIDE";
    ValidationLocalizeKeys["dateError"] = "VALIDATION.DATE.ERROR";
    ValidationLocalizeKeys["dateGuide"] = "VALIDATION.DATE.GUIDE";
    ValidationLocalizeKeys["timeError"] = "VALIDATION.TIME.ERROR";
    ValidationLocalizeKeys["timeGuide"] = "VALIDATION.TIME.GUIDE";
    ValidationLocalizeKeys["dateTimeError"] = "VALIDATION.DATE_TIME.ERROR";
    ValidationLocalizeKeys["dateTimeGuide"] = "VALIDATION.DATE_TIME.GUIDE";
    ValidationLocalizeKeys["numberError"] = "VALIDATION.NUMBER.ERROR";
    ValidationLocalizeKeys["numberGuide"] = "VALIDATION.NUMBER.GUIDE";
    ValidationLocalizeKeys["integerError"] = "VALIDATION.INTEGER.ERROR";
    ValidationLocalizeKeys["integerGuide"] = "VALIDATION.INTEGER.GUIDE";
    ValidationLocalizeKeys["decimalError"] = "VALIDATION.DECIMAL.ERROR";
    ValidationLocalizeKeys["decimalGuide"] = "VALIDATION.DECIMAL.GUIDE";
    ValidationLocalizeKeys["urlError"] = "VALIDATION.URL.ERROR";
    ValidationLocalizeKeys["urlGuide"] = "VALIDATION.URL.GUIDE";
    ValidationLocalizeKeys["requiredError"] = "VALIDATION.REQUIRED.ERROR";
    ValidationLocalizeKeys["requiredGuide"] = "VALIDATION.REQUIRED.GUIDE";
    ValidationLocalizeKeys["minLengthError"] = "VALIDATION.MIN_LENGTH.ERROR";
    ValidationLocalizeKeys["minLengthGuide"] = "VALIDATION.MIN_LENGTH.GUIDE";
    ValidationLocalizeKeys["maxLengthError"] = "VALIDATION.MAX_LENGTH.ERROR";
    ValidationLocalizeKeys["maxLengthGuide"] = "VALIDATION.MAX_LENGTH.GUIDE";
    ValidationLocalizeKeys["minError"] = "VALIDATION.MIN.ERROR";
    ValidationLocalizeKeys["minGuide"] = "VALIDATION.MIN.GUIDE";
    ValidationLocalizeKeys["maxError"] = "VALIDATION.MAX.ERROR";
    ValidationLocalizeKeys["maxGuide"] = "VALIDATION.MAX.GUIDE";
    ValidationLocalizeKeys["patternError"] = "VALIDATION.PATTERN.ERROR";
    ValidationLocalizeKeys["patternGuide"] = "VALIDATION.PATTERN.GUIDE";
    ValidationLocalizeKeys["matchError"] = "VALIDATION.MATCH.ERROR";
    ValidationLocalizeKeys["matchGuide"] = "VALIDATION.MATCH.GUIDE";
    ValidationLocalizeKeys["uniqueError"] = "VALIDATION.UNIQUE.ERROR";
    ValidationLocalizeKeys["uniqueGuide"] = "VALIDATION.UNIQUE.GUIDE";
    ValidationLocalizeKeys["customError"] = "VALIDATION.CUSTOM.ERROR";
    ValidationLocalizeKeys["customGuide"] = "VALIDATION.CUSTOM.GUIDE";
    ValidationLocalizeKeys["betweenMaxMinError"] = "VALIDATION.BETWEEN.MAX.MIN.ERROR";
    ValidationLocalizeKeys["betweenMaxMinGuide"] = "VALIDATION.BETWEEN.MAX.MIN.GUIDE";
    ValidationLocalizeKeys["betweenMaxLengthMinLengthError"] = "VALIDATION.BETWEEN.MAX.MIN.LENGTH.ERROR";
    ValidationLocalizeKeys["betweenMaxLengthMinLengthGuide"] = "VALIDATION.BETWEEN.MAX.MIN.LENGTH.GUIDE";
    // Phone validation
    ValidationLocalizeKeys["phonePatternError"] = "VALIDATION.PHONE.PATTERN.ERROR";
    ValidationLocalizeKeys["phonePatternGuide"] = "VALIDATION.PHONE.PATTERN.GUIDE";
    // First name validation
    ValidationLocalizeKeys["firstNameError"] = "VALIDATION.FIRST_NAME.ERROR";
    ValidationLocalizeKeys["firstNameGuide"] = "VALIDATION.FIRST_NAME.GUIDE";
    // Last name validation
    ValidationLocalizeKeys["lastNameError"] = "VALIDATION.LAST_NAME.ERROR";
    ValidationLocalizeKeys["lastNameGuide"] = "VALIDATION.LAST_NAME.GUIDE";
    // Full name validation
    ValidationLocalizeKeys["fullNameError"] = "VALIDATION.FULL_NAME.ERROR";
    ValidationLocalizeKeys["fullNameGuide"] = "VALIDATION.FULL_NAME.GUIDE";
    // Password validation
    ValidationLocalizeKeys["passwordStrongError"] = "VALIDATION.PASSWORD.STRONG.ERROR";
    ValidationLocalizeKeys["passwordStrongGuide"] = "VALIDATION.PASSWORD.STRONG.GUIDE";
    ValidationLocalizeKeys["passwordMediumError"] = "VALIDATION.PASSWORD.MEDIUM.ERROR";
    ValidationLocalizeKeys["passwordMediumGuide"] = "VALIDATION.PASSWORD.MEDIUM.GUIDE";
    // URL validation
    ValidationLocalizeKeys["urlPatternError"] = "VALIDATION.URL.PATTERN.ERROR";
    ValidationLocalizeKeys["urlPatternGuide"] = "VALIDATION.URL.PATTERN.GUIDE";
    // Credit card validation
    ValidationLocalizeKeys["creditCardError"] = "VALIDATION.CREDIT_CARD.ERROR";
    ValidationLocalizeKeys["creditCardGuide"] = "VALIDATION.CREDIT_CARD.GUIDE";
    // Postal code validation
    ValidationLocalizeKeys["postalCodeError"] = "VALIDATION.POSTAL_CODE.ERROR";
    ValidationLocalizeKeys["postalCodeGuide"] = "VALIDATION.POSTAL_CODE.GUIDE";
    // SSN validation
    ValidationLocalizeKeys["ssnError"] = "VALIDATION.SSN.ERROR";
    ValidationLocalizeKeys["ssnGuide"] = "VALIDATION.SSN.GUIDE";
    // Currency validation
    ValidationLocalizeKeys["currencyError"] = "VALIDATION.CURRENCY.ERROR";
    ValidationLocalizeKeys["currencyGuide"] = "VALIDATION.CURRENCY.GUIDE";
    // Age validation
    ValidationLocalizeKeys["ageError"] = "VALIDATION.AGE.ERROR";
    ValidationLocalizeKeys["ageGuide"] = "VALIDATION.AGE.GUIDE";
    ValidationLocalizeKeys["usernameError"] = "VALIDATION.USERNAME.ERROR";
    ValidationLocalizeKeys["usernameGuide"] = "VALIDATION.USERNAME.GUIDE";
    // Country-specific validation
    ValidationLocalizeKeys["phoneCountryError"] = "VALIDATION.PHONE.COUNTRY.ERROR";
    ValidationLocalizeKeys["phoneCountryGuide"] = "VALIDATION.PHONE.COUNTRY.GUIDE";
    ValidationLocalizeKeys["postalCodeCountryError"] = "VALIDATION.POSTAL_CODE.COUNTRY.ERROR";
    ValidationLocalizeKeys["postalCodeCountryGuide"] = "VALIDATION.POSTAL_CODE.COUNTRY.GUIDE";
    ValidationLocalizeKeys["ssnCountryError"] = "VALIDATION.SSN.COUNTRY.ERROR";
    ValidationLocalizeKeys["ssnCountryGuide"] = "VALIDATION.SSN.COUNTRY.GUIDE";
    // Multi-country validation
    ValidationLocalizeKeys["phoneMultiCountryError"] = "VALIDATION.PHONE.MULTI_COUNTRY.ERROR";
    ValidationLocalizeKeys["phoneMultiCountryGuide"] = "VALIDATION.PHONE.MULTI_COUNTRY.GUIDE";
    ValidationLocalizeKeys["postalCodeMultiCountryError"] = "VALIDATION.POSTAL_CODE.MULTI_COUNTRY.ERROR";
    ValidationLocalizeKeys["postalCodeMultiCountryGuide"] = "VALIDATION.POSTAL_CODE.MULTI_COUNTRY.GUIDE";
    ValidationLocalizeKeys["ssnMultiCountryError"] = "VALIDATION.SSN.MULTI_COUNTRY.ERROR";
    ValidationLocalizeKeys["ssnMultiCountryGuide"] = "VALIDATION.SSN.MULTI_COUNTRY.GUIDE";
    // Switzerland-specific
    ValidationLocalizeKeys["phoneSwitzerlandError"] = "VALIDATION.PHONE.SWITZERLAND.ERROR";
    ValidationLocalizeKeys["phoneSwitzerlandGuide"] = "VALIDATION.PHONE.SWITZERLAND.GUIDE";
    ValidationLocalizeKeys["postalCodeSwitzerlandError"] = "VALIDATION.POSTAL_CODE.SWITZERLAND.ERROR";
    ValidationLocalizeKeys["postalCodeSwitzerlandGuide"] = "VALIDATION.POSTAL_CODE.SWITZERLAND.GUIDE";
    ValidationLocalizeKeys["ssnSwitzerlandError"] = "VALIDATION.SSN.SWITZERLAND.ERROR";
    ValidationLocalizeKeys["ssnSwitzerlandGuide"] = "VALIDATION.SSN.SWITZERLAND.GUIDE";
})(ValidationLocalizeKeys || (exports.ValidationLocalizeKeys = ValidationLocalizeKeys = {}));
