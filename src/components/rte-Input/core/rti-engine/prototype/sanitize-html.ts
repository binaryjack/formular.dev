import { IRtiEngine } from '../rti-engine.types'

export const sanitizeHtml = function (this: IRtiEngine): void {
    if (!this.editorElement) return

    // Get current HTML content
    const currentHtml = this.editorElement.innerHTML

    // Create a temporary div to work with the HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = currentHtml

    // List of allowed tags (whitelist approach)
    const allowedTags = [
        'P',
        'DIV',
        'SPAN',
        'BR',
        'STRONG',
        'B',
        'EM',
        'I',
        'U',
        'UL',
        'OL',
        'LI',
        'BLOCKQUOTE',
        'CODE',
        'PRE'
    ]

    // List of allowed attributes
    const allowedAttributes = ['class', 'id', 'style']

    // List of allowed style properties
    const allowedStyles = [
        'color',
        'background-color',
        'font-family',
        'font-size',
        'font-weight',
        'text-align',
        'text-decoration',
        'margin',
        'padding'
    ]

    // Function to sanitize nodes recursively
    const sanitizeNode = (node: Node) => {
        // Skip text nodes and comments
        if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.COMMENT_NODE) {
            return true // Keep the node
        }

        // Handle element nodes
        if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement
            const tagName = element.tagName.toUpperCase()

            // Check if this tag is allowed
            if (!allowedTags.includes(tagName)) {
                // Not allowed - replace with its contents
                while (element.firstChild) {
                    element.parentNode?.insertBefore(element.firstChild, element)
                }
                element.parentNode?.removeChild(element)
                return false // Node was removed
            }

            // Sanitize attributes
            Array.from(element.attributes).forEach((attr) => {
                const attrName = attr.name.toLowerCase()

                // Remove event handlers (on*)
                if (attrName.startsWith('on') || !allowedAttributes.includes(attrName)) {
                    element.removeAttribute(attrName)
                }

                // Handle style attribute separately
                if (attrName === 'style') {
                    const sanitizedStyles = element.style.cssText
                        .split(';')
                        .filter((stylePart) => {
                            const [property] = stylePart.split(':')
                            const propertyName = property?.trim().toLowerCase()
                            return propertyName && allowedStyles.includes(propertyName)
                        })
                        .join(';')

                    if (sanitizedStyles) {
                        element.style.cssText = sanitizedStyles
                    } else {
                        element.removeAttribute('style')
                    }
                }

                // Handle href and src attributes - prevent javascript: URLs
                if (attrName === 'href' || attrName === 'src') {
                    const value = attr.value.toLowerCase().trim()
                    if (value.startsWith('javascript:') || value.startsWith('data:')) {
                        element.removeAttribute(attrName)
                    }
                }
            })

            // Process children
            Array.from(element.childNodes).forEach((child) => {
                sanitizeNode(child)
            })

            return true // Keep this node (now sanitized)
        }

        // For other node types, remove them
        if (node.parentNode) {
            node.parentNode.removeChild(node)
        }
        return false // Node was removed
    }

    // Sanitize all nodes in the temporary div
    Array.from(tempDiv.childNodes).forEach((node) => {
        sanitizeNode(node)
    })

    // Update the editor with sanitized content
    this.editorElement.innerHTML = tempDiv.innerHTML
}
