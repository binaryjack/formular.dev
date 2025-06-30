import { IReactiveManager } from '../../interfaces/i-reactive-manager'

/**
 * Marks computed properties as dirty when their dependencies change
 * Following CONTRIBUTING.md: Helper functions in utils, one function per file
 */
export function markComputedPropertiesDirty(this: IReactiveManager, componentId: string, changedProperty: string): void {
    const componentState = this.components.get(componentId)
    if (!componentState) return

    for (const [, computed] of componentState.computed) {
        if (computed.dependencies.includes(changedProperty)) {
            computed.isDirty = true
        }
    }
}
