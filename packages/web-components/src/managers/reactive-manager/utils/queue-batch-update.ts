import { IReactiveManager } from '../../interfaces/i-reactive-manager'

/**
 * Queues a batched update for a component
 * Following CONTRIBUTING.md: Helper functions in utils, one function per file
 */
export function queueBatchUpdate(this: IReactiveManager, componentId: string): Promise<void> {
    const componentState = this.components.get(componentId)
    if (!componentState) {
        return Promise.resolve()
    }

    componentState.batchedUpdates.add(componentId)

    componentState.updateQueue ??= new Promise((resolve) => {
        setTimeout(() => {
            this.flushBatchUpdates(componentId).then(resolve)
        }, this.batchConfig.debounceTime)
    })

    return componentState.updateQueue
}
