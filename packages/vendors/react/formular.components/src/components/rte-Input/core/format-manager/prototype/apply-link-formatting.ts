import { IFormatManager } from '../format-manager.types'

export const applyLinkFormatting = function (
    this: IFormatManager,
    url: string,
    text?: string
): void {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)

    // Create link element
    const linkElement = document.createElement('a')
    linkElement.href = url
    linkElement.target = '_blank' // Open in new tab
    linkElement.rel = 'noopener noreferrer' // Security best practice

    // If text is provided, use it for the link text
    if (text && text.trim() !== '') {
        linkElement.textContent = text

        // Replace selection with the link
        range.deleteContents()
        range.insertNode(linkElement)
    } else {
        // Use the selected content as link text
        const selectedContent = range.extractContents()
        linkElement.appendChild(selectedContent)
        range.insertNode(linkElement)
    }

    // Select the newly created link
    const newRange = document.createRange()
    newRange.selectNodeContents(linkElement)
    selection.removeAllRanges()
    selection.addRange(newRange)

    // Update format state
    this.updateActiveFormat('link', true)

    // Clean up HTML structure
    this.engine.cleanHtml()
    this.engine.notifyStateChanges()
}
