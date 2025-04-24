// Helper function to find a text node
export function getFirstTextNode(node: Node): Node | null {
    if (node.nodeType === Node.TEXT_NODE) {
        return node
    }

    for (const c of node.childNodes) {
        const found = getFirstTextNode(c)
        if (found) return found
    }

    return null
}
