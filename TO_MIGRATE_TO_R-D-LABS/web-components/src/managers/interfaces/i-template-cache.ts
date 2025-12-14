/**
 * Template cache for performance optimization interface
 * Following CONTRIBUTING.md: One interface per file
 */
export interface ITemplateCache {
    html: string
    styles?: string
    template: HTMLTemplateElement
    createdAt: Date
}
