/**
 * Sanitizes HTML content to prevent XSS attacks
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const sanitizeHTML = function(this: any, html: string): string {
    const div = document.createElement('div')
    div.textContent = html
    return div.innerHTML
}
