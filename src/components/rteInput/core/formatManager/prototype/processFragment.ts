import { IFormatManager } from '../formatManager.types'

// Helper method to process a DocumentFragment and remove formatting
export const processFragment = function (
    this: IFormatManager,
    fragment: DocumentFragment,
    tagName: string
) {
    const tagNameUpper = tagName.toUpperCase()

    // Function to unwrap matching elements
    const unwrapMatchingElement = (element: Element) => {
        const parent = element.parentNode
        if (!parent) return

        // Move all child nodes to the parent, before the element
        const next = element.nextSibling
        while (element.firstChild) {
            parent.insertBefore(element.firstChild, next)
        }

        // Remove the now-empty element
        parent.removeChild(element)
    }

    // Use a TreeWalker to find all elements with the target tag
    const walker = document.createTreeWalker(fragment, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (node) => {
            return (node as Element).tagName.toUpperCase() === tagNameUpper
                ? NodeFilter.FILTER_ACCEPT
                : NodeFilter.FILTER_SKIP
        }
    })

    // Collect all matching elements first (to avoid modifying during traversal)
    const matchingElements: Element[] = []
    let currentNode = walker.nextNode()
    while (currentNode) {
        matchingElements.push(currentNode as Element)
        currentNode = walker.nextNode()
    }

    // Unwrap all matching elements from deepest to shallowest
    // This prevents issues with nested tags of the same type
    matchingElements.reverse().forEach(unwrapMatchingElement)

    return fragment
}
