import { IRtiEngine } from '../rtiEngine.types'

// Helper function to wrap nodes in a paragraph
export const wrapNodesInParagraph = function (this: IRtiEngine, nodes: Node[]) {
    if (!this.editorElement || nodes.length === 0) return

    const p = document.createElement('p')
    // Clone the nodes to avoid DOM manipulation issues
    nodes.forEach((node) => {
        // Remove from current location
        if (node.parentNode) {
            node.parentNode.removeChild(node)
        }
        // Add to new paragraph
        p.appendChild(node)
    })

    // Insert the paragraph at the appropriate position
    this.editorElement.appendChild(p)
}
