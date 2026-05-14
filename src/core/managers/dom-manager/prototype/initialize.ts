/**
 * Initializes the DomManager instance and sets it as initialized.
 *
 * Logs the initialization event and marks the manager as initialized.
 *
 * @template T - The type of HTMLElement managed.
 */
import { IDomManager } from '../dom-manager.types'

export const initialize = function <T extends HTMLElement>(this: IDomManager<T>) {
    // this.tracker = tracker
    this.isInitialized = true
}
