/**
 * Clears the template cache
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const clearTemplateCache = function(this: any): void {
    this.templateCache.clear()
}
