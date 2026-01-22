import { processMaskedValue } from '../core/process-masked-value'

describe('processMaskedValue', () => {
    it('should format date input correctly', () => {
        const mask = '##/##/####'

        // Test progressive input
        expect(processMaskedValue(mask, '')).toBe('')
        expect(processMaskedValue(mask, '1')).toBe('1')
        expect(processMaskedValue(mask, '12')).toBe('12')
        expect(processMaskedValue(mask, '123')).toBe('12/3')
        expect(processMaskedValue(mask, '1234')).toBe('12/34')
        expect(processMaskedValue(mask, '12345')).toBe('12/34/5')
        expect(processMaskedValue(mask, '12345678')).toBe('12/34/5678')
    })

    it('should handle incomplete input gracefully', () => {
        const mask = '##/##/####'

        expect(processMaskedValue(mask, '1')).toBe('1')
        expect(processMaskedValue(mask, '12')).toBe('12')
        expect(processMaskedValue(mask, '123')).toBe('12/3')
    })

    it('should ignore non-numeric characters in input', () => {
        const mask = '##/##/####'

        // Input already contains separators - should extract only numbers
        expect(processMaskedValue(mask, '12/34/5678')).toBe('12/34/5678')
        expect(processMaskedValue(mask, '12abc34def5678')).toBe('12/34/5678')
    })

    it('should handle empty or null input', () => {
        const mask = '##/##/####'

        expect(processMaskedValue(mask, '')).toBe('')
        expect(processMaskedValue(mask, null as any)).toBe('')
        expect(processMaskedValue(mask, undefined as any)).toBe('')
    })

    it('should work with different mask patterns', () => {
        // Phone number mask
        const phoneMask = '(###) ###-####'
        expect(processMaskedValue(phoneMask, '1234567890')).toBe('(123) 456-7890')

        // SSN mask
        const ssnMask = '###-##-####'
        expect(processMaskedValue(ssnMask, '123456789')).toBe('123-45-6789')
    })

    it('should stop processing when mask is complete', () => {
        const mask = '##/##/####'

        // More digits than mask allows should be truncated
        expect(processMaskedValue(mask, '123456789012')).toBe('12/34/5678')
    })
})
