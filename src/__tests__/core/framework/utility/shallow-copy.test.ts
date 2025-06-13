import { shallowCopy } from '@core/framework/utility/shallow-copy'

describe('shallowCopy', () => {
    it('should create a shallow copy of a simple object', () => {
        const original = { a: 1, b: 'test', c: true }
        const copy = shallowCopy(original)

        expect(copy).toEqual(original)
        expect(copy).not.toBe(original)
        expect(copy.a).toBe(original.a)
        expect(copy.b).toBe(original.b)
        expect(copy.c).toBe(original.c)
    })

    it('should maintain prototype chain', () => {
        class TestClass {
            constructor(public value: number) {}
            getValue() {
                return this.value
            }
        }

        const original = new TestClass(42)
        const copy = shallowCopy(original)

        expect(copy).toBeInstanceOf(TestClass)
        expect(copy.getValue()).toBe(42)
        expect(copy.value).toBe(original.value)
        expect(copy).not.toBe(original)
        expect(Object.getPrototypeOf(copy)).toBe(Object.getPrototypeOf(original))
    })

    it('should copy all enumerable properties', () => {
        const original = { a: 1, b: 2 }
        Object.defineProperty(original, 'hidden', {
            value: 'secret',
            enumerable: false
        })

        const copy = shallowCopy(original)

        expect(copy.a).toBe(1)
        expect(copy.b).toBe(2)
        expect((copy as any).hidden).toBe('secret') // Object.assign copies non-enumerable properties too
    })

    it('should perform shallow copy (not deep)', () => {
        const nested = { inner: 'value' }
        const original = {
            primitive: 1,
            nested: nested,
            array: [1, 2, 3]
        }

        const copy = shallowCopy(original)

        expect(copy).not.toBe(original)
        expect(copy.primitive).toBe(original.primitive)
        expect(copy.nested).toBe(original.nested) // Same reference
        expect(copy.array).toBe(original.array) // Same reference

        // Modifying nested object affects both
        copy.nested.inner = 'modified'
        expect(original.nested.inner).toBe('modified')
    })

    it('should work with arrays', () => {
        const original = [1, 2, { a: 3 }]
        const copy = shallowCopy(original)

        expect(copy).toEqual(original)
        expect(copy).not.toBe(original)
        expect(copy[0]).toBe(original[0])
        expect(copy[1]).toBe(original[1])
        expect(copy[2]).toBe(original[2]) // Same reference to object
    })

    it('should work with primitive values', () => {
        expect(shallowCopy(42)).toBe(42)
        expect(shallowCopy('test')).toBe('test')
        expect(shallowCopy(true)).toBe(true)
        expect(shallowCopy(null)).toBe(null)
        expect(shallowCopy(undefined)).toBe(undefined)
    })

    it('should work with functions', () => {
        const original = function testFunc() {
            return 'test'
        }
        original.customProp = 'custom'

        const copy = shallowCopy(original)

        expect(copy).not.toBe(original)
        expect(copy()).toBe('test')
        expect(copy.customProp).toBe('custom')
        expect(typeof copy).toBe('function')
    })

    it('should work with Date objects', () => {
        const original = new Date('2023-01-01')
        const copy = shallowCopy(original)

        expect(copy).toBeInstanceOf(Date)
        expect(copy.getTime()).toBe(original.getTime())
        expect(copy).not.toBe(original)
    })

    it('should work with RegExp objects', () => {
        const original = /test/gi
        const copy = shallowCopy(original)

        expect(copy).toBeInstanceOf(RegExp)
        expect(copy.source).toBe(original.source)
        expect(copy.flags).toBe(original.flags)
        expect(copy).not.toBe(original)
    })

    it('should handle objects with getters and setters', () => {
        const original = {
            _value: 42,
            get value() {
                return this._value
            },
            set value(val) {
                this._value = val
            }
        }

        const copy = shallowCopy(original)

        expect(copy.value).toBe(42)
        copy.value = 100
        expect(copy.value).toBe(100)
        expect(original.value).toBe(42) // Original unchanged
    })
})
