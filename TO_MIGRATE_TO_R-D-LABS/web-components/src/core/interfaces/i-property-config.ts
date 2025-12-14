/**
 * @fileoverview Property configuration interface
 * Following CONTRIBUTING.md: One interface per file with I prefix
 */

/**
 * Property configuration for reactive properties
 */
export interface IPropertyConfig {
    /** Property type */
    type: 'string' | 'number' | 'boolean' | 'object' | 'array'
    /** Default value */
    defaultValue?: any
    /** Attribute name to sync with */
    attribute?: string | boolean
    /** Property is required */
    required?: boolean
    /** Custom validator function */
    validator?: (value: any) => boolean
    /** Transform function for incoming values */
    transform?: (value: any) => any
}
