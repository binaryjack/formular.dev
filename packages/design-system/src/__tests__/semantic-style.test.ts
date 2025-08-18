import {
    EnhancedVariantRule,
    SEMANTIC_VISUAL_VARIANT_RULE,
    semanticStyle
} from '../utilities/generic-style'

describe('Semantic Style System', () => {
    test('should create enhanced variant rules with semantic tokens', () => {
        const rule = EnhancedVariantRule('back', 'variant-surface')

        expect(rule).toEqual({
            fov: 'back',
            shade: 'variant-surface',
            isSemantic: true
        })
    })

    test('should create enhanced variant rules with traditional shades', () => {
        const rule = EnhancedVariantRule('fore', 500)

        expect(rule).toEqual({
            fov: 'fore',
            shade: 500,
            isSemantic: false
        })
    })

    test('should have semantic visual variant rules defined', () => {
        expect(SEMANTIC_VISUAL_VARIANT_RULE).toBeDefined()
        expect(SEMANTIC_VISUAL_VARIANT_RULE.solid).toBeDefined()
        expect(SEMANTIC_VISUAL_VARIANT_RULE.outline).toBeDefined()

        // Check that solid variant uses semantic tokens
        const solidRules = SEMANTIC_VISUAL_VARIANT_RULE.solid.rules
        const backRule = solidRules.find(r => r.fov === 'back')
        const foreRule = solidRules.find(r => r.fov === 'fore')

        expect(backRule?.shade).toBe('variant-surface')
        expect(foreRule?.shade).toBe('variant-text-on')
        expect(backRule?.isSemantic).toBe(true)
        expect(foreRule?.isSemantic).toBe(true)
    })

    test('should generate semantic styles for button components', () => {
        const result = semanticStyle({
            componentTypes: ['button'],
            variant: 'primary',
            visualVariant: 'solid'
        })

        expect(result).toBeDefined()
        expect(result.backGround).toBeDefined()
        expect(result.text).toBeDefined()
        expect(result.borders).toBeDefined()

        // Should contain semantic classes
        expect(result.backGround.some(cls => cls.includes('surface-variant'))).toBe(true)
        expect(result.text.some(cls => cls.includes('text-on-variant'))).toBe(true)
    })

    test('should generate semantic styles for different variants', () => {
        const primaryResult = semanticStyle({
            componentTypes: ['button'],
            variant: 'primary',
            visualVariant: 'solid'
        })

        const secondaryResult = semanticStyle({
            componentTypes: ['button'],
            variant: 'secondary',
            visualVariant: 'solid'
        })

        expect(primaryResult.backGround).not.toEqual(secondaryResult.backGround)

        // Should use different variant classes
        expect(primaryResult.backGround.some(cls => cls.includes('primary'))).toBe(true)
        expect(secondaryResult.backGround.some(cls => cls.includes('secondary'))).toBe(true)
    })

    test('should handle outline variant with semantic tokens', () => {
        const result = semanticStyle({
            componentTypes: ['button'],
            variant: 'primary',
            visualVariant: 'outline'
        })

        // Outline should have transparent background and variant text
        expect(result.text.some(cls => cls.includes('text-variant'))).toBe(true)
        expect(result.borders.some(cls => cls.includes('border-variant'))).toBe(true)
    })

    test('should provide fallback for empty component types', () => {
        const result = semanticStyle({
            componentTypes: [],
            variant: 'primary'
        })

        expect(result).toEqual({
            backGround: [],
            borders: [],
            composed: [],
            states: {
                hover: undefined,
                ring: undefined,
                focused: undefined,
                pressed: undefined,
                disabled: undefined,
                errors: undefined
            },
            text: []
        })
    })
})
