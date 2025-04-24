import DOMPurify from 'dompurify'

/**
 * Sanitizes and serializes editor state for storage in IFieldInput
 */
export function serializeEngineState(state: string | null): string | null {
    // Convert to base64 for extra safety and consistent encoding
    return state ? btoa(JSON.stringify(DOMPurify.sanitize(state))) : null
}
