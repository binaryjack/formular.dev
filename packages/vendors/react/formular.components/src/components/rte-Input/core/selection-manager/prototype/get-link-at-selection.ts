import { ILinkData } from '../../rti-engine.types'
import { ISelectionManager } from '../selection-manager.types'

export const getLinkAtSelection = function (this: ISelectionManager): ILinkData | null {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return null

    const range = selection.getRangeAt(0)
    let currentNode: Node | null = range.commonAncestorContainer

    // If the node is a text node, get its parent
    if (currentNode.nodeType === Node.TEXT_NODE) {
        currentNode = currentNode.parentNode
    }

    // Look for an anchor element
    while (currentNode && currentNode !== this.editorElement) {
        if (currentNode.nodeName === 'A') {
            const link = currentNode as HTMLAnchorElement
            return {
                node: link,
                url: link.href,
                text: link.textContent ?? ''
            }
        }
        currentNode = currentNode.parentNode
    }

    return null
}
