import { IRteCommandManager } from '../rteCommandManager.types'

export const getAllNodesInRange = function (this: IRteCommandManager, range: Range): Node[] {
    const nodes: Node[] = []

    if (range.startContainer === range.endContainer) {
        // If selection is within a single node
        nodes.push(range.startContainer)
    } else {
        // For complex selections, create a fragment and explore its nodes
        const fragment = range.cloneContents()
        const tempDiv = document.createElement('div')
        tempDiv.appendChild(fragment)

        // Get all text nodes in the fragment
        const walker = document.createTreeWalker(tempDiv, NodeFilter.SHOW_TEXT, null)

        let node: Node | null
        while ((node = walker.nextNode())) {
            nodes.push(node)
        }
    }

    return nodes
}
