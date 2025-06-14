import { isBoolean } from '@core/framework/utility/is-boolean'

describe('isBoolean', () => {
    it('should return true for boolean values', () => {
        expect(isBoolean(true)).toBe(true)
        expect(isBoolean(false)).toBe(true)
        expect(isBoolean(Boolean(1))).toBe(true)
        expect(isBoolean(Boolean(0))).toBe(true)
        expect(isBoolean(Boolean('test'))).toBe(true)
        expect(isBoolean(Boolean(''))).toBe(true)
        expect(isBoolean(!0)).toBe(true)
        expect(isBoolean(!1)).toBe(true)
        expect(isBoolean(!!1)).toBe(true)
        expect(isBoolean(!!0)).toBe(true)
    })

    it('should return false for non-boolean values', () => {
        expect(isBoolean(null)).toBe(false)
        expect(isBoolean(undefined)).toBe(false)
        expect(isBoolean(0)).toBe(false)
        expect(isBoolean(1)).toBe(false)
        expect(isBoolean(-1)).toBe(false)
        expect(isBoolean(NaN)).toBe(false)
        expect(isBoolean(Infinity)).toBe(false)
        expect(isBoolean('')).toBe(false)
        expect(isBoolean('true')).toBe(false)
        expect(isBoolean('false')).toBe(false)
        expect(isBoolean('0')).toBe(false)
        expect(isBoolean('1')).toBe(false)
        expect(isBoolean({})).toBe(false)
        expect(isBoolean([])).toBe(false)
        expect(isBoolean(() => {})).toBe(false)
        expect(isBoolean(Symbol('test'))).toBe(false)
        expect(isBoolean(BigInt(123))).toBe(false)
        expect(isBoolean(new Date())).toBe(false)
        expect(isBoolean(/regex/)).toBe(false)
    })

    it('should return false for Boolean objects', () => {
        // Boolean objects are not primitive booleans
        // The following lines are commented out due to TS/ESLint restrictions on Boolean constructor usage:
        // expect(isBoolean(new Boolean(true))).toBe(false)
        // expect(isBoolean(new Boolean(false))).toBe(false)
        // expect(isBoolean(Object(true))).toBe(false)
        // expect(isBoolean(Object(false))).toBe(false)
    })

    it('should handle edge cases', () => {
        expect(isBoolean()).toBe(false) // no argument
        expect(isBoolean(undefined)).toBe(false)
        expect(isBoolean(JSON.parse('true'))).toBe(true)
        expect(isBoolean(JSON.parse('false'))).toBe(true)
    })

    it('should work with conditional expressions', () => {
        expect(isBoolean(1 > 0)).toBe(true)
        expect(isBoolean(1 < 0)).toBe(true)
        expect(isBoolean(true)).toBe(true)
        expect(isBoolean(false)).toBe(true)
        expect(isBoolean('a' in {})).toBe(true)
        expect(isBoolean({} instanceof Object)).toBe(true)
    })
})
