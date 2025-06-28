import { IDomManager } from '../dom-manager.types'

/**
 * Checks if a specific extension has been loaded into this DomManager instance.
 * This method provides a way to verify extension availability before attempting
 * to use extension-specific features.
 *
 * @param {string} extensionName - The name of the extension to check for
 * @returns {boolean} True if the extension exists, false otherwise
 * @this {IDomManager}
 *
 * @example
 * ```typescript
 * if (domManager.hasExtension('webComponents')) {
 *   domManager.createShadowRoot(element, { mode: 'open' });
 * }
 * ```
 */
export const hasExtension = function (
    this: IDomManager<HTMLElement>,
    extensionName: string
): boolean {
    return this.extensions?.has(extensionName) ?? false
}
