import { IReactiveManager } from '../../interfaces/i-reactive-manager'

/**
 * Cleans up component reactive state
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const cleanupComponent = function(
    this: IReactiveManager,
    componentId: string
): void {
    const componentState = this.components.get(componentId)
    if (componentState) {
        // Cancel any pending updates
        if (componentState.updateQueue) {
            // Note: Can't really cancel a Promise, but we can ignore the result
            componentState.updateQueue = null
        }
        
        this.components.delete(componentId)
    }
}
