import { IStyleManager } from '../style-manager.types'

/**
 * Checks if a specific extension has been loaded into this StyleManager instance.
 * This method provides a way to verify extension availability before attempting
 * to use extension-specific features.
 *
 * @param {string} extensionName - The name of the extension to check for
 * @returns {boolean} True if the extension exists, false otherwise
 * @this {IStyleManager}
 *
 * @example
 * ```typescript
 * if (styleManager.hasExtension('webComponents')) {
 *   styleManager.addComponentStyles('my-component', styles);
 * }
 * ```
 */
export const hasExtension = function (this: IStyleManager, extensionName: string): boolean {
    return this.extensions?.has(extensionName) ?? false
}
