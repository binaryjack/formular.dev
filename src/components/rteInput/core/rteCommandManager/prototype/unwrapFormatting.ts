import { IRteCommandManager } from '../rteCommandManager.types'

// Helper method to recursively unwrap formatting
export const unwrapFormatting = function (this: IRteCommandManager, node: Node, tagName: string) {
    if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName === tagName) {
        // Replace this formatting element with its contents
        const parent = node.parentNode
        if (parent) {
            while (node.firstChild) {
                parent.insertBefore(node.firstChild, node)
            }
            parent.removeChild(node)
        }
        return
    }

    // Process child nodes
    const childNodes = Array.from(node.childNodes)
    childNodes.forEach((child) => {
        this.unwrapFormatting(child, tagName)
    })
}
