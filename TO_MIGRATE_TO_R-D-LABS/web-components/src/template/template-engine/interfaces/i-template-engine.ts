import { ITemplateEngineConfig } from '../../interfaces/i-template-engine-config'
import { ITemplateResult } from '../../interfaces/i-template-result'

/**
 * Template engine interface
 * Following CONTRIBUTING.md: One interface per file
 */
export interface ITemplateEngine {
    // Internal properties
    templateCache: Map<string, HTMLTemplateElement>
    defaultConfig: ITemplateEngineConfig
    currentConfig: ITemplateEngineConfig
    
    // Core template methods
    html(strings: TemplateStringsArray, ...values: any[]): ITemplateResult
    css(strings: TemplateStringsArray, ...values: any[]): string
    when(condition: boolean, template: any, elseTemplate?: any): any
    repeat<T>(items: T[], template: (item: T, index: number) => ITemplateResult | string): any[]
    
    // Template processing methods
    createTemplate(templateResult: ITemplateResult, cacheKey?: string): HTMLTemplateElement
    processTemplate(template: HTMLTemplateElement, templateResult: ITemplateResult, componentId?: string): DocumentFragment
    processEventListeners(fragment: DocumentFragment, eventListeners: Map<string, EventListener>, componentId?: string): void
    
    // Utility methods
    sanitizeHTML(html: string): string
    
    // Configuration methods
    configureTemplateEngine(config: Partial<ITemplateEngineConfig>): void
    getTemplateEngineConfig(): ITemplateEngineConfig
    clearTemplateCache(): void
    getTemplateCacheStats(): {
        size: number
        maxSize: number
        keys: string[]
    }
}
