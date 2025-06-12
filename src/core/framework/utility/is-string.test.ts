import { isString } from './is-string'

describe('isString', () => {
    it('should return true for string values', () => {
        expect(isString('hello')).toBe(true)
        expect(isString('')).toBe(true)
        expect(isString('0')).toBe(true)
        expect(isString('false')).toBe(true)
        expect(isString('null')).toBe(true)
        expect(isString('undefined')).toBe(true)
        expect(isString(' ')).toBe(true)
        expect(isString('test string')).toBe(true)
    })

    it('should return false for non-string values', () => {
        expect(isString(null)).toBe(false)
        expect(isString(undefined)).toBe(false)
        expect(isString(0)).toBe(false)
        expect(isString(1)).toBe(false)
        expect(isString(-1)).toBe(false)
        expect(isString(NaN)).toBe(false)
        expect(isString(Infinity)).toBe(false)
        expect(isString(true)).toBe(false)
        expect(isString(false)).toBe(false)
        expect(isString({})).toBe(false)
        expect(isString([])).toBe(false)
        expect(isString(() => {})).toBe(false)
        expect(isString(Symbol('test'))).toBe(false)
        expect(isString(BigInt(123))).toBe(false)
        expect(isString(new Date())).toBe(false)
        expect(isString(/regex/)).toBe(false)
    })

    it('should handle edge cases', () => {
        expect(isString(String(123))).toBe(true)
        expect(isString(String(true))).toBe(true)
        expect(isString(String(null))).toBe(true)
        expect(isString(String(undefined))).toBe(true)
        expect(isString(new String('test'))).toBe(false) // String object, not primitive
    })
})
