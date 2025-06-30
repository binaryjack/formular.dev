/**
 * Template result interface for parsed templates
 * Following CONTRIBUTING.md: One interface per file
 */
export interface ITemplateResult {
    /** The HTML string with placeholders */
    html: string
    /** Values to interpolate into the template */
    values: any[]
    /** Event listeners to bind */
    eventListeners: Map<string, EventListener>
    /** Template metadata */
    metadata: {
        hasConditionals: boolean
        hasLoops: boolean
        hasEvents: boolean
        componentId?: string
    }
}
