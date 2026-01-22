/**
 * Initializes the DomManager instance and sets it as initialized.
 *
 * Logs the initialization event and marks the manager as initialized.
 *
 * @template T - The type of HTMLElement managed.
 */
import { logManager } from '@core/managers/log-manager/log-manager'
import { IDomManager } from '../dom-manager.types'

export const initialize = function <T extends HTMLElement>(this: IDomManager<T>) {
    logManager(undefined, 'info', 'initialize', this.dependencyName)
    // this.tracker = tracker
    this.isInitialized = true
}
