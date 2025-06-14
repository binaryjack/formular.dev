import { sanitize } from '../../helpers/sanitize'
import { IRtiEngine } from '../rti-engine.types'

// Add this function to your useRteEngine hook
export const handlePaste = function (this: IRtiEngine, clipboard: DataTransfer) {
    if (!this.editorElement) return

    // Try to get HTML content first
    let content = clipboard.getData('text/html')
    const isHtml = !!content

    // Fall back to plain text if no HTML is available
    if (!content) {
        content = clipboard.getData('text/plain')
        // Escape text to prevent HTML injection
        if (content) {
            content = content
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\n/g, '<br>')
        }
    }

    if (!content) return

    // Get current selection
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)

    // Clean and sanitize the HTML
    const sanitizedContent = sanitize(content, isHtml)

    // Create a fragment with the sanitized content
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = sanitizedContent
    const fragment = document.createDocumentFragment()
    while (tempDiv.firstChild) {
        fragment.appendChild(tempDiv.firstChild)
    }

    // Delete any selected content and insert the new content
    range.deleteContents()
    range.insertNode(fragment)

    // Move the cursor to the end of the inserted content
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)

    // Normalize and clean up HTML
    this.cleanHtml()
    // Trigger input handler to update state
    this.notifyStateChanges()
}
