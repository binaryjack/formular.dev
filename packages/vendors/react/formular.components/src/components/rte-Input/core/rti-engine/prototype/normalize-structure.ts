import { IRtiEngine } from '../rti-engine.types'

// Add to useRteEngine.ts
export const normalizeStructure = function (this: IRtiEngine) {
    if (!this.editorElement) return

    // Get all direct child nodes
    const childNodes = Array.from(this.editorElement.childNodes)

    // Temporary container for collecting text nodes
    let textContainer: Node[] = []
    let lastNode: Node | null = null

    // Process each node
    childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE || node.nodeName === 'BR') {
            // Collect text nodes and BR tags
            textContainer.push(node)
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // When we encounter a block element, wrap previous text nodes if any
            if (textContainer.length > 0) {
                this.wrapNodesInParagraph(textContainer)
                textContainer = []
            }
            lastNode = node
        }
    })

    // Wrap any remaining text nodes
    if (textContainer.length > 0) {
        this.wrapNodesInParagraph(textContainer)
    }

    // If editor is still empty, add an empty paragraph
    if (this.editorElement.childNodes.length === 0) {
        const p = document.createElement('p')
        p.innerHTML = '<br>' // Empty line with BR
        this.editorElement.appendChild(p)
    }
}
