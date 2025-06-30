/**
 * Converts a value to the specified type
 * Following CONTRIBUTING.md: Helper functions in utils, one function per file
 */
export function convertValueToType(value: any, type?: string): any {
    if (!type) return value

    switch (type) {
        case 'string':
            return String(value)
        case 'number':
            return Number(value)
        case 'boolean':
            return Boolean(value)
        case 'object':
            return typeof value === 'object' ? value : JSON.parse(value)
        default:
            return value
    }
}
