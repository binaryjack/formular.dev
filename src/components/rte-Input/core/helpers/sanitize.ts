import DOMPurify from 'dompurify' // Add this import
// Add this helper function
export const sanitize = (content: string, isHtml: boolean): string => {
    // Configure DOMPurify
    const purifyConfig = {
        ALLOWED_TAGS: [
            'p',
            'div',
            'span',
            'br',
            'b',
            'i',
            'em',
            'strong',
            'u',
            's',
            'ul',
            'ol',
            'li',
            'a',
            'blockquote',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6'
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel'],
        FORBID_TAGS: ['script', 'style', 'iframe', 'form', 'input', 'button'],
        KEEP_CONTENT: true
    }

    // Sanitize the HTML
    let sanitized = DOMPurify.sanitize(content, purifyConfig)

    // If it was plain text that we converted to HTML, unwrap any divs/paragraphs
    // that might have been introduced by the sanitizer if they only contain text
    if (!isHtml) {
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = sanitized

        // If there's only one block element with no formatting, just use its text content
        if (
            tempDiv.children.length === 1 &&
            ['DIV', 'P'].includes(tempDiv.children[0].tagName) &&
            !tempDiv.children[0].querySelector('b, strong, i, em, u, s')
        ) {
            sanitized = tempDiv.textContent || ''
        }
    }

    return sanitized
}
