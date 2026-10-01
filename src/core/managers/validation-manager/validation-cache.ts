// Validation cache for storing and retrieving validation results
export interface IValidationCache {
    get(fieldName: string, fieldValue: any, strategies: any[]): any
    set(fieldName: string, fieldValue: any, strategies: any[], result: any): void
    clear(fieldName?: string): void
    clearAll(): void
    invalidate(fieldName: string): void
    getSize?(): number
}

// Bounded LRU in-memory validation cache implementation
export class ValidationCache implements IValidationCache {
    private cache = new Map<string, any>()
    private fieldKeys = new Map<string, Set<string>>()
    private keyToField = new Map<string, string>()
    private readonly maxSize: number

    constructor(maxSize: number = 500) {
        this.maxSize = Math.max(1, maxSize)
    }

    private createKey(fieldName: string, fieldValue: any, strategies: any[]): string {
        const valStr =
            typeof fieldValue === 'string' || typeof fieldValue === 'number' || typeof fieldValue === 'boolean'
                ? String(fieldValue)
                : fieldValue === null
                  ? 'null'
                  : fieldValue === undefined
                    ? 'undefined'
                    : JSON.stringify(fieldValue)
        return `${fieldName}:${valStr}:${strategies ? strategies.length : 0}`
    }

    get(fieldName: string, fieldValue: any, strategies: any[]): any {
        const key = this.createKey(fieldName, fieldValue, strategies)
        const value = this.cache.get(key)
        if (value !== undefined) {
            // LRU renewal: delete and re-insert to move to MRU position
            this.cache.delete(key)
            this.cache.set(key, value)
        }
        return value
    }

    set(fieldName: string, fieldValue: any, strategies: any[], result: any): void {
        const key = this.createKey(fieldName, fieldValue, strategies)

        // If updating an existing key, delete it first to renew order
        if (this.cache.has(key)) {
            this.cache.delete(key)
        } else if (this.cache.size >= this.maxSize) {
            // Evict oldest (first inserted) item
            const oldestKey = this.cache.keys().next().value
            if (oldestKey !== undefined) {
                this.deleteKey(oldestKey)
            }
        }

        this.cache.set(key, result)
        this.keyToField.set(key, fieldName)

        let keys = this.fieldKeys.get(fieldName)
        if (!keys) {
            keys = new Set()
            this.fieldKeys.set(fieldName, keys)
        }
        keys.add(key)
    }

    private deleteKey(key: string): void {
        this.cache.delete(key)
        const fieldName = this.keyToField.get(key)
        if (fieldName) {
            this.keyToField.delete(key)
            const keys = this.fieldKeys.get(fieldName)
            if (keys) {
                keys.delete(key)
                if (keys.size === 0) {
                    this.fieldKeys.delete(fieldName)
                }
            }
        }
    }

    clear(fieldName?: string): void {
        if (fieldName) {
            const keys = this.fieldKeys.get(fieldName)
            if (keys) {
                for (const key of keys) {
                    this.cache.delete(key)
                    this.keyToField.delete(key)
                }
                this.fieldKeys.delete(fieldName)
            }
        } else {
            this.clearAll()
        }
    }

    clearAll(): void {
        this.cache.clear()
        this.fieldKeys.clear()
        this.keyToField.clear()
    }

    invalidate(fieldName: string): void {
        this.clear(fieldName)
    }

    getSize(): number {
        return this.cache.size
    }
}
