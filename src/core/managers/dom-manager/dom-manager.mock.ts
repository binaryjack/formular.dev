import { DomManager } from './dom-manager'
import { IDomManager } from './dom-manager.types'

/**
 * Creates a mock DomManager instance for testing purposes.
 *
 * @template T - The type of HTMLElement managed.
 * @param {Partial<IDomManager<T>>} overrides - Optional overrides for the manager's methods or properties.
 * @returns {IDomManager<T>} A mock DomManager instance.
 */
export function createMockDomManager<T extends HTMLElement>(
    overrides: Partial<IDomManager<T>> = {},
    initConfig?: any
): IDomManager<T> {
    // Properly create a prototype-based instance and call the constructor
    const manager = Object.create(DomManager.prototype) as IDomManager<T>

    DomManager.call(manager)
    if (typeof manager.initialize === 'function') {
        manager.initialize(initConfig)
    }
    // Optionally override any methods or properties
    Object.assign(manager, overrides)
    return manager
}
