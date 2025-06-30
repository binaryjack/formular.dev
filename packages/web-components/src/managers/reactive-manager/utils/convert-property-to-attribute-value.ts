/**
 * Converts a property value to the appropriate attribute value based on type
 * Following CONTRIBUTING.md: Helper functions in utils, one function per file
 */
export function convertPropertyToAttributeValue(value: any, type?: string): string | null {
    if (value == null) return null

    switch (type) {
        case 'boolean':
            return value ? '' : null
        case 'object':
            return JSON.stringify(value)
        default:
            return String(value)
    }
}
