import { IFormatManager } from '../format-manager.types'

export const removeListFormatting = function (
    this: IFormatManager,
    range: Range,
    selection: Selection
) {
    // Find UL elements in the selection
    let commonAncestor = range.commonAncestorContainer
    const lists: Element[] = []

    // If commonAncestor is a text node, get its parent
    if (commonAncestor.nodeType === Node.TEXT_NODE) {
        commonAncestor = commonAncestor.parentNode || commonAncestor
    }

    // Check if selection is directly in a list
    let node: Node | null = range.startContainer
    while (node && node !== this.editorElement) {
        if (node.nodeName === 'UL') {
            lists.push(node as Element)
            break
        }
        node = node.parentNode
    }

    // If no direct ancestor, look for lists that intersect the selection
    if (lists.length === 0 && commonAncestor.nodeType === Node.ELEMENT_NODE) {
        // Now safely use querySelectorAll since we've confirmed it's an Element
        const allLists = (commonAncestor as Element).querySelectorAll('UL')
        allLists.forEach((list) => {
            if (range.intersectsNode(list)) {
                lists.push(list)
            }
        })
    }

    // Process each list
    lists.forEach((list) => {
        const parent = list.parentNode
        if (!parent) return

        // Convert list items to paragraphs with line breaks
        const fragment = document.createDocumentFragment()

        // Get all LI elements (list is guaranteed to be an Element)
        const listItems = list.querySelectorAll('LI')

        Array.from(listItems).forEach((li, index, array) => {
            const text = li.innerHTML

            // Create paragraph for this item
            const p = document.createElement('P')
            p.innerHTML = text

            fragment.appendChild(p)

            // Add spacing between paragraphs
            if (index < array.length - 1) {
                fragment.appendChild(document.createElement('BR'))
            }
        })

        // Replace the list with converted content
        parent.replaceChild(fragment, list)
    })

    // Restore selection (best effort)
    try {
        selection.removeAllRanges()
        selection.addRange(range)
    } catch (e) {
        console.warn('Could not restore selection after list removal', e)
    }

    this.updateActiveFormat('unorderedList', false)
    this.engine.notifyStateChanges()
}
