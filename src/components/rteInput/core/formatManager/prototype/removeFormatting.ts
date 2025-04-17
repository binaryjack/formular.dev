import { FormatsEnum, tagMap } from '../../rteInput.types'
import { IFormatManager } from '../formatManager.types'

export interface IRelatives {
    id: number
    parent: ParentNode
    child: Node
}

export const addRelatives = (list: IRelatives[], parent: ParentNode, child: Node) => {
    list.push({ id: list.length, parent: parent, child: child })
}

export const removeFormatting = function (this: IFormatManager, formatType: string) {
    // Get the current selection
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    // Get the active range
    const range = selection.getRangeAt(0)
    if (range.collapsed) return

    // Special case for lists
    if (formatType === FormatsEnum.unorderedList) {
        this.removeListFormatting(range, selection)
        return
    }

    // Get the tag name to remove
    const tagName = tagMap[formatType]
    if (!tagName) return

    // Special case: Check if selection is entirely inside a formatted element
    // This handles the case where you select just a formatted character
    const checkFormatParent = (node: Node): boolean => {
        let current = node.parentNode
        while (current && current !== this.editorElement) {
            if (
                current.nodeType === Node.ELEMENT_NODE &&
                (current as Element).tagName.toUpperCase() === tagName.toUpperCase()
            ) {
                return true
            }
            current = current.parentNode
        }
        return false
    }

    // If selection start and end are inside the same formatted element,
    // we need a different approach
    const startInFormat = checkFormatParent(range.startContainer)
    const endInFormat = checkFormatParent(range.endContainer)

    if (startInFormat && endInFormat) {
        console.log('Selection entirely within formatted element - special handling')

        try {
            // Mark the selection edges with temporary spans
            const startMarker = document.createElement('span')
            startMarker.id = 'selection-start'
            const endMarker = document.createElement('span')
            endMarker.id = 'selection-end'

            // Insert markers at start and end of selection
            const startRange = range.cloneRange()
            startRange.collapse(true)
            startRange.insertNode(startMarker)

            const endRange = range.cloneRange()
            endRange.collapse(false)
            endRange.insertNode(endMarker)

            // Find the nearest formatted parent element
            let formattedParent = startMarker.parentNode
            while (formattedParent && formattedParent !== this.editorElement) {
                if (
                    formattedParent.nodeType === Node.ELEMENT_NODE &&
                    (formattedParent as Element).tagName.toUpperCase() === tagName.toUpperCase()
                ) {
                    break
                }
                formattedParent = formattedParent.parentNode
            }

            if (formattedParent && formattedParent.nodeType === Node.ELEMENT_NODE) {
                // Unwrap the formatted parent, maintaining children
                const parent = formattedParent.parentNode
                if (parent) {
                    const nextSibling = formattedParent.nextSibling
                    while (formattedParent.firstChild) {
                        parent.insertBefore(formattedParent.firstChild, nextSibling)
                    }
                    parent.removeChild(formattedParent)
                }
            }

            // Restore selection using markers
            const newRange = document.createRange()
            const newStartMarker = document.getElementById('selection-start')
            const newEndMarker = document.getElementById('selection-end')

            if (newStartMarker && newEndMarker) {
                newRange.setStartAfter(newStartMarker)
                newRange.setEndBefore(newEndMarker)

                // Remove markers
                newStartMarker.parentNode?.removeChild(newStartMarker)
                newEndMarker.parentNode?.removeChild(newEndMarker)

                // Apply new selection
                selection.removeAllRanges()
                selection.addRange(newRange)
            }
        } catch (e) {
            console.error('Failed to remove formatting with special case:', e)
        }
    } else {
        // Regular case - selection spans multiple elements or is outside formatting
        // Save original selection points
        const savedRange = {
            startContainer: range.startContainer,
            startOffset: range.startOffset,
            endContainer: range.endContainer,
            endOffset: range.endOffset
        }

        try {
            // Use existing fragment-based approach
            const workingRange = range.cloneRange()
            const fragment = workingRange.extractContents()

            // Process the fragment to remove formatting
            this.processFragment(fragment, tagName)

            // Insert the processed fragment back
            workingRange.insertNode(fragment)

            // Normalize to merge adjacent text nodes
            if (workingRange.commonAncestorContainer.nodeType === Node.ELEMENT_NODE) {
                ;(workingRange.commonAncestorContainer as Element).normalize()
            }

            // Try to restore selection
            try {
                const newRange = document.createRange()
                newRange.setStart(savedRange.startContainer, savedRange.startOffset)
                newRange.setEnd(savedRange.endContainer, savedRange.endOffset)
                selection.removeAllRanges()
                selection.addRange(newRange)
            } catch (e) {
                console.warn('Could not restore exact selection, using approximation', e)
                selection.removeAllRanges()
                selection.addRange(workingRange)
            }
        } catch (error) {
            console.error('Error removing format:', error)
        }
    }

    // Update state and notify UI
    this.updateActiveFormat(formatType, false)
    this.engine.notifyStateChanges()
}

// const splitRange = (range: Range) => {
//     const startContainer = range.startContainer
//     const endContainer = range.endContainer

//     if (startContainer === endContainer && startContainer.nodeType === Node.TEXT_NODE) {
//         const textNode = startContainer as Text
//         const textContent = textNode.nodeValue || ''
//         const startOffset = range.startOffset
//         const endOffset = range.endOffset

//         if (startOffset > 0) {
//             const beforeText = textContent.slice(0, startOffset)
//             const beforeNode = document.createTextNode(beforeText)
//             textNode.parentNode?.insertBefore(beforeNode, textNode)
//         }

//         if (endOffset < textContent.length) {
//             const afterText = textContent.slice(endOffset)
//             const afterNode = document.createTextNode(afterText)
//             textNode.parentNode?.insertBefore(afterNode, textNode.nextSibling)
//         }

//         const selectedText = textContent.slice(startOffset, endOffset)
//         const selectedNode = document.createTextNode(selectedText)
//         textNode.parentNode?.replaceChild(selectedNode, textNode)

//         range.selectNode(selectedNode)
//     }
// }

// // Add removeFormatting method
// export const removeFormatting = function (this: IRteCommandManager, formatType: string) {
//     const selection = window.getSelection()
//     if (!selection || selection.rangeCount === 0) return

//     const range = selection.getRangeAt(0)
//     splitRange(range)
//     if (range.collapsed) return

//     const tagName = tagMap[formatType]
//     if (!tagName) return

//     const relatives: IRelatives[] = []

//     const traverseNodes = (node: Node) => {
//         if (
//             node.nodeType === Node.ELEMENT_NODE &&
//             (node as HTMLElement).tagName === tagName.toUpperCase()
//         ) {
//             addRelatives(relatives, node.parentNode as ParentNode, node)
//         }

//         for (let child = node.firstChild; child; child = child.nextSibling) {
//             traverseNodes(child)
//         }
//     }

//     traverseNodes(range.commonAncestorContainer)

//     relatives.forEach(({ parent, child }) => {
//         if (parent) {
//             while (child.firstChild) {
//                 parent.insertBefore(child.firstChild, child)
//             }
//             parent.removeChild(child)
//         }
//     })

//     // Update selection
//     selection.removeAllRanges()
//     selection.addRange(range)

//     // Notify observers about the change
//     this.notifyStateChanges()
// }
