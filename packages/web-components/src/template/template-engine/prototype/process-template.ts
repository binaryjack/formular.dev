import { ITemplateResult } from '../../interfaces/i-template-result'

/**
 * Clones a template and processes interpolations and event bindings
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const processTemplate = function(
    this: any,
    template: HTMLTemplateElement, 
    templateResult: ITemplateResult,
    componentId?: string
): DocumentFragment {
    const fragment = template.content.cloneNode(true) as DocumentFragment
    
    // Process event listeners
    if (templateResult.metadata.hasEvents) {
        this.processEventListeners(fragment, templateResult.eventListeners, componentId)
    }
    
    return fragment
}
