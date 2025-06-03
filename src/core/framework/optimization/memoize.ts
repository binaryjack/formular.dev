export function memoize<T extends (...args: any[]) => any>(fn: T): T {
    const objectCache = new WeakMap<object, Map<string, ReturnType<T>>>()
    const primitiveCache = new Map<string, ReturnType<T>>()

    return function (...args: Parameters<T>): ReturnType<T> {
        const [firstArg, ...restArgs] = args
        const key = JSON.stringify(restArgs)

        if (typeof firstArg === 'object' && firstArg !== null) {
            if (!objectCache.has(firstArg)) {
                objectCache.set(firstArg, new Map())
            }
            const cacheForObject = objectCache.get(firstArg)!
            if (cacheForObject.has(key)) {
                return cacheForObject.get(key) as ReturnType<T>
            }
            const result = fn(...args)
            cacheForObject.set(key, result)
            return result
        } else {
            // Handle primitive arguments using a separate Map
            const primitiveKey = JSON.stringify([firstArg, ...restArgs])
            if (primitiveCache.has(primitiveKey)) {
                return primitiveCache.get(primitiveKey) as ReturnType<T>
            }
            const result = fn(...args)
            primitiveCache.set(primitiveKey, result)
            return result
        }
    } as T
}
