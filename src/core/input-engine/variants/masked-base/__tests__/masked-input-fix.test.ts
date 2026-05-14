import { processMaskedValue } from '../core/process-masked-value'

describe('Masked Input Fix Tests', () => {
    describe('processMaskedValue', () => {
        it('should handle progressive date input without resetting', () => {
            const mask = '##/##/####'

            // Test progressive input - each step should build on the previous
            expect(processMaskedValue(mask, '')).toBe('')
            expect(processMaskedValue(mask, '1')).toBe('1')
            expect(processMaskedValue(mask, '12')).toBe('12')
            expect(processMaskedValue(mask, '123')).toBe('12/3')
            expect(processMaskedValue(mask, '1234')).toBe('12/34')
            expect(processMaskedValue(mask, '12345')).toBe('12/34/5')
            expect(processMaskedValue(mask, '123456')).toBe('12/34/56')
            expect(processMaskedValue(mask, '1234567')).toBe('12/34/567')
            expect(processMaskedValue(mask, '12345678')).toBe('12/34/5678')
        })

        it('should handle invalid dates during typing', () => {
            const mask = '##/##/####'

            // Test typing an invalid date like 12/34/2024
            expect(processMaskedValue(mask, '1')).toBe('1')
            expect(processMaskedValue(mask, '12')).toBe('12')
            expect(processMaskedValue(mask, '123')).toBe('12/3')
            expect(processMaskedValue(mask, '1234')).toBe('12/34')
            expect(processMaskedValue(mask, '12342')).toBe('12/34/2')
            expect(processMaskedValue(mask, '123420')).toBe('12/34/20')
            expect(processMaskedValue(mask, '1234202')).toBe('12/34/202')
            expect(processMaskedValue(mask, '12342024')).toBe('12/34/2024')
        })

        it('should handle extra characters gracefully', () => {
            const mask = '##/##/####'

            // Test input longer than mask
            expect(processMaskedValue(mask, '123456789012')).toBe('12/34/5678')
        })

        it('should filter out non-numeric characters', () => {
            const mask = '##/##/####'

            // Test input with non-numeric characters
            expect(processMaskedValue(mask, '12abc34def5678')).toBe('12/34/5678')
            expect(processMaskedValue(mask, '1a2b3c4d5e6f7g8h')).toBe('12/34/5678')
        })
    })

    describe('Date input behavior', () => {
        it('should preserve partial input during typing', () => {
            // This test simulates the behavior we fixed
            const testValues = [
                { input: '1', expected: '1', shouldNotReset: true },
                { input: '12', expected: '12', shouldNotReset: true },
                { input: '123', expected: '12/3', shouldNotReset: true },
                { input: '1234', expected: '12/34', shouldNotReset: true },
                { input: '12345', expected: '12/34/5', shouldNotReset: true },
                { input: '123456', expected: '12/34/56', shouldNotReset: true },
                { input: '1234567', expected: '12/34/567', shouldNotReset: true },
                { input: '12345678', expected: '12/34/5678', shouldNotReset: true },
                // This one was causing the reset before our fix
                { input: '12342024', expected: '12/34/2024', shouldNotReset: true }
            ]

            testValues.forEach(({ input, expected, shouldNotReset }) => {
                const result = processMaskedValue('##/##/####', input)
                expect(result).toBe(expected)
                expect(result).not.toBe('') // Should never reset to empty
                if (shouldNotReset) {
                    expect(result.length).toBeGreaterThan(0)
                }
            })
        })
    })
})
