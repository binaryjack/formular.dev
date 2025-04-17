import { TagEnum } from '../../rteInput.types'
import { IFormatManager } from '../formatManager.types'

// 1. Create a specialized function for list formatting
export const applyListFormatting = function (
    this: IFormatManager,
    range: Range,
    selection: Selection
) {
    if (range.collapsed) return // No selection

    // Remember the original container and offsets for selection restoration
    const startContainer = range.startContainer
    const startOffset = range.startOffset
    const endContainer = range.endContainer
    const endOffset = range.endOffset

    // Create the UL element
    const ulElement = document.createElement('UL')

    // Extract the selected content
    const fragment = range.extractContents()

    // Create a temp div to work with the HTML
    const tempDiv = document.createElement('div')
    tempDiv.appendChild(fragment.cloneNode(true))

    // Split content by line breaks or paragraphs
    const lines = tempDiv.innerHTML
        .split(/(?:<br\s*\/?>|<\/p><p>|<\/div><div>)/)
        .filter((line) => line.trim().length > 0)

    // Create list items for each line
    lines.forEach((line) => {
        const li = document.createElement('LI')
        li.innerHTML = line.trim()
        ulElement.appendChild(li)
    })

    // Insert the list
    range.insertNode(ulElement)

    // Try to restore selection
    try {
        const newRange = document.createRange()
        newRange.setStart(startContainer, startOffset)
        newRange.setEnd(endContainer, endOffset)
        selection.removeAllRanges()
        selection.addRange(newRange)
    } catch (e) {
        console.warn('Could not restore exact selection', e)
        // Fallback to selecting the entire list
        const newRange = document.createRange()
        newRange.selectNodeContents(ulElement)
        selection.removeAllRanges()
        selection.addRange(newRange)
    }

    this.updateActiveFormat(TagEnum.unorderedList, true)
    this.engine.notifyStateChanges()
}
