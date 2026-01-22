import { isFunction } from '@core/framework/utility/is-function'

describe('isFunction', () => {
    it('should return true for function values', () => {
        expect(isFunction(function () {})).toBe(true)
        expect(isFunction(() => {})).toBe(true)
        expect(isFunction(async function () {})).toBe(true)
        expect(isFunction(async () => {})).toBe(true)
        expect(isFunction(function* generator() {})).toBe(true)
        expect(isFunction(async function* asyncGenerator() {})).toBe(true)
        expect(isFunction(Math.max)).toBe(true)
        expect(isFunction(console.log)).toBe(true)
        expect(isFunction(Array.isArray)).toBe(true)
        expect(isFunction(Object.keys)).toBe(true)
        expect(isFunction(JSON.parse)).toBe(true)
        expect(isFunction(parseInt)).toBe(true)
        expect(isFunction(parseFloat)).toBe(true)
        expect(isFunction(isNaN)).toBe(true)
        expect(isFunction(isFinite)).toBe(true)
    })

    it('should return true for constructor functions', () => {
        expect(isFunction(Array)).toBe(true)
        expect(isFunction(Object)).toBe(true)
        expect(isFunction(Date)).toBe(true)
        expect(isFunction(RegExp)).toBe(true)
        expect(isFunction(Function)).toBe(true)
        expect(isFunction(String)).toBe(true)
        expect(isFunction(Number)).toBe(true)
        expect(isFunction(Boolean)).toBe(true)

        class TestClass {}
        expect(isFunction(TestClass)).toBe(true)

        function TestFunction() {}
        expect(isFunction(TestFunction)).toBe(true)
    })

    it('should return true for methods', () => {
        const obj = {
            method() {
                return 'test'
            },
            asyncMethod: async () => 'test',
            arrowMethod: () => 'test'
        }

        expect(isFunction(obj.method)).toBe(true)
        expect(isFunction(obj.asyncMethod)).toBe(true)
        expect(isFunction(obj.arrowMethod)).toBe(true)

        const arr = [1, 2, 3]
        expect(isFunction(arr.push)).toBe(true)
        expect(isFunction(arr.map)).toBe(true)
        expect(isFunction(arr.filter)).toBe(true)
    })

    it('should return false for non-function values', () => {
        expect(isFunction(null)).toBe(false)
        expect(isFunction(undefined)).toBe(false)
        expect(isFunction(0)).toBe(false)
        expect(isFunction(1)).toBe(false)
        expect(isFunction(-1)).toBe(false)
        expect(isFunction(NaN)).toBe(false)
        expect(isFunction(Infinity)).toBe(false)
        expect(isFunction(true)).toBe(false)
        expect(isFunction(false)).toBe(false)
        expect(isFunction('')).toBe(false)
        expect(isFunction('function')).toBe(false)
        expect(isFunction('() => {}')).toBe(false)
        expect(isFunction({})).toBe(false)
        expect(isFunction([])).toBe(false)
        expect(isFunction(Symbol('test'))).toBe(false)
        expect(isFunction(BigInt(123))).toBe(false)
        expect(isFunction(new Date())).toBe(false)
        expect(isFunction(/regex/)).toBe(false)
    })

    it('should handle edge cases', () => {
        expect(isFunction()).toBe(false) // no argument
        expect(isFunction(void 0)).toBe(false)

        // Function created from string
        const dynamicFunc = new Function('return 42')
        expect(isFunction(dynamicFunc)).toBe(true)

        // Bound functions
        const boundFunc = Math.max.bind(null)
        expect(isFunction(boundFunc)).toBe(true)

        // Function properties
        const funcWithProps = function () {}
        funcWithProps.customProp = 'test'
        expect(isFunction(funcWithProps)).toBe(true)
        expect(isFunction(funcWithProps.customProp)).toBe(false)
    })

    it('should work with callable objects', () => {
        // In JavaScript, only functions are callable
        const callable = {
            call: function () {
                return 'test'
            }
        }
        expect(isFunction(callable)).toBe(false)
        expect(isFunction(callable.call)).toBe(true)
    })

    it('should distinguish between functions and function-like strings', () => {
        expect(isFunction('function() {}')).toBe(false)
        expect(isFunction('() => {}')).toBe(false)
        expect(isFunction('async function() {}')).toBe(false)
        expect(isFunction(eval('() => {}'))).toBe(true) // Actually creates a function
    })
})
