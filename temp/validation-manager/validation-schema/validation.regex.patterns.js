"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternManager = exports.countryMetadata = exports.usernamePattern = exports.agePattern = exports.time12HourPattern = exports.timePattern = exports.currencyPattern = exports.ssnPatterns = exports.ssnPattern = exports.postalCodePatterns = exports.postalCodeUKPattern = exports.postalCodeCanadaPattern = exports.postalCodeUSPattern = exports.creditCardPattern = exports.urlPattern = exports.passwordMediumPattern = exports.passwordStrongPattern = exports.fullNamePattern = exports.lastNamePattern = exports.firstNamePattern = exports.phonePatterns = exports.phoneSimplePattern = exports.phonePattern = exports.eMailPattern = exports.dateIso8601Pattern = exports.dateEuPattern = exports.namesPattern = exports.numericOnly = void 0;
exports.numericOnly = /^\d*$/;
exports.namesPattern = /^[a-zA-Z\-_\s]*$/;
exports.dateEuPattern = /^(0[1-9]|[12]\d|3[01])\/?-?\.?(0[1-9]|1[01,2])\/?-?\.?(19|20)\d{2}$/;
exports.dateIso8601Pattern = /^(19|20)\d{2}\/?-?\.?(0[1-9]|1[01,2])\/?-?\.?(0[1-9]|[12]\d|3[01])$/;
exports.eMailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
// Phone number patterns
exports.phonePattern = /^(\+\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
exports.phoneSimplePattern = /^[\d+\-().\s]{7,20}$/;
// Country-specific phone patterns
exports.phonePatterns = {
    US: /^(\+1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
    CA: /^(\+1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
    UK: /^(\+44[-.\s]?)?(0\d{4}[-.\s]?\d{6}|\d{5}[-.\s]?\d{6})$/,
    DE: /^(\+49[-.\s]?)?\(?\d{3,5}\)?[-.\s]?\d{6,8}$/,
    FR: /^(\+33[-.\s]?)?\(?\d{1,2}\)?[-.\s]?\d{2}[-.\s]?\d{2}[-.\s]?\d{2}[-.\s]?\d{2}$/,
    CH: /^(\+41[-.\s]?)?\(?\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{2}[-.\s]?\d{2}$/,
    IT: /^(\+39[-.\s]?)?\(?\d{2,3}\)?[-.\s]?\d{6,8}$/,
    ES: /^(\+34[-.\s]?)?\d{3}[-.\s]?\d{3}[-.\s]?\d{3}$/,
    AT: /^(\+43[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{6,7}$/,
    NL: /^(\+31[-.\s]?)?\(?\d{2,3}\)?[-.\s]?\d{7,8}$/,
    BE: /^(\+32[-.\s]?)?\(?\d{1,2}\)?[-.\s]?\d{3}[-.\s]?\d{2}[-.\s]?\d{2}$/,
    LU: /^(\+352[-.\s]?)?\d{3}[-.\s]?\d{3}[-.\s]?\d{3}$/
};
// Name patterns
exports.firstNamePattern = /^[a-zA-Z]+([',. -][a-zA-Z]+)*$/;
exports.lastNamePattern = /^[a-zA-Z]+([',. -][a-zA-Z]+)*$/;
exports.fullNamePattern = /^[a-zA-Z]+([',. -][a-zA-Z]+)*\s+[a-zA-Z]+([',. -][a-zA-Z]+)*$/;
// Password patterns
exports.passwordStrongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
exports.passwordMediumPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;
// URL pattern
exports.urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w .-]*)*\/?$/;
// Credit card pattern (simplified for major cards)
exports.creditCardPattern = /^(?:4\d{15}|5[1-5]\d{14}|3[47]\d{13})$/;
// Postal code patterns
exports.postalCodeUSPattern = /^\d{5}(-\d{4})?$/;
exports.postalCodeCanadaPattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
exports.postalCodeUKPattern = /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2}$/;
// Country-specific postal code patterns (NPA for postal codes)
exports.postalCodePatterns = {
    US: /^\d{5}(-\d{4})?$/,
    CA: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    UK: /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2}$/,
    DE: /^\d{5}$/,
    FR: /^\d{5}$/,
    CH: /^\d{4}$/, // Switzerland postal codes (NPA)
    IT: /^\d{5}$/,
    ES: /^\d{5}$/,
    AT: /^\d{4}$/,
    NL: /^\d{4}\s?[A-Za-z]{2}$/,
    BE: /^\d{4}$/,
    LU: /^L?-?\d{4}$/
};
// Social Security Number (US)
exports.ssnPattern = /^\d{3}-?\d{2}-?\d{4}$/;
// Country-specific SSN/ID patterns
exports.ssnPatterns = {
    US: /^\d{3}-?\d{2}-?\d{4}$/,
    CA: /^\d{3}[-.\s]?\d{3}[-.\s]?\d{3}$/, // Canadian SIN
    UK: /^[A-Za-z]{2}\d{6}[A-Za-z]$/, // UK National Insurance Number
    DE: /^\d{2}\s?\d{6}\s?[A-Za-z]\s?\d{3}$/, // German ID
    FR: /^[12]\d{2}(0[1-9]|1[0-2])\d{2}\d{3}\d{3}\d{2}$/, // French INSEE
    CH: /^756\.\d{4}\.\d{4}\.\d{2}$/, // Swiss AHV number
    IT: /^[A-Za-z]{6}\d{2}[A-Za-z]\d{2}[A-Za-z]\d{3}[A-Za-z]$/, // Italian Codice Fiscale
    ES: /^\d{8}[A-Za-z]$/, // Spanish DNI
    AT: /^\d{4}\s?\d{6}$/, // Austrian Social Security
    NL: /^\d{9}$/, // Dutch BSN
    BE: /^\d{2}\.\d{2}\.\d{2}-\d{3}\.\d{2}$/, // Belgian National Number
    LU: /^\d{13}$/ // Luxembourg ID
};
// Currency pattern
exports.currencyPattern = /^\$?[\d,]+(\.\d{2})?$/;
// Time patterns
exports.timePattern = /^([01]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;
exports.time12HourPattern = /^(0?[1-9]|1[0-2]):[0-5]\d\s?(AM|PM|am|pm)$/;
// Age pattern
exports.agePattern = /^(?:[1-9]|[1-9]\d|1[01]\d|120)$/;
// Username pattern
exports.usernamePattern = /^[a-zA-Z0-9_-]{3,20}$/;
// Country metadata and validation patterns
exports.countryMetadata = {
    US: { name: 'United States', code: 'US', phonePrefix: '+1' },
    CA: { name: 'Canada', code: 'CA', phonePrefix: '+1' },
    UK: { name: 'United Kingdom', code: 'UK', phonePrefix: '+44' },
    DE: { name: 'Germany', code: 'DE', phonePrefix: '+49' },
    FR: { name: 'France', code: 'FR', phonePrefix: '+33' },
    CH: { name: 'Switzerland', code: 'CH', phonePrefix: '+41' },
    IT: { name: 'Italy', code: 'IT', phonePrefix: '+39' },
    ES: { name: 'Spain', code: 'ES', phonePrefix: '+34' },
    AT: { name: 'Austria', code: 'AT', phonePrefix: '+43' },
    NL: { name: 'Netherlands', code: 'NL', phonePrefix: '+31' },
    BE: { name: 'Belgium', code: 'BE', phonePrefix: '+32' },
    LU: { name: 'Luxembourg', code: 'LU', phonePrefix: '+352' }
};
// Pattern management utilities
class PatternManager {
    static getPattern(type, countryCode) {
        switch (type) {
            case 'phone':
                return exports.phonePatterns[countryCode];
            case 'postal':
                return exports.postalCodePatterns[countryCode];
            case 'ssn':
                return exports.ssnPatterns[countryCode];
            default:
                return undefined;
        }
    }
    static getAvailableCountries(type) {
        if (!type) {
            return Object.keys(exports.countryMetadata);
        }
        switch (type) {
            case 'phone':
                return Object.keys(exports.phonePatterns);
            case 'postal':
                return Object.keys(exports.postalCodePatterns);
            case 'ssn':
                return Object.keys(exports.ssnPatterns);
            default:
                return [];
        }
    }
    static getCountryName(countryCode) {
        return exports.countryMetadata[countryCode]?.name || countryCode;
    }
    static getPhonePrefix(countryCode) {
        return exports.countryMetadata[countryCode]?.phonePrefix || '';
    }
    static createMultiCountryPattern(type, countryCodes) {
        const patterns = countryCodes
            .map(code => this.getPattern(type, code))
            .filter(Boolean)
            .map(pattern => pattern.source);
        if (patterns.length === 0)
            return undefined;
        if (patterns.length === 1)
            return new RegExp(patterns[0]);
        // Combine patterns with OR operator
        return new RegExp(`(${patterns.join('|')})`);
    }
}
exports.PatternManager = PatternManager;
