// Type-safe array creation function
export function createEnum<T extends string>(o: Record<T, any>): T[] {
    return Object.keys(o) as T[]
}
