import { FormatsArray, TagsArray } from '../../rti-engine.types'
import { IFormatManager } from '../format-manager.types'

export const checkForAnyAppliedFormat = function (this: IFormatManager) {
    const selection = window.getSelection()

    // Reset format state first
    FormatsArray.forEach((format) => {
        this.updateActiveFormat(format, false)
    })

    if (!selection || selection.rangeCount === 0) return false

    const range = selection.getRangeAt(0)
    if (range.collapsed) return false

    // Create an object to track formatting
    const isFormattedTags: Record<string, number> = {}
    TagsArray.forEach((tag) => {
        isFormattedTags[tag] = 0
    })

    let hasFormatted = false

    // Check if common ancestor has formatting or is a formatted element
    let commonAncestor: Node | null = range.commonAncestorContainer

    // If the common ancestor is a text node, we need to check its parent
    if (commonAncestor?.nodeType === Node.TEXT_NODE) {
        commonAncestor = commonAncestor.parentNode
    }

    // Check the common ancestor and its parent chain for formatting
    let currentNode = commonAncestor
    while (currentNode && currentNode !== this.editorElement) {
        if (currentNode.nodeType === Node.ELEMENT_NODE) {
            const tagName = (currentNode as Element).tagName.toUpperCase()
            for (const tag of TagsArray) {
                if (tagName === tag.toUpperCase()) {
                    hasFormatted = true
                    isFormattedTags[tag]++
                }
            }
        }
        currentNode = currentNode.parentNode
    }

    // Standard approach for other selections
    if (!hasFormatted) {
        // Use TreeWalker to check all text nodes in the selection
        const walker = document.createTreeWalker(
            range.commonAncestorContainer,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function (node) {
                    // Only process nodes that are at least partially within the selection
                    if (range.intersectsNode(node)) {
                        return NodeFilter.FILTER_ACCEPT
                    }
                    return NodeFilter.FILTER_SKIP
                }
            }
        )

        let node
        // For each text node in the selection...
        while ((node = walker.nextNode())) {
            // Check all its ancestor nodes for formatting tags
            let currentNode: Node | null = node
            while (currentNode && currentNode !== this.editorElement) {
                const parent: ParentNode | null = currentNode.parentNode
                if (!parent) break

                if (parent.nodeType === Node.ELEMENT_NODE) {
                    for (const tag of TagsArray) {
                        const parentTagName = (parent as Element).tagName.toUpperCase()
                        const isFormatted = parentTagName === tag.toUpperCase()

                        if (isFormatted) {
                            hasFormatted = true
                            isFormattedTags[tag]++
                        }
                    }
                }
                currentNode = parent
            }
        }
    }

    // Consider a format active if at least one text node has it
    for (const [tag, count] of Object.entries(isFormattedTags)) {
        this.updateActiveFormat(tag, count > 0)
    }

    this.engine.notifyStateChanges()
    return hasFormatted
}
