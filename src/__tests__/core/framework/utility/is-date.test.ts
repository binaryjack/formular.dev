import { isDate } from '@core/framework/utility/is-date'

describe('isDate', () => {
    it('should return true for Date objects', () => {
        expect(isDate(new Date())).toBe(true)
        expect(isDate(new Date('2023-01-01'))).toBe(true)
        expect(isDate(new Date(2023, 0, 1))).toBe(true)
        expect(isDate(new Date('invalid'))).toBe(true) // Invalid Date is still a Date object
        expect(isDate(new Date(0))).toBe(true)
        expect(isDate(new Date(Date.now()))).toBe(true)
    })

    it('should return false for non-Date values', () => {
        expect(isDate(null)).toBe(false)
        expect(isDate(undefined)).toBe(false)
        expect(isDate(0)).toBe(false)
        expect(isDate(1)).toBe(false)
        expect(isDate(-1)).toBe(false)
        expect(isDate(NaN)).toBe(false)
        expect(isDate(Infinity)).toBe(false)
        expect(isDate(true)).toBe(false)
        expect(isDate(false)).toBe(false)
        expect(isDate('')).toBe(false)
        expect(isDate('2023-01-01')).toBe(false)
        expect(isDate('01/01/2023')).toBe(false)
        expect(isDate({})).toBe(false)
        expect(isDate([])).toBe(false)
        expect(isDate(() => {})).toBe(false)
        expect(isDate(Symbol('test'))).toBe(false)
        expect(isDate(BigInt(123))).toBe(false)
        expect(isDate(/regex/)).toBe(false)
    })

    it('should return false for date-like strings', () => {
        expect(isDate('2023-01-01')).toBe(false)
        expect(isDate('01/01/2023')).toBe(false)
        expect(isDate('January 1, 2023')).toBe(false)
        expect(isDate('2023-01-01T00:00:00Z')).toBe(false)
        expect(isDate('Mon Jan 01 2023')).toBe(false)
    })

    it('should return false for timestamp numbers', () => {
        expect(isDate(Date.now())).toBe(false)
        expect(isDate(1672531200000)).toBe(false) // timestamp for 2023-01-01
        expect(isDate(0)).toBe(false) // Unix epoch
        expect(isDate(-1)).toBe(false) // before Unix epoch
    })

    it('should handle edge cases', () => {
        expect(isDate()).toBe(false) // no argument        expect(isDate(void 0)).toBe(false)

        // Date.prototype is NOT actually an instance of Date
        expect(isDate(Date.prototype)).toBe(false)

        // Object created with Date prototype
        const datePrototypeObject = Object.create(Date.prototype)
        expect(isDate(datePrototypeObject)).toBe(false) // Not instanceof Date
    })

    it('should work with subclassed Date objects', () => {
        class CustomDate extends Date {
            customMethod() {
                return 'custom'
            }
        }

        const customDate = new CustomDate()
        expect(isDate(customDate)).toBe(true)
        expect(customDate instanceof Date).toBe(true)
    })

    it('should distinguish between valid and invalid Date objects', () => {
        const validDate = new Date('2023-01-01')
        const invalidDate = new Date('invalid-date')

        expect(isDate(validDate)).toBe(true)
        expect(isDate(invalidDate)).toBe(true) // Still a Date object, even if invalid
        expect(isNaN(invalidDate.getTime())).toBe(true) // But invalid
        expect(isNaN(validDate.getTime())).toBe(false) // Valid
    })

    it('should work with dates created from different sources', () => {
        expect(isDate(new Date(Date.parse('2023-01-01')))).toBe(true)
        expect(isDate(new Date(Date.UTC(2023, 0, 1)))).toBe(true)
        expect(isDate(new Date(2023, 0, 1))).toBe(true) // Numbers are used directly
        expect(isDate(new Date(2023, 0, 1, 0, 0, 0, 0))).toBe(true)
    })

    it('should be useful for type guards', () => {
        const checkDateType = (value: unknown): value is Date => {
            return isDate(value)
        }

        const mixedArray = [new Date(), '2023-01-01', 123, null, new Date('invalid')]
        const dates = mixedArray.filter(checkDateType)

        expect(dates).toHaveLength(2)
        expect(dates.every((date) => date instanceof Date)).toBe(true)
    })

    it('should handle frozen and sealed Date objects', () => {
        const frozenDate = Object.freeze(new Date())
        const sealedDate = Object.seal(new Date())

        expect(isDate(frozenDate)).toBe(true)
        expect(isDate(sealedDate)).toBe(true)
    })
})
