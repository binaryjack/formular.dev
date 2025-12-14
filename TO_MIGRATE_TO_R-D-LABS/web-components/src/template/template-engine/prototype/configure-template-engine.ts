import { ITemplateEngineConfig } from '../../interfaces/i-template-engine-config'

/**
 * Configures the template engine
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const configureTemplateEngine = function(this: any, config: Partial<ITemplateEngineConfig>): void {
    this.currentConfig = { ...this.currentConfig, ...config }
    
    // Clear cache if caching disabled
    if (!this.currentConfig.enableCaching) {
        this.templateCache.clear()
    }
    
    // Limit cache size
    if (this.templateCache.size > this.currentConfig.maxCacheSize) {
        const entries = Array.from(this.templateCache.entries()) as [string, HTMLTemplateElement][]
        const toRemove = entries.slice(0, entries.length - this.currentConfig.maxCacheSize)
        toRemove.forEach(([key]) => this.templateCache.delete(key))
    }
}
