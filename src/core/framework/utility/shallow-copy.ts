export const shallowCopy = <T>(instance: T): T => {
    return Object.assign(Object.create(Object.getPrototypeOf(instance)), instance)
}
