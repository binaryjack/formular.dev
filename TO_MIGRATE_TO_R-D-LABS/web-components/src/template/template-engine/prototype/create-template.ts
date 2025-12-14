import { ITemplateResult } from '../../interfaces/i-template-result'

/**
 * Creates an HTML template element from a template result
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const createTemplate = function(this: any, templateResult: ITemplateResult, cacheKey?: string): HTMLTemplateElement {
    // Check cache first
    if (cacheKey && this.templateCache.has(cacheKey)) {
        return this.templateCache.get(cacheKey)!.cloneNode(true) as HTMLTemplateElement
    }

    const template = document.createElement('template')
    template.innerHTML = templateResult.html
    
    // Cache if key provided
    if (cacheKey && this.currentConfig.enableCaching) {
        this.templateCache.set(cacheKey, template.cloneNode(true) as HTMLTemplateElement)
    }

    return template
}
