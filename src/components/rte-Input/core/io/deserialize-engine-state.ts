/**
 * Deserializes field value into editor state
 */
export function deserializeEngineState(serializedData: string | null): string | null {
    // Decode from base64
    const jsonData = serializedData ? atob(serializedData) : null
    return jsonData ? JSON.parse(jsonData) : null
}
