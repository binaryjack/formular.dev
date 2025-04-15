import { IRteCommandManager } from '../rteCommandManager.types'

export const applyFormatting = function (
    this: IRteCommandManager,
    tagName: string,
    range: Range,
    selection: Selection
) {
    if (range.collapsed) return // No selection

    // Remember the original container and offsets
    const startContainer = range.startContainer
    const startOffset = range.startOffset
    const endContainer = range.endContainer
    const endOffset = range.endOffset

    // Create element with desired formatting
    const formattingElement = document.createElement(tagName)

    // Move content from selection to our new element
    formattingElement.appendChild(range.extractContents())

    // Insert the formatted element
    range.insertNode(formattingElement)

    // Try to restore a similar selection
    try {
        const newRange = document.createRange()
        newRange.setStart(startContainer, startOffset)
        newRange.setEnd(endContainer, endOffset)
        selection.removeAllRanges()
        selection.addRange(newRange)
    } catch (e) {
        // Fallback to selecting the content
        const newRange = document.createRange()
        newRange.selectNodeContents(formattingElement)
        selection.removeAllRanges()
        selection.addRange(newRange)
    }
    this.updateActiveFormat(tagName.toUpperCase(), true)
    this.notifyStateChanges()
}
