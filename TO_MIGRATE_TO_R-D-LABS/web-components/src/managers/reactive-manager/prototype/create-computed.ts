import { IComputedProperty } from '../../interfaces/i-computed-property'
import { IReactiveManager } from '../../interfaces/i-reactive-manager'

/**
 * Creates a computed property
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const createComputed = function(
    this: IReactiveManager,
    componentId: string,
    property: string,
    dependencies: string[],
    computeFn: (...args: any[]) => any
): void {
    const componentState = this.components.get(componentId)
    if (!componentState) {
        console.warn(`Component ${componentId} not found for computed property ${property}`)
        return
    }

    const computed: IComputedProperty = {
        dependencies,
        computeFn,
        lastValue: undefined,
        isDirty: true
    }

    componentState.computed.set(property, computed)

    // Define computed property getter
    Object.defineProperty(componentState.element, property, {
        get: function() {
            if (computed.isDirty) {
                // Gather dependency values
                const depValues = dependencies.map(dep => (this )[dep])
                computed.lastValue = computeFn.apply(this, depValues)
                computed.isDirty = false
            }
            return computed.lastValue
        },
        enumerable: true,
        configurable: true
    })
}
