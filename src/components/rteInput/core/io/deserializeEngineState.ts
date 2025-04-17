import DOMPurify from 'dompurify'
import { getTagForFormat } from '../helpers/getTagForFormat'
import { IEngineState } from '../rteInput.types'

/**
 * Deserializes field value into editor state
 */
export function deserializeEngineState(serializedData: string): Partial<IEngineState> {
    // Decode from base64
    const jsonData = atob(serializedData)
    const data = JSON.parse(jsonData)

    // Re-sanitize on load for extra safety
    const sanitizedHtml = DOMPurify.sanitize(data.content.html)

    // Convert to IEngineState compatible format
    return {
        content: sanitizedHtml,
        activeFormatState: data.formats.map((f: any) => ({
            formatName: f.name,
            active: f.active,
            tagName: getTagForFormat(f.name)
        }))
    }
}
