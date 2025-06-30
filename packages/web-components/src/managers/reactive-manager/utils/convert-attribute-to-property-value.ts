/**
 * Converts an attribute value to the appropriate property value based on type
 * Following CONTRIBUTING.md: Helper functions in utils, one function per file
 */
export function convertAttributeToPropertyValue(value: string | null, type?: string): any {
    if (value === null) return null

    switch (type) {
        case 'boolean':
            return value !== null
        case 'number':
            return Number(value)
        case 'object':
            try {
                return JSON.parse(value)
            } catch {
                return value
            }
        default:
            return value
    }
}
