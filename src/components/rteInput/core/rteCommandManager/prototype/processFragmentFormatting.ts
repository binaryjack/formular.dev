import { IRteCommandManager } from '../rteCommandManager.types'

// Helper function to process fragment and remove formatting
export const processFragmentFormatting = function (
    this: IRteCommandManager,
    fragment: DocumentFragment,
    tagName: string
) {
    const tagNameUpper = tagName.toUpperCase()

    // Function to process nodes recursively
    const processNode = (node: Node) => {
        // Process all children first (bottom-up approach)
        const childNodes = Array.from(node.childNodes)
        childNodes.forEach((child) => {
            processNode(child)
        })

        // Check if this is an element node with the target tag
        if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            if (element.tagName.toUpperCase() === tagNameUpper) {
                const parent = node.parentNode
                if (parent) {
                    // Create a reference node for insertion position
                    const nextSibling = node.nextSibling

                    // Move all children to parent
                    while (node.firstChild) {
                        parent.insertBefore(node.firstChild, nextSibling)
                    }

                    // Remove the now-empty formatting node
                    parent.removeChild(node)
                }
            }
        }
    }

    // Process the entire fragment
    processNode(fragment)

    return fragment
}
