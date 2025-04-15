import { IRteCommandManager } from '../rteCommandManager.types'

// Helper method to recursively unwrap formatting
export const unwrapFormatting = function (this: IRteCommandManager, node: Node, tagName: string) {
    // Handle DocumentFragment as a special case
    const parent = node.parentNode

    for (const n of parent?.childNodes ?? []) {
        if (n.hasChildNodes()) {
            this.unwrapFormatting(node, tagName)
        }
        console.log('Loop Nodes', (n as Element)?.tagName)
    }

    // if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    //     // For fragments, we need to handle each top-level child
    //     const topLevelNodes = Array.from(node.childNodes)
    //     topLevelNodes.forEach((child) => {
    //         this.unwrapFormatting(child, tagName)
    //     })
    //     return
    // }

    // // Skip text nodes and non-element nodes immediately
    // if (node.nodeType !== Node.ELEMENT_NODE) {
    //     return
    // }

    // // Get the element's tag name
    // const elementTagName = (node as Element).tagName.toUpperCase()
    // const targetTagName = tagName.toUpperCase()

    // // Process all children first (bottom-up approach)
    // const childNodes = Array.from(node.childNodes)
    // childNodes.forEach((child) => {
    //     this.unwrapFormatting(child, tagName)
    // })

    // // After processing children, check if this element needs unwrapping
    // if (elementTagName === targetTagName) {
    //     const parent = node.parentNode
    //     if (!parent) return

    //     // Create a reference node for insertion position
    //     const nextSibling = node.nextSibling

    //     // Move all children to parent before the original node
    //     while (node.firstChild) {
    //         parent.insertBefore(node.firstChild, nextSibling)
    //     }

    //     // Remove the now-empty formatting node
    //     parent.removeChild(node)
    // }
}
