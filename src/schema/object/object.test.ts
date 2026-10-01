import { f } from '../builder'
import { SchemaValidationError } from '../error/error'

describe('ObjectSchema', () => {
    it('should parse valid object matching shape', () => {
        const schema = f.object({
            name: f.string().min(2),
            age: f.number().min(0)
        })

        const result = schema.parse({
            name: 'Alice',
            age: 30
        })

        expect(result).toEqual({
            name: 'Alice',
            age: 30
        })
    })

    it('should apply field transforms during parsing', () => {
        const schema = f.object({
            email: f.string().trim().toLowerCase()
        })

        const result = schema.parse({
            email: '   ALICE@EXAMPLE.COM   '
        })

        expect(result).toEqual({
            email: 'alice@example.com'
        })
    })

    it('should throw SchemaValidationError with exact path on invalid field', () => {
        const schema = f.object({
            user: f.object({
                username: f.string().min(5)
            })
        })

        expect(() => {
            schema.parse({
                user: {
                    username: 'abc' // too short
                }
            })
        }).toThrow(SchemaValidationError)

        try {
            schema.parse({
                user: {
                    username: 'abc'
                }
            })
        } catch (err: any) {
            expect(err.name).toBe('SchemaValidationError')
            expect(err.errors).toBeDefined()
            expect(err.errors.length).toBeGreaterThan(0)
            expect(err.errors[0].path).toEqual(['user', 'username'])
        }
    })

    it('should support safeParse returning success and error objects', () => {
        const schema = f.object({
            count: f.number().positive()
        })

        const successResult = schema.safeParse({ count: 10 })
        expect(successResult.success).toBe(true)
        if (successResult.success) {
            expect(successResult.data).toEqual({ count: 10 })
        }

        const failResult = schema.safeParse({ count: -5 })
        expect(failResult.success).toBe(false)
        if (!failResult.success) {
            expect(failResult.error).toBeDefined()
        }
    })

    it('should support object shape manipulation (pick, omit, extend)', () => {
        const baseSchema = f.object({
            id: f.string(),
            title: f.string(),
            views: f.number()
        })

        const picked = baseSchema.pick(['id', 'title'])
        const pickedResult = picked.parse({ id: '1', title: 'Post 1' })
        expect(pickedResult).toEqual({ id: '1', title: 'Post 1' })

        const extended = baseSchema.extend({
            author: f.string()
        })
        const extResult = extended.parse({
            id: '1',
            title: 'Post 1',
            views: 42,
            author: 'Bob'
        })
        expect(extResult).toEqual({
            id: '1',
            title: 'Post 1',
            views: 42,
            author: 'Bob'
        })
    })
})
