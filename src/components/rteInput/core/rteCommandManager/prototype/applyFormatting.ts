import { IRteCommandManager } from '../rteCommandManager.types'

export const applyFormatting = function (
    this: IRteCommandManager,
    tagName: string,
    range: Range,
    selection: Selection
) {
    if (range.collapsed) return // No selection

    // Create element with desired formatting
    const formattingElement = document.createElement(tagName)

    // Move content from selection to our new element
    formattingElement.appendChild(range.extractContents())

    // Insert the formatted element
    range.insertNode(formattingElement)

    // Update selection
    selection.removeAllRanges()
    const newRange = document.createRange()
    newRange.selectNodeContents(formattingElement)
    selection.addRange(newRange)
}
