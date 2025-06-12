import { ifClass, IIfClass, newIFClass } from './if-class'

describe('if-class utilities', () => {
    describe('newIFClass', () => {
        it('should create IIfClass object with provided values', () => {
            const result = newIFClass('test-class', true)

            expect(result).toEqual({
                classN: 'test-class',
                addIf: true
            })
        })

        it('should create IIfClass object with undefined addIf when not provided', () => {
            const result = newIFClass('test-class')

            expect(result).toEqual({
                classN: 'test-class',
                addIf: undefined
            })
        })

        it('should handle empty class name', () => {
            const result = newIFClass('', true)

            expect(result).toEqual({
                classN: '',
                addIf: true
            })
        })

        it('should handle false addIf value', () => {
            const result = newIFClass('test-class', false)

            expect(result).toEqual({
                classN: 'test-class',
                addIf: false
            })
        })
    })

    describe('ifClass', () => {
        it('should return empty string for empty array', () => {
            expect(ifClass([])).toBe('')
        })

        it('should include classes when addIf is true', () => {
            const classes: IIfClass[] = [
                { classN: 'class1', addIf: true },
                { classN: 'class2', addIf: true },
                { classN: 'class3', addIf: true }
            ]

            expect(ifClass(classes)).toBe('class1 class2 class3')
        })

        it('should exclude classes when addIf is false', () => {
            const classes: IIfClass[] = [
                { classN: 'class1', addIf: true },
                { classN: 'class2', addIf: false },
                { classN: 'class3', addIf: true }
            ]

            expect(ifClass(classes)).toBe('class1 class3')
        })

        it('should exclude classes when addIf is undefined', () => {
            const classes: IIfClass[] = [
                { classN: 'class1', addIf: true },
                { classN: 'class2', addIf: undefined },
                { classN: 'class3', addIf: true }
            ]

            expect(ifClass(classes)).toBe('class1 class3')
        })

        it('should filter out null and undefined objects', () => {
            const classes: IIfClass[] = [
                { classN: 'class1', addIf: true },
                null as any,
                { classN: 'class2', addIf: true },
                undefined as any,
                { classN: 'class3', addIf: true }
            ]

            expect(ifClass(classes)).toBe('class1 class2 class3')
        })

        it('should handle single class', () => {
            const classes: IIfClass[] = [{ classN: 'single-class', addIf: true }]

            expect(ifClass(classes)).toBe('single-class')
        })

        it('should return empty string when all classes are excluded', () => {
            const classes: IIfClass[] = [
                { classN: 'class1', addIf: false },
                { classN: 'class2', addIf: false },
                { classN: 'class3', addIf: undefined }
            ]

            expect(ifClass(classes)).toBe('')
        })

        it('should work with newIFClass helper', () => {
            const classes = [
                newIFClass('btn', true),
                newIFClass('btn-primary', true),
                newIFClass('btn-disabled', false),
                newIFClass('btn-large', true)
            ]

            expect(ifClass(classes)).toBe('btn btn-primary btn-large')
        })

        it('should handle empty class names', () => {
            const classes: IIfClass[] = [
                { classN: '', addIf: true },
                { classN: 'valid-class', addIf: true },
                { classN: '', addIf: true }
            ]

            expect(ifClass(classes)).toBe(' valid-class ')
        })

        it('should preserve class names with special characters', () => {
            const classes: IIfClass[] = [
                { classN: 'btn-primary', addIf: true },
                { classN: 'btn_secondary', addIf: true },
                { classN: 'btn:hover', addIf: true },
                { classN: 'btn.active', addIf: true }
            ]

            expect(ifClass(classes)).toBe('btn-primary btn_secondary btn:hover btn.active')
        })

        it('should be useful for conditional CSS classes', () => {
            const isActive = true
            const isDisabled = false
            const isLoading = true
            const hasError = false

            const classes = [
                newIFClass('button', true),
                newIFClass('active', isActive),
                newIFClass('disabled', isDisabled),
                newIFClass('loading', isLoading),
                newIFClass('error', hasError)
            ]

            expect(ifClass(classes)).toBe('button active loading')
        })

        it('should handle complex conditional logic', () => {
            const theme = 'dark'
            const size = 'large'
            const variant = 'primary'
            const state = { active: true, disabled: false, loading: false }

            const classes = [
                newIFClass('btn', true),
                newIFClass(`btn-${variant}`, variant !== undefined),
                newIFClass(`btn-${size}`, size === 'large' || size === 'small'),
                newIFClass(`theme-${theme}`, theme === 'dark' || theme === 'light'),
                newIFClass('active', state.active),
                newIFClass('disabled', state.disabled),
                newIFClass('loading', state.loading)
            ]

            expect(ifClass(classes)).toBe('btn btn-primary btn-large theme-dark active')
        })

        it('should handle truthy/falsy values correctly', () => {
            const classes: IIfClass[] = [
                { classN: 'class1', addIf: true },
                { classN: 'class2', addIf: false },
                { classN: 'class3', addIf: 1 as any }, // truthy
                { classN: 'class4', addIf: 0 as any }, // falsy
                { classN: 'class5', addIf: 'string' as any }, // truthy
                { classN: 'class6', addIf: '' as any }, // falsy
                { classN: 'class7', addIf: {} as any }, // truthy
                { classN: 'class8', addIf: null as any } // falsy
            ]

            expect(ifClass(classes)).toBe('class1 class3 class5 class7')
        })

        it('should work with functional programming patterns', () => {
            const conditions = [
                { name: 'btn', condition: true },
                { name: 'primary', condition: true },
                { name: 'disabled', condition: false },
                { name: 'large', condition: true }
            ]

            const classes = conditions.map(({ name, condition }) => newIFClass(name, condition))

            expect(ifClass(classes)).toBe('btn primary large')
        })
    })
})
