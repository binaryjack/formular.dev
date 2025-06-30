import { ITemplateResult } from '../../interfaces/i-template-result'

/**
 * Template literal tag function for creating HTML templates
 * Following CONTRIBUTING.md: Prototype method in individual file
 * 
 * Usage:
 * ```typescript
 * const template = html`
 *   <div class="component">
 *     <h1>${title}</h1>
 *     <button @click=${handleClick}>Click me</button>
 *   </div>
 * `
 * ```
 */
export const html = function(this: any, strings: TemplateStringsArray, ...values: any[]): ITemplateResult {
    let htmlString = ''
    const eventListeners = new Map<string, EventListener>()
    let hasConditionals = false
    let hasLoops = false
    let hasEvents = false

    // Process template strings and values
    for (let i = 0; i < strings.length; i++) {
        htmlString += strings[i]
        
        if (i < values.length) {
            const value = values[i]
            
            // Check for event listeners (functions with @ prefixed attributes)
            if (typeof value === 'function') {
                const regex = /@(\w+)=["']?$/
                const eventMatch = regex.exec(strings[i])
                if (eventMatch) {
                    const eventType = eventMatch[1]
                    const listenerId = `__event_${eventType}_${i}`
                    eventListeners.set(listenerId, value)
                    htmlString += `" data-event-id="${listenerId}"`
                    hasEvents = true
                } else {
                    htmlString += String(value)
                }
            }
            // Check for conditional expressions
            else if (value && typeof value === 'object' && value.__conditional) {
                htmlString += value.render()
                hasConditionals = true
            }
            // Check for loop expressions
            else if (Array.isArray(value) && (value as any).__isTemplate) {
                htmlString += value.join('')
                hasLoops = true
            }
            // Regular interpolation
            else {
                htmlString += value !== null && value !== undefined ? String(value) : ''
            }
        }
    }

    return {
        html: htmlString,
        values,
        eventListeners,
        metadata: {
            hasConditionals,
            hasLoops,
            hasEvents
        }
    }
}
