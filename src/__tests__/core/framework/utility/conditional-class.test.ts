import { conditionalClass } from '@core/framework/utility/conditional-class'

describe('conditionalClass', () => {
    it('should return empty string for empty array', () => {
        expect(conditionalClass([])).toBe('')
    })

    it('should join valid class names with spaces', () => {
        expect(conditionalClass(['class1', 'class2', 'class3'])).toBe('class1 class2 class3')
        expect(conditionalClass(['btn', 'btn-primary', 'large'])).toBe('btn btn-primary large')
        expect(conditionalClass(['single'])).toBe('single')
    })

    it('should filter out null values', () => {
        expect(conditionalClass(['class1', null as any, 'class2'])).toBe('class1 class2')
        expect(conditionalClass([null as any, 'class1', null as any])).toBe('class1')
        expect(conditionalClass([null as any, null as any])).toBe('')
    })

    it('should filter out undefined values', () => {
        expect(conditionalClass(['class1', undefined as any, 'class2'])).toBe('class1 class2')
        expect(conditionalClass([undefined as any, 'class1', undefined as any])).toBe('class1')
        expect(conditionalClass([undefined as any, undefined as any])).toBe('')
    })

    it('should filter out empty strings', () => {
        expect(conditionalClass(['class1', '', 'class2'])).toBe('class1 class2')
        expect(conditionalClass(['', 'class1', ''])).toBe('class1')
        expect(conditionalClass(['', ''])).toBe('')
    })

    it('should filter out falsy values', () => {
        expect(conditionalClass(['class1', false as any, 'class2'])).toBe('class1 class2')
        expect(conditionalClass(['class1', 0 as any, 'class2'])).toBe('class1 class2')
        expect(conditionalClass(['class1', NaN as any, 'class2'])).toBe('class1 class2')
    })

    it('should keep whitespace-only strings', () => {
        expect(conditionalClass(['class1', ' ', 'class2'])).toBe('class1   class2')
        expect(conditionalClass(['class1', '\t', 'class2'])).toBe('class1 \t class2')
        expect(conditionalClass(['class1', '\n', 'class2'])).toBe('class1 \n class2')
    })

    it('should handle mixed valid and invalid values', () => {
        expect(
            conditionalClass([
                'btn',
                null as any,
                'btn-primary',
                undefined as any,
                '',
                'large',
                false as any,
                'active'
            ])
        ).toBe('btn btn-primary large active')
    })

    it('should handle class names with special characters', () => {
        expect(conditionalClass(['btn-primary', 'btn_secondary', 'btn:hover'])).toBe(
            'btn-primary btn_secondary btn:hover'
        )
        expect(conditionalClass(['class.name', 'class@name', 'class#name'])).toBe(
            'class.name class@name class#name'
        )
    })

    it('should handle numbers as strings', () => {
        expect(conditionalClass(['123', '456', '789'])).toBe('123 456 789')
        expect(conditionalClass(['class1', '123', 'class2'])).toBe('class1 123 class2')
    })

    it('should handle CSS class naming conventions', () => {
        expect(conditionalClass(['container', 'mx-auto', 'px-4'])).toBe('container mx-auto px-4')
        expect(conditionalClass(['btn', 'btn--primary', 'btn--large'])).toBe(
            'btn btn--primary btn--large'
        )
        expect(conditionalClass(['is-active', 'has-error', 'was-validated'])).toBe(
            'is-active has-error was-validated'
        )
    })

    it('should handle duplicate class names', () => {
        expect(conditionalClass(['btn', 'btn', 'primary'])).toBe('btn btn primary')
        expect(conditionalClass(['active', 'btn', 'active', 'large'])).toBe(
            'active btn active large'
        )
    })

    it('should be useful for React className generation', () => {
        const baseClass = 'btn'
        const variant = 'primary'
        const size = 'large'
        const isActive = true
        const isDisabled = false

        const result = conditionalClass([
            baseClass,
            `btn-${variant}`,
            `btn-${size}`,
            isActive ? 'active' : (null as any),
            isDisabled ? 'disabled' : (null as any)
        ])

        expect(result).toBe('btn btn-primary btn-large active')
    })

    it('should handle conditional class application', () => {
        const isError = true
        const isSuccess = false
        const isLoading = true

        const result = conditionalClass([
            'form-input',
            isError ? 'error' : (null as any),
            isSuccess ? 'success' : (null as any),
            isLoading ? 'loading' : (null as any)
        ])

        expect(result).toBe('form-input error loading')
    })

    it('should work with computed class names', () => {
        const theme = 'dark'
        const size = 'md'

        const result = conditionalClass([
            'button',
            `theme-${theme}`,
            `size-${size}`,
            theme === 'dark' ? 'text-white' : 'text-black'
        ])

        expect(result).toBe('button theme-dark size-md text-white')
    })
})
