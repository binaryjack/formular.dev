/**
 * Computed property definition interface
 * Following CONTRIBUTING.md: One interface per file
 */
export interface IComputedProperty {
    dependencies: string[]
    computeFn: (...args: any[]) => any
    lastValue: any
    isDirty: boolean
}
