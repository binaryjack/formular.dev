/**
 * Gets template cache statistics
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const getTemplateCacheStats = function(this: any) {
    return {
        size: this.templateCache.size,
        maxSize: this.currentConfig.maxCacheSize,
        keys: Array.from(this.templateCache.keys())
    }
}
