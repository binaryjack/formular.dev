import { IComponentReactiveState } from '../../interfaces/i-component-reactive-state'
import { IReactiveManager } from '../../interfaces/i-reactive-manager'

/**
 * Gets component reactive state for debugging
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const getComponentState = function(
    this: IReactiveManager,
    componentId: string
): IComponentReactiveState | undefined {
    return this.components.get(componentId)
}
