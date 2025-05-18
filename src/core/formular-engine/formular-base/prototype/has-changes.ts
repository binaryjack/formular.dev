// has-changes.ts

import { IFormular } from '../formular-base.types'

/**
 * Checks if the Formy instance has changes and executes a callback if so.
 * @param callback - The callback to execute if changes are detected.
 */
export const hasChanges = function <T extends object>(this: IFormular<T>, callback: () => void) {
    this.observers.subscribe(callback.bind(this))
}
