import { isBigInt } from '@core/framework/utility/is-bigint'

describe('isBigInt', () => {
    it('should return true for BigInt values', () => {
        expect(isBigInt(BigInt(0))).toBe(true)
        expect(isBigInt(BigInt(1))).toBe(true)
        expect(isBigInt(BigInt(-1))).toBe(true)
        expect(isBigInt(BigInt(123456789))).toBe(true)
        expect(isBigInt(BigInt('123456789'))).toBe(true)
        expect(isBigInt(BigInt('0x1fffffffffffff'))).toBe(true)
        expect(isBigInt(BigInt('0b11111111111111111111111111111111'))).toBe(true)
        expect(isBigInt(BigInt('0o777777777777777777'))).toBe(true)
    })

    it('should return true for BigInt literals', () => {
        expect(isBigInt(0n)).toBe(true)
        expect(isBigInt(1n)).toBe(true)
        expect(isBigInt(-1n)).toBe(true)
        expect(isBigInt(123456789n)).toBe(true)
        expect(isBigInt(9007199254740991n)).toBe(true) // Number.MAX_SAFE_INTEGER as BigInt
        expect(isBigInt(0x1fffffffffffffn)).toBe(true)
        expect(isBigInt(0b11111111111111111111111111111111n)).toBe(true)
        expect(isBigInt(0o777777777777777777n)).toBe(true)
    })

    it('should return false for non-BigInt values', () => {
        expect(isBigInt(null)).toBe(false)
        expect(isBigInt(undefined)).toBe(false)
        expect(isBigInt(0)).toBe(false)
        expect(isBigInt(1)).toBe(false)
        expect(isBigInt(-1)).toBe(false)
        expect(isBigInt(123456789)).toBe(false)
        expect(isBigInt(NaN)).toBe(false)
        expect(isBigInt(Infinity)).toBe(false)
        expect(isBigInt(-Infinity)).toBe(false)
        expect(isBigInt(true)).toBe(false)
        expect(isBigInt(false)).toBe(false)
        expect(isBigInt('')).toBe(false)
        expect(isBigInt('123')).toBe(false)
        expect(isBigInt('123n')).toBe(false)
        expect(isBigInt({})).toBe(false)
        expect(isBigInt([])).toBe(false)
        expect(isBigInt(() => {})).toBe(false)
        expect(isBigInt(Symbol('test'))).toBe(false)
        expect(isBigInt(new Date())).toBe(false)
        expect(isBigInt(/regex/)).toBe(false)
    })

    it('should return false for number strings that could be BigInt', () => {
        expect(isBigInt('0')).toBe(false)
        expect(isBigInt('123')).toBe(false)
        expect(isBigInt('-123')).toBe(false)
        expect(isBigInt('9007199254740991')).toBe(false)
        expect(isBigInt('0x1fffffffffffff')).toBe(false)
        expect(isBigInt('0b11111111111111111111111111111111')).toBe(false)
        expect(isBigInt('0o777777777777777777')).toBe(false)
    })

    it('should handle edge cases', () => {
        expect(isBigInt()).toBe(false) // no argument
        expect(isBigInt(void 0)).toBe(false)

        // BigInt from number conversion
        expect(isBigInt(BigInt(Number.MAX_SAFE_INTEGER))).toBe(true)
        expect(isBigInt(BigInt(0))).toBe(true)
    })

    it('should work with large BigInt values', () => {
        const largeBigInt = BigInt('123456789012345678901234567890')
        expect(isBigInt(largeBigInt)).toBe(true)

        const veryLargeBigInt = BigInt('9'.repeat(100))
        expect(isBigInt(veryLargeBigInt)).toBe(true)

        // BigInt operations result in BigInt
        expect(isBigInt(1n + 2n)).toBe(true)
        expect(isBigInt(10n * 20n)).toBe(true)
        expect(isBigInt(100n - 50n)).toBe(true)
        expect(isBigInt(2n ** 100n)).toBe(true)
    })

    it('should distinguish BigInt from Number', () => {
        expect(isBigInt(123)).toBe(false)
        expect(isBigInt(123n)).toBe(true)
        expect(isBigInt(Number.MAX_SAFE_INTEGER)).toBe(false)
        expect(isBigInt(BigInt(Number.MAX_SAFE_INTEGER))).toBe(true)
        expect(isBigInt(0)).toBe(false)
        expect(isBigInt(0n)).toBe(true)
    })

    it('should work with BigInt conversion methods', () => {
        expect(isBigInt(BigInt(123))).toBe(true)
        expect(isBigInt(BigInt('456'))).toBe(true)
        expect(isBigInt(BigInt(true))).toBe(true) // BigInt(true) = 1n
        expect(isBigInt(BigInt(false))).toBe(true) // BigInt(false) = 0n

        // These would throw errors, so we don't test them:
        // BigInt(null), BigInt(undefined), BigInt('invalid'), BigInt(1.5)
    })

    it('should be useful for type guards', () => {
        const checkBigIntType = (value: unknown): value is bigint => {
            return isBigInt(value)
        }

        const mixedArray = [123, 123n, '123', BigInt(456), 0, 0n, null, undefined]
        const bigints = mixedArray.filter(checkBigIntType)
        expect(bigints).toHaveLength(3) // 123n, BigInt(456), 0n
        expect(bigints.every((val) => typeof val === 'bigint')).toBe(true)
    })

    it('should handle BigInt arithmetic results', () => {
        const a = 123n
        const b = 456n
        expect(isBigInt(a + b)).toBe(true)
        expect(isBigInt(a - b)).toBe(true)
        expect(isBigInt(a * b)).toBe(true)
        expect(isBigInt(a / b)).toBe(true)
        expect(isBigInt(a % b)).toBe(true)
        expect(isBigInt(a ** 2n)).toBe(true)
        expect(isBigInt(-a)).toBe(true)
        // Note: unary plus (+) is not supported on BigInt
    })

    it('should handle BigInt with Object wrapper', () => {
        // BigInt doesn't have an Object wrapper like Number or String in the same way
        // Object(123n) returns a BigInt object, but typeof is 'object', not 'bigint'
        expect(isBigInt(Object(123n))).toBe(false)
    })
})
