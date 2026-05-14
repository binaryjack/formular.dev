import { tryConvertINDateToDateObject } from '@core/framework/converters/try-convert-in-date-to-date-object'

describe('tryConvertINDateToDateObject', () => {
    it('should return a DateObject for valid INDate', () => {
        const value = { year: 2024, month: 6, day: 13 }
        const result = tryConvertINDateToDateObject(value)
        expect(result).toBeDefined()
        expect(typeof result).toBe('object')
    })

    it('should return input value if conversion fails', () => {
        const value = null
        const result = tryConvertINDateToDateObject(value)
        expect(result).toBe(value)
    })
})
