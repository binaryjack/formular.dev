/**
 * @fileoverview Convert type prototype method
 * Following CONTRIBUTING.md: Each prototype method in individual file
 */

import type { IBaseComponentInstance } from '../interfaces/i-base-component-instance'

/**
 * Converts a value to the specified type
 */
export const convertType = function(this: IBaseComponentInstance, value: any, type: string): any {
    switch (type) {
        case 'string':
            return String(value)
        case 'number':
            return Number(value)
        case 'boolean':
            return value === true || value === 'true' || value === ''
        case 'object':
            return typeof value === 'string' ? JSON.parse(value) : value
        case 'array':
            return Array.isArray(value) ? value : [value]
        default:
            return value
    }
}
