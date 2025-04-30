// has-changes.ts

import { IFormy } from '../formy-base.types'

/**
 * Checks if the Formy instance has changes and executes a callback if so.
 * @param callback - The callback to execute if changes are detected.
 */
export function hasChanges(this: IFormy, callback: () => void) {
    this.observers.subscribe(callback.bind(this))
}
