import { isNullEmptyOrUndefined } from '@core/framework/utility/is-null-empty-or-undefined'

describe('isNullEmptyOrUndefined', () => {
    it('should return true for null values', () => {
        expect(isNullEmptyOrUndefined(null)).toBe(true)
    })

    it('should return true for undefined values', () => {
        expect(isNullEmptyOrUndefined(undefined)).toBe(true)
        expect(isNullEmptyOrUndefined(void 0)).toBe(true)
        expect(isNullEmptyOrUndefined()).toBe(true) // no argument = undefined
    })

    it('should return true for empty strings', () => {
        expect(isNullEmptyOrUndefined('')).toBe(true)
    })

    it('should return false for whitespace strings', () => {
        expect(isNullEmptyOrUndefined(' ')).toBe(false)
        expect(isNullEmptyOrUndefined('  ')).toBe(false)
        expect(isNullEmptyOrUndefined('\t')).toBe(false)
        expect(isNullEmptyOrUndefined('\n')).toBe(false)
        expect(isNullEmptyOrUndefined('\r')).toBe(false)
        expect(isNullEmptyOrUndefined('\r\n')).toBe(false)
        expect(isNullEmptyOrUndefined(' \t\n\r ')).toBe(false)
    })

    it('should return false for non-empty strings', () => {
        expect(isNullEmptyOrUndefined('test')).toBe(false)
        expect(isNullEmptyOrUndefined('hello world')).toBe(false)
        expect(isNullEmptyOrUndefined('0')).toBe(false)
        expect(isNullEmptyOrUndefined('false')).toBe(false)
        expect(isNullEmptyOrUndefined('null')).toBe(false)
        expect(isNullEmptyOrUndefined('undefined')).toBe(false)
        expect(isNullEmptyOrUndefined('NaN')).toBe(false)
    })

    it('should return false for other falsy values that are not null, undefined, or empty string', () => {
        expect(isNullEmptyOrUndefined(false)).toBe(false)
        expect(isNullEmptyOrUndefined(0)).toBe(false)
        expect(isNullEmptyOrUndefined(-0)).toBe(false)
        expect(isNullEmptyOrUndefined(NaN)).toBe(false)
        expect(isNullEmptyOrUndefined(BigInt(0))).toBe(false)
    })

    it('should return false for truthy values', () => {
        expect(isNullEmptyOrUndefined(true)).toBe(false)
        expect(isNullEmptyOrUndefined(1)).toBe(false)
        expect(isNullEmptyOrUndefined(-1)).toBe(false)
        expect(isNullEmptyOrUndefined('test')).toBe(false)
        expect(isNullEmptyOrUndefined({})).toBe(false)
        expect(isNullEmptyOrUndefined([])).toBe(false)
        expect(isNullEmptyOrUndefined(() => {})).toBe(false)
        expect(isNullEmptyOrUndefined(Symbol('test'))).toBe(false)
        expect(isNullEmptyOrUndefined(new Date())).toBe(false)
        expect(isNullEmptyOrUndefined(/regex/)).toBe(false)
        expect(isNullEmptyOrUndefined(Infinity)).toBe(false)
        expect(isNullEmptyOrUndefined(-Infinity)).toBe(false)
    })

    it('should handle object properties that are null, undefined, or empty', () => {
        const obj = {
            a: null,
            b: undefined,
            c: '',
            d: 'value',
            e: ' ',
            f: 0,
            g: false
        }

        expect(isNullEmptyOrUndefined(obj.a)).toBe(true)
        expect(isNullEmptyOrUndefined(obj.b)).toBe(true)
        expect(isNullEmptyOrUndefined(obj.c)).toBe(true)
        expect(isNullEmptyOrUndefined(obj.d)).toBe(false)
        expect(isNullEmptyOrUndefined(obj.e)).toBe(false) // whitespace
        expect(isNullEmptyOrUndefined(obj.f)).toBe(false) // 0
        expect(isNullEmptyOrUndefined(obj.g)).toBe(false) // false
        expect(isNullEmptyOrUndefined((obj as any).nonexistent)).toBe(true) // undefined property
    })

    it('should handle array elements', () => {
        const arr = [null, undefined, '', 'value', ' ', 0, false, NaN]

        expect(isNullEmptyOrUndefined(arr[0])).toBe(true) // null
        expect(isNullEmptyOrUndefined(arr[1])).toBe(true) // undefined
        expect(isNullEmptyOrUndefined(arr[2])).toBe(true) // ''
        expect(isNullEmptyOrUndefined(arr[3])).toBe(false) // 'value'
        expect(isNullEmptyOrUndefined(arr[4])).toBe(false) // ' '
        expect(isNullEmptyOrUndefined(arr[5])).toBe(false) // 0
        expect(isNullEmptyOrUndefined(arr[6])).toBe(false) // false
        expect(isNullEmptyOrUndefined(arr[7])).toBe(false) // NaN
        expect(isNullEmptyOrUndefined(arr[10])).toBe(true) // out of bounds = undefined
    })

    it('should be useful for form validation', () => {
        const validateRequired = (value: unknown): boolean => {
            return !isNullEmptyOrUndefined(value)
        }

        // Invalid inputs
        expect(validateRequired(null)).toBe(false)
        expect(validateRequired(undefined)).toBe(false)
        expect(validateRequired('')).toBe(false)

        // Valid inputs
        expect(validateRequired('valid input')).toBe(true)
        expect(validateRequired(' ')).toBe(true) // whitespace is considered valid
        expect(validateRequired(0)).toBe(true) // 0 is valid
        expect(validateRequired(false)).toBe(true) // false is valid
    })

    it('should handle string manipulation results', () => {
        expect(isNullEmptyOrUndefined('' + '')).toBe(true)
        expect(isNullEmptyOrUndefined(''.repeat(0))).toBe(true)
        expect(isNullEmptyOrUndefined('test'.substring(0, 0))).toBe(true)
        expect(isNullEmptyOrUndefined('test'.slice(0, 0))).toBe(true)

        expect(isNullEmptyOrUndefined('a' + 'b')).toBe(false)
        expect(isNullEmptyOrUndefined('x'.repeat(1))).toBe(false)
        expect(isNullEmptyOrUndefined('test'.substring(0, 1))).toBe(false)
    })

    it('should handle type coercion edge cases', () => {
        expect(isNullEmptyOrUndefined(String())).toBe(true) // String() = ''
        expect(isNullEmptyOrUndefined(String(''))).toBe(true)
        expect(isNullEmptyOrUndefined(String(null))).toBe(false) // String(null) = 'null'
        expect(isNullEmptyOrUndefined(String(undefined))).toBe(false) // String(undefined) = 'undefined'
    })

    it('should work with template literals', () => {
        expect(isNullEmptyOrUndefined(``)).toBe(true)
        expect(isNullEmptyOrUndefined(`${''}`)).toBe(true)
        expect(isNullEmptyOrUndefined(`test`)).toBe(false)
        expect(isNullEmptyOrUndefined(`${null}`)).toBe(false) // becomes 'null'
        expect(isNullEmptyOrUndefined(`${undefined}`)).toBe(false) // becomes 'undefined'
    })
})
