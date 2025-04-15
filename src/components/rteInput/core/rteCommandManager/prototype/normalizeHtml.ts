import { IRteCommandManager } from '../rteCommandManager.types'

export const normalizeHtml = function (this: IRteCommandManager): void {
    if (!this.editorElement) return

    // Save selection state
    const selection = window.getSelection()
    if (!selection) return

    // Store selection info for restoration later
    let selectionInfo = null
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        selectionInfo = {
            startContainer: range.startContainer,
            startOffset: range.startOffset,
            endContainer: range.endContainer,
            endOffset: range.endOffset
        }
    }

    // 1. Use the browser's built-in normalize to merge adjacent text nodes
    this.editorElement.normalize()

    // 2. Remove empty formatting elements (but preserve whitespace!)
    const removeEmptyElements = (parent: Element) => {
        const emptyElements = []

        // Only target formatting elements
        const formatTags = ['STRONG', 'B', 'EM', 'I', 'U', 'SPAN']

        // Find candidate empty elements
        for (const tag of formatTags) {
            const elements = parent.querySelectorAll(tag)
            for (const el of elements) {
                // Check if it has no text content (after trimming whitespace)
                if (!el.textContent || el.textContent.trim() === '') {
                    emptyElements.push(el)
                }
            }
        }

        // Remove empty elements (from deepest to shallowest)
        emptyElements
            .sort((a, b) => {
                // Sort by depth (deepest first)
                return b.querySelectorAll('*').length - a.querySelectorAll('*').length
            })
            .forEach((el) => {
                if (el.parentNode) {
                    el.parentNode.removeChild(el)
                }
            })
    }

    // 3. Flatten nested identical formatting tags
    const flattenNestedTags = (parent: Element) => {
        // Only process one level at a time (multiple passes may be needed)
        const formatTags = ['STRONG', 'B', 'EM', 'I', 'U']

        for (const tag of formatTags) {
            const elements = parent.querySelectorAll(tag)

            for (const el of elements) {
                if (!el.parentNode) continue

                // Find direct child elements with the same tag
                const sameTagChildren = Array.from(el.children).filter(
                    (child) => child.tagName === el.tagName
                )

                // For each nested tag of the same type
                for (const child of sameTagChildren) {
                    // Move the child's contents into the parent before the child
                    while (child.firstChild) {
                        el.insertBefore(child.firstChild, child)
                    }

                    // Remove the now-empty child
                    el.removeChild(child)
                }
            }
        }
    }

    // 4. Merge adjacent identical formatting elements
    const mergeAdjacentTags = (parent: Element) => {
        // Process multiple times to catch all cases
        let madeChanges = true
        const maxIterations = 3
        let iteration = 0

        while (madeChanges && iteration < maxIterations) {
            madeChanges = false
            iteration++

            // Query all elements of formatting tags
            const formatTags = ['STRONG', 'B', 'EM', 'I', 'U']

            for (const tag of formatTags) {
                const elements = Array.from(parent.querySelectorAll(tag))

                for (let i = 0; i < elements.length - 1; i++) {
                    const current = elements[i]
                    const next = elements[i + 1]

                    // Check if elements are adjacent (no text in between)
                    if (current.nextSibling === next && current.parentNode === next.parentNode) {
                        // Move all content from next to current
                        while (next.firstChild) {
                            current.appendChild(next.firstChild)
                        }

                        // Remove the empty next element
                        if (next.parentNode) {
                            next.parentNode.removeChild(next)
                        }

                        madeChanges = true
                        break // Restart the loop
                    }
                }

                if (madeChanges) break
            }
        }
    }

    // Apply the normalization functions
    removeEmptyElements(this.editorElement)
    flattenNestedTags(this.editorElement)
    mergeAdjacentTags(this.editorElement)

    // Restore selection after normalization
    if (selectionInfo) {
        try {
            const newRange = document.createRange()

            // Try to restore the exact position
            newRange.setStart(selectionInfo.startContainer, selectionInfo.startOffset)
            newRange.setEnd(selectionInfo.endContainer, selectionInfo.endOffset)

            selection.removeAllRanges()
            selection.addRange(newRange)
        } catch (e) {
            console.warn('Could not restore exact cursor position', e)
            // If restoration fails, try to at least position in the editor
            try {
                // Place cursor at beginning as fallback
                const range = document.createRange()
                const firstTextNode = getFirstTextNode(this.editorElement)

                if (firstTextNode) {
                    range.setStart(firstTextNode, 0)
                    range.setEnd(firstTextNode, 0)
                    selection.removeAllRanges()
                    selection.addRange(range)
                }
            } catch (e2) {
                console.error('Failed to restore cursor position', e2)
            }
        }
    }

    // Helper: Find the first text node in an element
    function getFirstTextNode(element: Node): Node | null {
        if (element.nodeType === Node.TEXT_NODE) {
            return element
        }

        for (const c of element.childNodes) {
            const found = getFirstTextNode(c)
            if (found) return found
        }

        return null
    }
}
