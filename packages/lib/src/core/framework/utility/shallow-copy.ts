export const shallowCopy = <T>(instance: T): T => {
    // Handle null and undefined
    if (instance === null || instance === undefined) {
        return instance
    }

    // Handle primitive values (numbers, strings, booleans)
    if (typeof instance !== 'object' && typeof instance !== 'function') {
        return instance
    }

    // Handle arrays
    if (Array.isArray(instance)) {
        return [...instance] as T
    }

    // Handle Date objects
    if (instance instanceof Date) {
        return new Date(instance.getTime()) as T
    }

    // Handle RegExp objects
    if (instance instanceof RegExp) {
        return new RegExp(instance.source, instance.flags) as T
    }

    // Handle functions
    if (typeof instance === 'function') {
        // Create a new function with same behavior and copy custom properties
        const originalFunc = instance as any
        const copiedFunc = function (this: any, ...args: any[]) {
            return originalFunc.apply(this, args)
        }

        // Copy all enumerable properties from the original function
        Object.assign(copiedFunc, originalFunc)

        return copiedFunc as T
    }

    // Handle general objects - use Object.assign to copy enumerable properties
    // and Object.getOwnPropertyDescriptors to get non-enumerable properties
    const proto = Object.getPrototypeOf(instance)
    const copy = Object.create(proto)

    // Copy all properties (including non-enumerable ones)
    const descriptors = Object.getOwnPropertyDescriptors(instance)
    Object.defineProperties(copy, descriptors)

    return copy as T
}
