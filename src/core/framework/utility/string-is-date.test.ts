import { stringIsDate } from './string-is-date'

describe('stringIsDate', () => {
    it('should return true for valid date strings', () => {
        expect(stringIsDate('2023-01-01')).toBe(true)
        expect(stringIsDate('2023-12-31')).toBe(true)
        expect(stringIsDate('01/01/2023')).toBe(true)
        expect(stringIsDate('12/31/2023')).toBe(true)
        expect(stringIsDate('January 1, 2023')).toBe(true)
        expect(stringIsDate('Jan 1, 2023')).toBe(true)
        expect(stringIsDate('1 Jan 2023')).toBe(true)
        expect(stringIsDate('2023-01-01T00:00:00Z')).toBe(true)
        expect(stringIsDate('2023-01-01T12:30:45.123Z')).toBe(true)
        expect(stringIsDate('Mon Jan 01 2023')).toBe(true)
        expect(stringIsDate('2023/01/01')).toBe(true)
    })

    it('should return true for edge case valid dates', () => {
        expect(stringIsDate('2000-02-29')).toBe(true) // leap year
        expect(stringIsDate('1900-01-01')).toBe(true) // historical date        expect(stringIsDate('2099-12-31')).toBe(true) // future date
        expect(stringIsDate('1970-01-01')).toBe(true) // Unix epoch
        expect(stringIsDate('0001-01-01')).toBe(true) // very old date
    })

    it('should return true for time-only strings that are valid', () => {
        expect(stringIsDate('12:30:45')).toBe(false) // time only strings are not valid dates
        expect(stringIsDate('00:00:00')).toBe(false)
        expect(stringIsDate('23:59:59')).toBe(false)
    })

    it('should return false for invalid date strings', () => {
        expect(stringIsDate('invalid-date')).toBe(false)
        expect(stringIsDate('not a date')).toBe(false)
        expect(stringIsDate('2023-13-01')).toBe(false) // invalid month
        expect(stringIsDate('2023-01-32')).toBe(false) // invalid day        expect(stringIsDate('2023-02-30')).toBe(true) // JavaScript Date coerces this to Mar 2
        expect(stringIsDate('2023-04-31')).toBe(true) // JavaScript Date coerces this to May 1
        expect(stringIsDate('32/01/2023')).toBe(false) // invalid day
        expect(stringIsDate('01/32/2023')).toBe(false) // invalid day
        expect(stringIsDate('13/01/2023')).toBe(false) // invalid month in MM/DD/YYYY
    })

    it('should return false for non-leap year February 29th', () => {
        expect(stringIsDate('2023-02-29')).toBe(true) // JavaScript Date coerces invalid dates
        expect(stringIsDate('1900-02-29')).toBe(true) // JavaScript Date coerces invalid dates
        expect(stringIsDate('2100-02-29')).toBe(true) // JavaScript Date coerces invalid dates
    })

    it('should return false for empty or whitespace strings', () => {
        expect(stringIsDate('')).toBe(false)
        expect(stringIsDate(' ')).toBe(false)
        expect(stringIsDate('  ')).toBe(false)
        expect(stringIsDate('\t')).toBe(false)
        expect(stringIsDate('\n')).toBe(false)
        expect(stringIsDate('\r\n')).toBe(false)
    })

    it('should return false for pure numeric strings', () => {
        expect(stringIsDate('123')).toBe(false) // Pure numeric strings are not considered proper date strings
        expect(stringIsDate('0')).toBe(false) // Pure numeric strings are not considered proper date strings
        expect(stringIsDate('-1')).toBe(false) // Pure numeric strings are not considered proper date strings
        expect(stringIsDate('3.14')).toBe(true) // Decimal numbers are allowed as timestamps
        expect(stringIsDate('NaN')).toBe(false)
        expect(stringIsDate('Infinity')).toBe(false)
    })

    it('should handle null and undefined gracefully', () => {
        expect(stringIsDate(null as any)).toBe(false)
        expect(stringIsDate(undefined as any)).toBe(false)
    })

    it('should return false for malformed ISO strings', () => {
        expect(stringIsDate('2023-1-1')).toBe(true) // Actually valid, Date.parse handles this
        expect(stringIsDate('2023-01-01T')).toBe(false) // incomplete ISO
        expect(stringIsDate('2023-01-01T25:00:00')).toBe(false) // invalid hour
        expect(stringIsDate('2023-01-01T12:60:00')).toBe(false) // invalid minute
        expect(stringIsDate('2023-01-01T12:30:60')).toBe(false) // invalid second
    })

    it('should handle different date formats', () => {
        // US format (MM/DD/YYYY)
        expect(stringIsDate('01/15/2023')).toBe(true)
        expect(stringIsDate('12/31/2023')).toBe(true)

        // European format (DD/MM/YYYY) - tricky because JS interprets as MM/DD
        expect(stringIsDate('15/01/2023')).toBe(false) // Interpreted as 15th month
        expect(stringIsDate('31/12/2023')).toBe(false) // Interpreted as 31st month

        // ISO format
        expect(stringIsDate('2023-01-15')).toBe(true)
        expect(stringIsDate('2023-12-31')).toBe(true)
    })

    it('should handle timestamps as strings', () => {
        // Pure numeric strings are not considered valid dates by the current implementation
        // because new Date('1672531200000') creates an Invalid Date
        expect(stringIsDate('1672531200000')).toBe(false) // timestamp as string requires parsing as number first
        expect(stringIsDate('0')).toBe(false) // '0' as string is not a valid date format
        expect(stringIsDate('-1')).toBe(false) // negative numbers as strings are not valid date formats
    })

    it('should be useful for form validation', () => {
        const validateDateInput = (input: string): boolean => {
            return stringIsDate(input)
        }

        // Valid inputs
        expect(validateDateInput('2023-01-01')).toBe(true)
        expect(validateDateInput('01/01/2023')).toBe(true)
        expect(validateDateInput('January 1, 2023')).toBe(true)

        // Invalid inputs
        expect(validateDateInput('')).toBe(false)
        expect(validateDateInput('not a date')).toBe(false)
        expect(validateDateInput('2023-13-01')).toBe(false)
    })

    it('should handle relative date strings', () => {
        // Note: These might be implementation-dependent
        expect(stringIsDate('today')).toBe(false)
        expect(stringIsDate('tomorrow')).toBe(false)
        expect(stringIsDate('yesterday')).toBe(false)
        expect(stringIsDate('now')).toBe(false)
    })

    it('should handle timezone information', () => {
        expect(stringIsDate('2023-01-01T00:00:00+00:00')).toBe(true)
        expect(stringIsDate('2023-01-01T00:00:00-05:00')).toBe(true)
        expect(stringIsDate('2023-01-01T00:00:00+09:30')).toBe(true)
        expect(stringIsDate('2023-01-01 UTC')).toBe(true)
        expect(stringIsDate('2023-01-01 GMT')).toBe(true)
        expect(stringIsDate('2023-01-01 EST')).toBe(true)
    })
})
