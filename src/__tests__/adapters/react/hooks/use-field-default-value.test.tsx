import { useFieldDefaultValue } from '@adapters/react/hooks/use-field-default-value'
import { renderHook } from '@testing-library/react'

describe('useFieldDefaultValue', () => {
    const setValue = jest.fn()
    const getValue = jest.fn()
    const valueManager = { setValue, getValue }
    const defaultValue = 'default-val'
    const field = {
        input: {
            defaultValue,
            valueManager
        }
    } as any

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should set the default value using valueManager', () => {
        renderHook(() => useFieldDefaultValue(field))
        expect(setValue).toHaveBeenCalledWith(field, defaultValue)
    })

    it('should call the action callback with default value and deps', () => {
        const action = jest.fn()
        const deps = [defaultValue, 1]
        renderHook(() => useFieldDefaultValue(field, action, deps))
        expect(action).toHaveBeenCalledWith(defaultValue, ...deps)
    })

    it('should not throw if field is undefined', () => {
        expect(() => {
            renderHook(() => useFieldDefaultValue(undefined))
        }).not.toThrow()
    })

    it('should allow falsy default values', () => {
        const falsyField = {
            input: {
                defaultValue: 0,
                valueManager
            }
        } as any
        renderHook(() => useFieldDefaultValue(falsyField))
        expect(setValue).toHaveBeenCalledWith(falsyField, 0)
    })
})
