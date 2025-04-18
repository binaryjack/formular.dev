import { IFormatManager } from '../formatManager.types'

export const removeLinkFormatting = function (this: IFormatManager): void {
    const linkInfo = this.engine.selectionManager.getLinkAtSelection()
    if (!linkInfo) return

    const { node } = linkInfo

    // Create a document fragment with the link's contents
    const fragment = document.createDocumentFragment()
    while (node.firstChild) {
        fragment.appendChild(node.firstChild)
    }

    // Replace the link with its contents
    node.parentNode?.replaceChild(fragment, node)

    // Update format state
    this.updateActiveFormat('link', false)

    // Clean up HTML structure
    this.engine.cleanHtml()
    this.engine.notifyStateChanges()
}
