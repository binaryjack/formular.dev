import { isNumber } from '@core/framework/utility/is-number'

describe('isNumber', () => {
    it('should return true for valid numbers', () => {
        expect(isNumber(0)).toBe(true)
        expect(isNumber(1)).toBe(true)
        expect(isNumber(-1)).toBe(true)
        expect(isNumber(3.14)).toBe(true)
        expect(isNumber(-3.14)).toBe(true)
        expect(isNumber(Infinity)).toBe(true)
        expect(isNumber(-Infinity)).toBe(true)
        expect(isNumber(Number.MAX_VALUE)).toBe(true)
        expect(isNumber(Number.MIN_VALUE)).toBe(true)
        expect(isNumber(1e10)).toBe(true)
        expect(isNumber(0x10)).toBe(true) // hexadecimal        expect(isNumber(0o10)).toBe(true) // octal
        expect(isNumber(0b10)).toBe(true) // binary
    })

    it('should return false for NaN', () => {
        expect(isNumber(NaN)).toBe(false)
        expect(isNumber(Number.NaN)).toBe(false)
        expect(isNumber(parseInt('invalid'))).toBe(false)
        expect(isNumber(parseFloat('invalid'))).toBe(false)
        expect(isNumber(0 / 0)).toBe(false)
    })

    it('should return false for non-number values', () => {
        expect(isNumber(null)).toBe(false)
        expect(isNumber(undefined)).toBe(false)
        expect(isNumber('')).toBe(false)
        expect(isNumber('123')).toBe(false)
        expect(isNumber('0')).toBe(false)
        expect(isNumber(true)).toBe(false)
        expect(isNumber(false)).toBe(false)
        expect(isNumber({})).toBe(false)
        expect(isNumber([])).toBe(false)
        expect(isNumber(() => {})).toBe(false)
        expect(isNumber(Symbol('test'))).toBe(false)
        expect(isNumber(BigInt(123))).toBe(false)
        expect(isNumber(new Date())).toBe(false)
        expect(isNumber(/regex/)).toBe(false)
    })

    it('should handle edge cases with Number constructor', () => {
        expect(isNumber(Number(123))).toBe(true)
        expect(isNumber(Number('123'))).toBe(true)
        expect(isNumber(Number(true))).toBe(true) // Number(true) = 1
        expect(isNumber(Number(false))).toBe(true) // Number(false) = 0        expect(isNumber(Number(null))).toBe(true) // Number(null) = 0
        expect(isNumber(Number(''))).toBe(true) // Number('') = 0
        expect(isNumber(Number('invalid'))).toBe(false) // Number('invalid') = NaN
        expect(isNumber(Number(undefined))).toBe(false) // Number(undefined) = NaN
    })

    it('should handle string numbers correctly', () => {
        // String numbers should return false since they are not number type
        expect(isNumber('123')).toBe(false)
        expect(isNumber('0')).toBe(false)
        expect(isNumber('3.14')).toBe(false)
        expect(isNumber('-1')).toBe(false)
        expect(isNumber('Infinity')).toBe(false)
        expect(isNumber('NaN')).toBe(false)
    })
})
