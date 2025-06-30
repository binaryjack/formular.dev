/**
 * Processes event listeners in a template fragment
 * Following CONTRIBUTING.md: Prototype method in individual file
 */
export const processEventListeners = function(
    this: any,
    fragment: DocumentFragment, 
    eventListeners: Map<string, EventListener>,
    componentId?: string
): void {
    eventListeners.forEach((listener, listenerId) => {
        // Find elements with this listener ID
        const elements = fragment.querySelectorAll(`[data-event-id="${listenerId}"]`)
        
        elements.forEach(element => {
            // Extract event type from listener ID
            const eventTypeMatch = /__event_(\w+)_/.exec(listenerId)
            if (eventTypeMatch) {
                const eventType = eventTypeMatch[1]
                
                // Add event listener
                element.addEventListener(eventType, listener)
                
                // Remove the temporary attribute
                element.removeAttribute('data-event-id')
                
                // Add debug info if component ID provided
                if (componentId) {
                    element.setAttribute('data-component', componentId)
                    element.setAttribute('data-event', eventType)
                }
            }
        })
    })
}
