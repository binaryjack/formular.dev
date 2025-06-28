import { IStyleManager } from '../style-manager.types'

/**
 * Extends the StyleManager with additional functionality from an extension object.
 * This method allows adding new methods and properties to a StyleManager instance
 * without modifying the core implementation, following the Open/Closed Principle.
 *
 * @param {string} extensionName - The name of the extension for tracking purposes
 * @param {Record<string, any>} extension - An object containing methods and properties to add to this manager instance
 * @this {IStyleManager}
 *
 * @example
 * ```typescript
 * const webComponentExtension = {
 *   addComponentStyles: function(componentId, styles, shadowRoot) {
 *     // Implementation for component-scoped styling
 *   }
 * };
 *
 * styleManager.extend('webComponents', webComponentExtension);
 * styleManager.addComponentStyles('my-component', '.component { color: red; }');
 * ```
 */
export const extend = function (
    this: IStyleManager,
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
