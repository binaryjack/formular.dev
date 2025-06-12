import { capitalizeFirstLetter } from './capitalize-first-letter'

describe('capitalizeFirstLetter', () => {
    it('should capitalize the first letter of a single word', () => {
        expect(capitalizeFirstLetter('hello')).toBe('Hello')
        expect(capitalizeFirstLetter('world')).toBe('World')
        expect(capitalizeFirstLetter('test')).toBe('Test')
    })

    it('should capitalize the first letter of each word in a multi-word string', () => {
        expect(capitalizeFirstLetter('hello world')).toBe('Hello World')
        expect(capitalizeFirstLetter('react typescript')).toBe('React Typescript')
        expect(capitalizeFirstLetter('multiple word string')).toBe('Multiple Word String')
    })

    it('should handle already capitalized words', () => {
        expect(capitalizeFirstLetter('Hello')).toBe('Hello')
        expect(capitalizeFirstLetter('WORLD')).toBe('WORLD')
        expect(capitalizeFirstLetter('Hello World')).toBe('Hello World')
    })

    it('should handle mixed case words', () => {
        expect(capitalizeFirstLetter('hELLO')).toBe('HELLO')
        expect(capitalizeFirstLetter('wOrLd')).toBe('WOrLd')
        expect(capitalizeFirstLetter('tEsT cAsE')).toBe('TEsT CAsE')
    })

    it('should handle empty strings and single characters', () => {
        expect(capitalizeFirstLetter('')).toBe('')
        expect(capitalizeFirstLetter('a')).toBe('A')
        expect(capitalizeFirstLetter('A')).toBe('A')
        expect(capitalizeFirstLetter('z')).toBe('Z')
    })

    it('should handle strings with numbers and special characters', () => {
        expect(capitalizeFirstLetter('hello123')).toBe('Hello123')
        expect(capitalizeFirstLetter('test-case')).toBe('Test-Case')
        expect(capitalizeFirstLetter('hello_world')).toBe('Hello_world') // underscore is part of word
        expect(capitalizeFirstLetter('react.js')).toBe('React.Js')
        expect(capitalizeFirstLetter('123abc')).toBe('123abc')
    })

    it('should handle strings with multiple spaces', () => {
        expect(capitalizeFirstLetter('hello  world')).toBe('Hello  World')
        expect(capitalizeFirstLetter('  hello world  ')).toBe('  Hello World  ')
        expect(capitalizeFirstLetter('multiple   spaces   between')).toBe(
            'Multiple   Spaces   Between'
        )
    })

    it('should handle strings with punctuation', () => {
        expect(capitalizeFirstLetter('hello, world!')).toBe('Hello, World!')
        expect(capitalizeFirstLetter('react & typescript')).toBe('React & Typescript')
        expect(capitalizeFirstLetter('question?')).toBe('Question?')
        expect(capitalizeFirstLetter('exclamation!')).toBe('Exclamation!')
    })

    it('should handle strings with tabs and newlines', () => {
        expect(capitalizeFirstLetter('hello\tworld')).toBe('Hello\tWorld')
        expect(capitalizeFirstLetter('hello\nworld')).toBe('Hello\nWorld')
        expect(capitalizeFirstLetter('multiple\r\nlines')).toBe('Multiple\r\nLines')
    })

    it('should handle edge cases', () => {
        expect(capitalizeFirstLetter('   ')).toBe('   ')
        expect(capitalizeFirstLetter('123')).toBe('123')
        expect(capitalizeFirstLetter('!@#$%')).toBe('!@#$%')
        expect(capitalizeFirstLetter('中文')).toBe('中文')
        expect(capitalizeFirstLetter('émotions')).toBe('éMotions') // accented chars handled differently
    })
})
