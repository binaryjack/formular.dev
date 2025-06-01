"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = exports.countryMetadata = exports.PatternManager = exports.getCountryPatternSummary = exports.getCountryValidationInfo = exports.getCountriesWithSupport = exports.switzerlandIncludedValidator = exports.multiCountryValidator = exports.countryCodeValidator = exports.ssnSwitzerlandValidator = exports.ahvValidator = exports.ssnMultiCountryValidator = exports.ssnCountryValidator = exports.npaValidator = exports.postalCodeSwitzerlandValidator = exports.postalCodeMultiCountryValidator = exports.postalCodeCountryValidator = exports.phoneSwitzerlandValidator = exports.phoneMultiCountryValidator = exports.phoneCountryValidator = exports.usernameValidator = exports.urlValidator = exports.timeValidator = exports.ssnValidator = exports.postalCodeValidator = exports.phoneValidator = exports.passwordStrongValidator = exports.passwordMediumValidator = exports.numericValidator = exports.lastNameValidator = exports.fullNameValidator = exports.firstNameValidator = exports.dateValidator = exports.currencyValidator = exports.creditCardValidator = exports.ageValidator = void 0;
// Export all validators
var age_validator_1 = require("./age-validator");
Object.defineProperty(exports, "ageValidator", { enumerable: true, get: function () { return age_validator_1.ageValidator; } });
var credit_card_validator_1 = require("./credit-card-validator");
Object.defineProperty(exports, "creditCardValidator", { enumerable: true, get: function () { return credit_card_validator_1.creditCardValidator; } });
var currency_validator_1 = require("./currency-validator");
Object.defineProperty(exports, "currencyValidator", { enumerable: true, get: function () { return currency_validator_1.currencyValidator; } });
var date_validator_1 = require("./date-validator");
Object.defineProperty(exports, "dateValidator", { enumerable: true, get: function () { return date_validator_1.dateValidator; } });
var first_name_validator_1 = require("./first-name-validator");
Object.defineProperty(exports, "firstNameValidator", { enumerable: true, get: function () { return first_name_validator_1.firstNameValidator; } });
var full_name_validator_1 = require("./full-name-validator");
Object.defineProperty(exports, "fullNameValidator", { enumerable: true, get: function () { return full_name_validator_1.fullNameValidator; } });
var last_name_validator_1 = require("./last-name-validator");
Object.defineProperty(exports, "lastNameValidator", { enumerable: true, get: function () { return last_name_validator_1.lastNameValidator; } });
var numeric_validator_1 = require("./numeric-validator");
Object.defineProperty(exports, "numericValidator", { enumerable: true, get: function () { return numeric_validator_1.numericValidator; } });
var password_medium_validator_1 = require("./password-medium-validator");
Object.defineProperty(exports, "passwordMediumValidator", { enumerable: true, get: function () { return password_medium_validator_1.passwordMediumValidator; } });
var password_strong_validator_1 = require("./password-strong-validator");
Object.defineProperty(exports, "passwordStrongValidator", { enumerable: true, get: function () { return password_strong_validator_1.passwordStrongValidator; } });
var phone_validator_1 = require("./phone-validator");
Object.defineProperty(exports, "phoneValidator", { enumerable: true, get: function () { return phone_validator_1.phoneValidator; } });
var postal_code_validator_1 = require("./postal-code-validator");
Object.defineProperty(exports, "postalCodeValidator", { enumerable: true, get: function () { return postal_code_validator_1.postalCodeValidator; } });
var ssn_validator_1 = require("./ssn-validator");
Object.defineProperty(exports, "ssnValidator", { enumerable: true, get: function () { return ssn_validator_1.ssnValidator; } });
var time_validator_1 = require("./time-validator");
Object.defineProperty(exports, "timeValidator", { enumerable: true, get: function () { return time_validator_1.timeValidator; } });
var url_validator_1 = require("./url-validator");
Object.defineProperty(exports, "urlValidator", { enumerable: true, get: function () { return url_validator_1.urlValidator; } });
var username_validator_1 = require("./username-validator");
Object.defineProperty(exports, "usernameValidator", { enumerable: true, get: function () { return username_validator_1.usernameValidator; } });
// Country-specific validators
var phone_country_validator_1 = require("./phone-country-validator");
Object.defineProperty(exports, "phoneCountryValidator", { enumerable: true, get: function () { return phone_country_validator_1.phoneCountryValidator; } });
Object.defineProperty(exports, "phoneMultiCountryValidator", { enumerable: true, get: function () { return phone_country_validator_1.phoneMultiCountryValidator; } });
Object.defineProperty(exports, "phoneSwitzerlandValidator", { enumerable: true, get: function () { return phone_country_validator_1.phoneSwitzerlandValidator; } });
var postal_code_country_validator_1 = require("./postal-code-country-validator");
Object.defineProperty(exports, "postalCodeCountryValidator", { enumerable: true, get: function () { return postal_code_country_validator_1.postalCodeCountryValidator; } });
Object.defineProperty(exports, "postalCodeMultiCountryValidator", { enumerable: true, get: function () { return postal_code_country_validator_1.postalCodeMultiCountryValidator; } });
Object.defineProperty(exports, "postalCodeSwitzerlandValidator", { enumerable: true, get: function () { return postal_code_country_validator_1.postalCodeSwitzerlandValidator; } });
Object.defineProperty(exports, "npaValidator", { enumerable: true, get: function () { return postal_code_country_validator_1.npaValidator; } });
var ssn_country_validator_1 = require("./ssn-country-validator");
Object.defineProperty(exports, "ssnCountryValidator", { enumerable: true, get: function () { return ssn_country_validator_1.ssnCountryValidator; } });
Object.defineProperty(exports, "ssnMultiCountryValidator", { enumerable: true, get: function () { return ssn_country_validator_1.ssnMultiCountryValidator; } });
Object.defineProperty(exports, "ahvValidator", { enumerable: true, get: function () { return ssn_country_validator_1.ahvValidator; } });
Object.defineProperty(exports, "ssnSwitzerlandValidator", { enumerable: true, get: function () { return ssn_country_validator_1.ssnSwitzerlandValidator; } });
var country_validator_1 = require("./country-validator");
Object.defineProperty(exports, "countryCodeValidator", { enumerable: true, get: function () { return country_validator_1.countryCodeValidator; } });
Object.defineProperty(exports, "multiCountryValidator", { enumerable: true, get: function () { return country_validator_1.multiCountryValidator; } });
Object.defineProperty(exports, "switzerlandIncludedValidator", { enumerable: true, get: function () { return country_validator_1.switzerlandIncludedValidator; } });
Object.defineProperty(exports, "getCountriesWithSupport", { enumerable: true, get: function () { return country_validator_1.getCountriesWithSupport; } });
Object.defineProperty(exports, "getCountryValidationInfo", { enumerable: true, get: function () { return country_validator_1.getCountryValidationInfo; } });
Object.defineProperty(exports, "getCountryPatternSummary", { enumerable: true, get: function () { return country_validator_1.getCountryPatternSummary; } });
// Re-export pattern management utilities
var validation_regex_patterns_1 = require("../validation.regex.patterns");
Object.defineProperty(exports, "PatternManager", { enumerable: true, get: function () { return validation_regex_patterns_1.PatternManager; } });
Object.defineProperty(exports, "countryMetadata", { enumerable: true, get: function () { return validation_regex_patterns_1.countryMetadata; } });
// Import all validators for the object export
const age_validator_2 = require("./age-validator");
const credit_card_validator_2 = require("./credit-card-validator");
const currency_validator_2 = require("./currency-validator");
const date_validator_2 = require("./date-validator");
const first_name_validator_2 = require("./first-name-validator");
const full_name_validator_2 = require("./full-name-validator");
const last_name_validator_2 = require("./last-name-validator");
const numeric_validator_2 = require("./numeric-validator");
const password_medium_validator_2 = require("./password-medium-validator");
const password_strong_validator_2 = require("./password-strong-validator");
const phone_validator_2 = require("./phone-validator");
const postal_code_validator_2 = require("./postal-code-validator");
const ssn_validator_2 = require("./ssn-validator");
const time_validator_2 = require("./time-validator");
const url_validator_2 = require("./url-validator");
const username_validator_2 = require("./username-validator");
// Import country-specific validators
const phone_country_validator_2 = require("./phone-country-validator");
const postal_code_country_validator_2 = require("./postal-code-country-validator");
const ssn_country_validator_2 = require("./ssn-country-validator");
const country_validator_2 = require("./country-validator");
exports.Validators = {
    phone: phone_validator_2.phoneValidator,
    firstName: first_name_validator_2.firstNameValidator,
    lastName: last_name_validator_2.lastNameValidator,
    fullName: full_name_validator_2.fullNameValidator,
    passwordStrong: password_strong_validator_2.passwordStrongValidator,
    passwordMedium: password_medium_validator_2.passwordMediumValidator,
    url: url_validator_2.urlValidator,
    creditCard: credit_card_validator_2.creditCardValidator,
    postalCode: postal_code_validator_2.postalCodeValidator,
    ssn: ssn_validator_2.ssnValidator,
    currency: currency_validator_2.currencyValidator,
    age: age_validator_2.ageValidator,
    username: username_validator_2.usernameValidator,
    time: time_validator_2.timeValidator,
    numeric: numeric_validator_2.numericValidator,
    date: date_validator_2.dateValidator,
    // Country-specific validators
    phoneCountry: phone_country_validator_2.phoneCountryValidator,
    phoneMultiCountry: phone_country_validator_2.phoneMultiCountryValidator,
    phoneSwitzerland: phone_country_validator_2.phoneSwitzerlandValidator,
    postalCodeCountry: postal_code_country_validator_2.postalCodeCountryValidator,
    postalCodeMultiCountry: postal_code_country_validator_2.postalCodeMultiCountryValidator,
    postalCodeSwitzerland: postal_code_country_validator_2.postalCodeSwitzerlandValidator,
    npa: postal_code_country_validator_2.npaValidator,
    ssnCountry: ssn_country_validator_2.ssnCountryValidator,
    ssnMultiCountry: ssn_country_validator_2.ssnMultiCountryValidator,
    ahv: ssn_country_validator_2.ahvValidator,
    ssnSwitzerland: ssn_country_validator_2.ssnSwitzerlandValidator,
    countryCode: country_validator_2.countryCodeValidator,
    multiCountry: country_validator_2.multiCountryValidator,
    switzerlandIncluded: country_validator_2.switzerlandIncludedValidator
};
