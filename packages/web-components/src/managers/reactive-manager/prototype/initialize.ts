import { IReactiveManager } from '../../interfaces/i-reactive-manager'

/**
 * Initialize the ReactiveManager
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const initialize = function(this: IReactiveManager): void {
    this.isInitialized = true
    console.log('🔄 ReactiveManager initialized')
}
