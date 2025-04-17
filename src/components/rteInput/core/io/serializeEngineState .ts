import DOMPurify from 'dompurify'
import { IEngineState } from '../rteInput.types'

/**
 * Sanitizes and serializes editor state for storage in IFieldInput
 */
export function serializeEngineState(state: IEngineState): string {
    // Create a safe representation of the content as a structured JSON object
    const serializedState = {
        version: 1, // For future compatibility
        content: {
            html: DOMPurify.sanitize(state.content || ''), // Sanitize HTML
            text: state.content?.replace(/<[^>]*>/g, '') || '' // Plain text version
        },
        formats:
            state.activeFormatState?.map((format) => ({
                name: format.formatName,
                active: format.active
            })) || [],
        // Don't include selection data - it's not persistent
        timestamp: Date.now()
    }

    // Convert to base64 for extra safety and consistent encoding
    return btoa(JSON.stringify(serializedState))
}
