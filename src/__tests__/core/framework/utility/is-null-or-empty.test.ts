import { isNullOrEmpty } from '@core/framework/utility/is-null-or-empty'

describe('isNullOrEmpty', () => {
    it('should return true for null values', () => {
        expect(isNullOrEmpty(null)).toBe(true)
    })

    it('should return true for empty strings', () => {
        expect(isNullOrEmpty('')).toBe(true)
    })

    it('should return false for non-empty strings', () => {
        expect(isNullOrEmpty('test')).toBe(false)
        expect(isNullOrEmpty('hello world')).toBe(false)
        expect(isNullOrEmpty('0')).toBe(false)
        expect(isNullOrEmpty('false')).toBe(false)
        expect(isNullOrEmpty('null')).toBe(false)
        expect(isNullOrEmpty('undefined')).toBe(false)
        expect(isNullOrEmpty('NaN')).toBe(false)
    })

    it('should return false for whitespace strings', () => {
        expect(isNullOrEmpty(' ')).toBe(false)
        expect(isNullOrEmpty('  ')).toBe(false)
        expect(isNullOrEmpty('\t')).toBe(false)
        expect(isNullOrEmpty('\n')).toBe(false)
        expect(isNullOrEmpty('\r')).toBe(false)
        expect(isNullOrEmpty('\r\n')).toBe(false)
        expect(isNullOrEmpty(' \t\n\r ')).toBe(false)
    })

    it('should handle special string characters', () => {
        expect(isNullOrEmpty('\0')).toBe(false) // null character
        expect(isNullOrEmpty('\u0000')).toBe(false) // unicode null
        expect(isNullOrEmpty('\u00A0')).toBe(false) // non-breaking space
        expect(isNullOrEmpty('\u2028')).toBe(false) // line separator
        expect(isNullOrEmpty('\u2029')).toBe(false) // paragraph separator
    })

    it('should work with string concatenation and manipulation', () => {
        expect(isNullOrEmpty('' + '')).toBe(true)
        expect(isNullOrEmpty(''.repeat(0))).toBe(true)
        expect(isNullOrEmpty('test'.substring(0, 0))).toBe(true)
        expect(isNullOrEmpty('test'.slice(0, 0))).toBe(true)
        expect(isNullOrEmpty('test'.substr(0, 0))).toBe(true)

        expect(isNullOrEmpty('a' + 'b')).toBe(false)
        expect(isNullOrEmpty('x'.repeat(1))).toBe(false)
        expect(isNullOrEmpty('test'.substring(0, 1))).toBe(false)
    })

    it('should handle edge cases with string construction', () => {
        expect(isNullOrEmpty(String())).toBe(true)
        expect(isNullOrEmpty(String(''))).toBe(true)
        expect(isNullOrEmpty(String('test'))).toBe(false)
        expect(isNullOrEmpty(String(null))).toBe(false) // String(null) = 'null'
    })

    it('should be useful for form validation', () => {
        const validateRequired = (value: string | null): boolean => {
            return !isNullOrEmpty(value)
        }

        expect(validateRequired(null)).toBe(false)
        expect(validateRequired('')).toBe(false)
        expect(validateRequired('valid input')).toBe(true)
        expect(validateRequired(' ')).toBe(true) // whitespace is considered valid
    })

    it('should handle template literals', () => {
        expect(isNullOrEmpty(``)).toBe(true)
        expect(isNullOrEmpty(`${''}`)).toBe(true)
        expect(isNullOrEmpty(`test`)).toBe(false)
        expect(isNullOrEmpty(`${null}`)).toBe(false) // template converts null to 'null'
        expect(isNullOrEmpty(`${undefined}`)).toBe(false) // template converts undefined to 'undefined'
    })
})
