import { IReactiveManager } from '../../interfaces/i-reactive-manager'

/**
 * Flushes pending batch updates
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const flushBatchUpdates = function(
    this: IReactiveManager,
    componentId: string
): Promise<void> {
    const componentState = this.components.get(componentId)
    if (!componentState || componentState.batchedUpdates.size === 0) {
        return Promise.resolve()
    }

    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            if (this.batchConfig.enableLogging) {
                console.log(`🔄 Flushing ${componentState.batchedUpdates.size} updates for ${componentId}`)
            }

            // Trigger any custom update logic here
            componentState.batchedUpdates.clear()
            componentState.updateQueue = null
            resolve()
        })
    })
}
