import { IReactiveManager } from '../../interfaces/i-reactive-manager'
import { queueBatchUpdate } from '../utils/reactive-utils'

/**
 * Batches updates for performance
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const batchUpdate = function(
    this: IReactiveManager,
    componentId: string,
    updates: () => void
): Promise<void> {
    const componentState = this.components.get(componentId)
    if (!componentState) {
        return Promise.resolve()
    }

    return new Promise((resolve) => {
        componentState.isUpdating = true
        
        try {
            updates()
        } finally {
            componentState.isUpdating = false
            queueBatchUpdate.call(this, componentId).then(resolve)
        }
    })
}
