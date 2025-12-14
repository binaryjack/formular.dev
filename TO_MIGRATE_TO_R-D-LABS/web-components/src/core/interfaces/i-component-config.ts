/**
 * @fileoverview Component configuration interface
 * Following CONTRIBUTING.md: One interface per file with I prefix
 */

/**
 * Component configuration options
 */
export interface IComponentConfig {
    /** Component tag name */
    tagName: string
    /** Shadow DOM configuration */
    shadowMode?: 'open' | 'closed' | null
    /** Enable style encapsulation */
    styleEncapsulation?: boolean
    /** Enable reactive properties */
    enableReactivity?: boolean
    /** Enable debug mode */
    debug?: boolean
    /** Custom CSS styles */
    styles?: string
    /** Observed attributes */
    observedAttributes?: string[]
}
