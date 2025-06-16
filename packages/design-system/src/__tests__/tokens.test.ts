/**
 * Design System Tokens Tests
 */

import { colors, shadows, spacing, typography } from '../tokens'
import { cn, getColor, getSpacing } from '../utilities'

describe('Design Tokens', () => {
    test('colors should be defined', () => {
        expect(colors.primary).toBeDefined()
        expect(colors.primary[500]).toBe('#3b82f6')
    })

    test('spacing should be defined', () => {
        expect(spacing[4]).toBe('1rem')
        expect(spacing[8]).toBe('2rem')
    })

    test('typography should be defined', () => {
        expect(typography.fontSize.base).toBeDefined()
        expect(typography.fontFamily.sans).toBeDefined()
    })

    test('shadows should be defined', () => {
        expect(shadows.md).toBeDefined()
        expect(shadows['field-focus']).toBeDefined()
    })
})

describe('Utilities', () => {
    test('cn should combine classes', () => {
        expect(cn('class1', 'class2')).toBe('class1 class2')
        expect(cn('class1', undefined, 'class3')).toBe('class1 class3')
    })

    test('getColor should return color values', () => {
        expect(getColor('primary', '500')).toBe('#3b82f6')
        expect(getColor('secondary', '600')).toBeDefined()
    })

    test('getSpacing should return spacing values', () => {
        expect(getSpacing(4)).toBe('1rem')
        expect(getSpacing(8)).toBe('2rem')
    })
})
