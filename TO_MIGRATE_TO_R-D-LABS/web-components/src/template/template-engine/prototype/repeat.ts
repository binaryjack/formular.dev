import { ITemplateResult } from '../../interfaces/i-template-result'

/**
 * Loop rendering helper
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const repeat = function<T>(this: any, items: T[], template: (item: T, index: number) => ITemplateResult | string) {
    const results = items.map(template)
    // Mark as template array for detection
    ;(results as any).__isTemplate = true
    return results
}
