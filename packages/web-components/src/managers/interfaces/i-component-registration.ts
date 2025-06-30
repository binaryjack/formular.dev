/**
 * Component tracking interface for debugging and lifecycle management
 * Following CONTRIBUTING.md: One interface per file
 */
export interface IComponentRegistration {
    id: string
    element: HTMLElement
    shadowRoot?: ShadowRoot
    template?: HTMLTemplateElement
    registeredAt: Date
    lastUpdate?: Date
}
