import { ValidationCache } from './validation-cache'

describe('ValidationCache (Bounded LRU)', () => {
    it('should store and retrieve validation results for primitives', () => {
        const cache = new ValidationCache(10)
        const dummyStrategy = [{ name: 'required' }]

        cache.set('email', 'test@domain.com', dummyStrategy, { isValid: true })
        const result = cache.get('email', 'test@domain.com', dummyStrategy)

        expect(result).toEqual({ isValid: true })
    })

    it('should return undefined for uncached entries', () => {
        const cache = new ValidationCache(10)
        expect(cache.get('unknown', 'value', [])).toBeUndefined()
    })

    it('should evict the oldest entry when exceeding maxSize', () => {
        const cache = new ValidationCache(3)
        const strat = [{ id: 's1' }]

        cache.set('f1', 'val1', strat, { valid: 1 })
        cache.set('f2', 'val2', strat, { valid: 2 })
        cache.set('f3', 'val3', strat, { valid: 3 })
        expect(cache.getSize()).toBe(3)

        // Adding 4th should evict f1
        cache.set('f4', 'val4', strat, { valid: 4 })
        expect(cache.getSize()).toBe(3)
        expect(cache.get('f1', 'val1', strat)).toBeUndefined()
        expect(cache.get('f2', 'val2', strat)).toEqual({ valid: 2 })
        expect(cache.get('f4', 'val4', strat)).toEqual({ valid: 4 })
    })

    it('should renew entry in LRU order upon get()', () => {
        const cache = new ValidationCache(3)
        const strat = [{ id: 's1' }]

        cache.set('f1', 'val1', strat, { valid: 1 })
        cache.set('f2', 'val2', strat, { valid: 2 })
        cache.set('f3', 'val3', strat, { valid: 3 })

        // Access f1 to promote it to MRU (most recently used)
        cache.get('f1', 'val1', strat)

        // Adding f4 should now evict f2 (since f1 was renewed)
        cache.set('f4', 'val4', strat, { valid: 4 })
        expect(cache.get('f2', 'val2', strat)).toBeUndefined()
        expect(cache.get('f1', 'val1', strat)).toEqual({ valid: 1 })
        expect(cache.get('f3', 'val3', strat)).toEqual({ valid: 3 })
        expect(cache.get('f4', 'val4', strat)).toEqual({ valid: 4 })
    })

    it('should clear only specific field entries on clear(fieldName)', () => {
        const cache = new ValidationCache(10)
        const strat = [{ id: 's1' }]

        cache.set('email', 'a@a.com', strat, { valid: true })
        cache.set('email', 'b@b.com', strat, { valid: true })
        cache.set('password', 'secret123', strat, { valid: true })

        cache.clear('email')

        expect(cache.get('email', 'a@a.com', strat)).toBeUndefined()
        expect(cache.get('email', 'b@b.com', strat)).toBeUndefined()
        expect(cache.get('password', 'secret123', strat)).toEqual({ valid: true })
        expect(cache.getSize()).toBe(1)
    })

    it('should clear all entries on clearAll()', () => {
        const cache = new ValidationCache(10)
        const strat = [{ id: 's1' }]

        cache.set('f1', 'v1', strat, { valid: true })
        cache.set('f2', 'v2', strat, { valid: true })

        cache.clearAll()
        expect(cache.getSize()).toBe(0)
        expect(cache.get('f1', 'v1', strat)).toBeUndefined()
    })
})
