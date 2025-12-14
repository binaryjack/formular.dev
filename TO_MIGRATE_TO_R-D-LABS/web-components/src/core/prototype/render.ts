/**
 * @fileoverview Render prototype method
 * Following CONTRIBUTING.md: Each prototype method in individual file
 */

import type { TemplateResult } from '../../template'
import type { IBaseComponentInstance } from '../interfaces/i-base-component-instance'

/**
 * Render method to be implemented by subclasses
 * 
 * @returns Template result to render
 */
export const render = function(this: IBaseComponentInstance): TemplateResult | null {
    return null
}
