import { toPascal } from './to-pascal'

describe('toPascal', () => {
    it('should convert single words to PascalCase', () => {
        expect(toPascal('hello')).toBe('Hello')
        expect(toPascal('world')).toBe('World')
        expect(toPascal('test')).toBe('Test')
        expect(toPascal('javascript')).toBe('Javascript')
        expect(toPascal('typescript')).toBe('Typescript')
    })

    it('should convert multiple words to PascalCase', () => {
        expect(toPascal('hello world')).toBe('Hello World')
        expect(toPascal('react component')).toBe('React Component')
        expect(toPascal('user name field')).toBe('User Name Field')
        expect(toPascal('the quick brown fox')).toBe('The Quick Brown Fox')
    })

    it('should handle already capitalized words', () => {
        expect(toPascal('Hello')).toBe('Hello')
        expect(toPascal('WORLD')).toBe('World')
        expect(toPascal('Hello World')).toBe('Hello World')
        expect(toPascal('HTML CSS JS')).toBe('Html Css Js')
    })

    it('should handle mixed case words', () => {
        expect(toPascal('hELLO')).toBe('Hello')
        expect(toPascal('wOrLd')).toBe('World')
        expect(toPascal('tEsT cAsE')).toBe('Test Case')
        expect(toPascal('javaScript')).toBe('Javascript')
        expect(toPascal('typeScript')).toBe('Typescript')
    })

    it('should handle empty strings and single characters', () => {
        expect(toPascal('')).toBe('')
        expect(toPascal('a')).toBe('A')
        expect(toPascal('A')).toBe('A')
        expect(toPascal('z')).toBe('Z')
    })

    it('should handle words separated by different delimiters', () => {
        expect(toPascal('hello-world')).toBe('Hello-World')
        expect(toPascal('hello_world')).toBe('Hello_world') // underscore is part of word
        expect(toPascal('hello.world')).toBe('Hello.World')
        expect(toPascal('hello/world')).toBe('Hello/World')
        expect(toPascal('hello|world')).toBe('Hello|World')
        expect(toPascal('hello,world')).toBe('Hello,World')
    })

    it('should handle words with numbers', () => {
        expect(toPascal('hello123')).toBe('Hello123')
        expect(toPascal('test1 test2')).toBe('Test1 Test2')
        expect(toPascal('version2.0')).toBe('Version2.0')
        expect(toPascal('123abc')).toBe('123abc')
        expect(toPascal('abc123def')).toBe('Abc123def')
    })

    it('should handle multiple spaces', () => {
        expect(toPascal('hello  world')).toBe('Hello  World')
        expect(toPascal('  hello world  ')).toBe('  Hello World  ')
        expect(toPascal('multiple   spaces   between')).toBe('Multiple   Spaces   Between')
    })

    it('should handle special characters and punctuation', () => {
        expect(toPascal('hello! world?')).toBe('Hello! World?')
        expect(toPascal('hello, world.')).toBe('Hello, World.')
        expect(toPascal('hello@world#test')).toBe('Hello@World#Test')
        expect(toPascal('(hello) [world]')).toBe('(Hello) [World]')
        expect(toPascal('hello;world:test')).toBe('Hello;World:Test')
    })

    it('should handle camelCase and snake_case inputs', () => {
        expect(toPascal('camelCase')).toBe('Camelcase')
        expect(toPascal('snake_case')).toBe('Snake_case')
        expect(toPascal('kebab-case')).toBe('Kebab-Case')
        expect(toPascal('PascalCase')).toBe('Pascalcase')
        expect(toPascal('UPPER_SNAKE_CASE')).toBe('Upper_snake_case')
    })

    it('should handle words with apostrophes and contractions', () => {
        expect(toPascal("don't")).toBe("Don'T")
        expect(toPascal("it's")).toBe("It'S")
        expect(toPascal("can't")).toBe("Can'T")
        expect(toPascal("won't")).toBe("Won'T")
    })

    it('should be useful for converting to display names', () => {
        expect(toPascal('first name')).toBe('First Name')
        expect(toPascal('last name')).toBe('Last Name')
        expect(toPascal('email address')).toBe('Email Address')
        expect(toPascal('phone number')).toBe('Phone Number')
        expect(toPascal('date of birth')).toBe('Date Of Birth')
    })

    it('should handle unicode and international characters', () => {
        expect(toPascal('café')).toBe('Café')
        expect(toPascal('naïve')).toBe('NaïVe') // Unicode handling per regex \w behavior
        expect(toPascal('résumé')).toBe('RéSumé') // Unicode characters may break word boundaries
        expect(toPascal('piñata')).toBe('PiñAta') // ñ is not in \w, so splits into 'pi' and 'ata'
    })
})
