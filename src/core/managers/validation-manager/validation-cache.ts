// Validation cache for storing and retrieving validation results
export interface IValidationCache {
    get(fieldName: string, fieldValue: any, strategies: any[]): any
    set(fieldName: string, fieldValue: any, strategies: any[], result: any): void
    clear(fieldName?: string): void
    clearAll(): void
    invalidate(fieldName: string): void
}

// Simple in-memory validation cache implementation
export class ValidationCache implements IValidationCache {
    private cache = new Map<string, any>()

    private createKey(fieldName: string, fieldValue: any, strategies: any[]): string {
        return `${fieldName}:${JSON.stringify(fieldValue)}:${strategies.length}`
    }

    get(fieldName: string, fieldValue: any, strategies: any[]): any {
        const key = this.createKey(fieldName, fieldValue, strategies)
        return this.cache.get(key)
    }

    set(fieldName: string, fieldValue: any, strategies: any[], result: any): void {
        const key = this.createKey(fieldName, fieldValue, strategies)
        this.cache.set(key, result)
    }

    clear(fieldName?: string): void {
        if (fieldName) {
            for (const key of this.cache.keys()) {
                if (key.startsWith(`${fieldName}:`)) {
                    this.cache.delete(key)
                }
            }
        } else {
            this.cache.clear()
        }
    }

    clearAll(): void {
        this.cache.clear()
    }

    invalidate(fieldName: string): void {
        this.clear(fieldName)
    }
}
