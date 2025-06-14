import { valueIsNullOrUndefined } from '@core/framework/utility/value-is-null-or-undefined'

describe('valueIsNullOrUndefined', () => {
    it('should return true for null values', () => {
        expect(valueIsNullOrUndefined(null)).toBe(true)
    })

    it('should return true for undefined values', () => {
        expect(valueIsNullOrUndefined(undefined)).toBe(true)
        expect(valueIsNullOrUndefined(void 0)).toBe(true)
    })

    it('should return false for falsy values that are not null or undefined', () => {
        expect(valueIsNullOrUndefined(false)).toBe(false)
        expect(valueIsNullOrUndefined(0)).toBe(false)
        expect(valueIsNullOrUndefined(-0)).toBe(false)
        expect(valueIsNullOrUndefined('')).toBe(false)
        expect(valueIsNullOrUndefined(NaN)).toBe(false)
        expect(valueIsNullOrUndefined(BigInt(0))).toBe(false)
    })

    it('should return false for truthy values', () => {
        expect(valueIsNullOrUndefined(true)).toBe(false)
        expect(valueIsNullOrUndefined(1)).toBe(false)
        expect(valueIsNullOrUndefined(-1)).toBe(false)
        expect(valueIsNullOrUndefined('test')).toBe(false)
        expect(valueIsNullOrUndefined(' ')).toBe(false)
        expect(valueIsNullOrUndefined('null')).toBe(false)
        expect(valueIsNullOrUndefined('undefined')).toBe(false)
        expect(valueIsNullOrUndefined({})).toBe(false)
        expect(valueIsNullOrUndefined([])).toBe(false)
        expect(valueIsNullOrUndefined(() => {})).toBe(false)
        expect(valueIsNullOrUndefined(Symbol('test'))).toBe(false)
        expect(valueIsNullOrUndefined(new Date())).toBe(false)
        expect(valueIsNullOrUndefined(/regex/)).toBe(false)
        expect(valueIsNullOrUndefined(Infinity)).toBe(false)
        expect(valueIsNullOrUndefined(-Infinity)).toBe(false)
    })

    it('should handle object properties that are null or undefined', () => {
        const obj = { a: null, b: undefined, c: 'value' }
        expect(valueIsNullOrUndefined(obj.a)).toBe(true)
        expect(valueIsNullOrUndefined(obj.b)).toBe(true)
        expect(valueIsNullOrUndefined(obj.c)).toBe(false)
        expect(valueIsNullOrUndefined((obj as any).nonexistent)).toBe(true) // undefined property
    })

    it('should handle array elements that are null or undefined', () => {
        const arr = [null, undefined, 'value', 0, false]
        expect(valueIsNullOrUndefined(arr[0])).toBe(true)
        expect(valueIsNullOrUndefined(arr[1])).toBe(true)
        expect(valueIsNullOrUndefined(arr[2])).toBe(false)
        expect(valueIsNullOrUndefined(arr[3])).toBe(false)
        expect(valueIsNullOrUndefined(arr[4])).toBe(false)
        expect(valueIsNullOrUndefined(arr[10])).toBe(true) // out of bounds = undefined
    })
})
