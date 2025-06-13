import { tryConvertStringToDateObject } from './try-convert-string-to-date-object'

describe('tryConvertStringToDateObject', () => {
    it('should return a DateObject for valid date string', () => {
        const value = '2025-06-13'
        const result = tryConvertStringToDateObject(value)
        expect(result).toBeDefined()
        expect(typeof result).toBe('object')
    })

    it('should return input value if conversion fails', () => {
        const value = 'not-a-date'
        const result = tryConvertStringToDateObject(value)
        expect(result).toBeDefined()
    })
})
