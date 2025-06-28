import { IDomManager } from '../dom-manager.types'

/**
 * Extends the DomManager with additional functionality from an extension object.
 * This method allows adding new methods and properties to a DomManager instance
 * without modifying the core implementation, following the Open/Closed Principle.
 *
 * @param {string} extensionName - The name of the extension for tracking purposes
 * @param {Record<string, any>} extension - An object containing methods and properties to add to this manager instance
 * @this {IDomManager}
 *
 * @example
 * ```typescript
 * const webComponentExtension = {
 *   createShadowRoot: function(element, options) {
 *     return element.attachShadow(options);
 *   }
 * };
 *
 * domManager.extend('webComponents', webComponentExtension);
 * domManager.createShadowRoot(element, { mode: 'open' });
 * ```
 */
export const extend = function (
    this: IDomManager<HTMLElement>,
    extensionName: string,
    extension: Record<string, any>
): void {
    // Initialize extensions map if it doesn't exist
    this.extensions = this.extensions ?? new Map<string, Record<string, any>>()

    // Track the extension by name
    this.extensions.set(extensionName, extension)

    // Merge extension methods into this instance
    Object.assign(this, extension)
}
