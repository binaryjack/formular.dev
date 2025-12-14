/**
 * Reactive property configuration interface
 * Following CONTRIBUTING.md: One interface per file
 */
export interface IReactivePropertyConfig {
    initialValue: any
    attribute?: string | boolean // Maps to attribute name, or true for auto-mapping
    type?: 'string' | 'number' | 'boolean' | 'object'
    validator?: (value: any) => boolean
    onChange?: (value: any, oldValue: any) => void
    sync?: boolean // Whether to sync with attributes
}
