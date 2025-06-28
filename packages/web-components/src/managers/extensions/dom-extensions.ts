/**
 * DOM Extensions for Web Components
 * Following CONTRIBUTING.md: Using prototype-based approach
 * 
 * Extends DomManager with web component specific functionality:
 * - Shadow DOM management
 * - Template creation and cloning
 * - Component element tracking
 * - Mutation observation
 * - DOM tree inspection for debugging
 */

/**
 * Component tracking interface for debugging and lifecycle management
 */
interface ComponentRegistration {
    id: string
    element: HTMLElement
    shadowRoot?: ShadowRoot
    template?: HTMLTemplateElement
    registeredAt: Date
    lastUpdate?: Date
}

/**
 * Template cache for performance optimization
 */
interface TemplateCache {
    html: string
    styles?: string
    template: HTMLTemplateElement
    createdAt: Date
}

/**
 * Web Component DOM Extensions
 * These methods extend the DomManager with web component specific capabilities
 */
export const WebComponentDOMExtensions = {
    // Component registry for tracking and debugging
    _componentRegistry: new Map<string, ComponentRegistration>(),
    _templateCache: new Map<string, TemplateCache>(),
    _mutationObserver: null as MutationObserver | null,

    /**
     * Creates a shadow root for the given element with specified options
     * @param element - The element to attach shadow DOM to
     * @param options - Shadow DOM options (mode, delegatesFocus, etc.)
     * @returns The created shadow root
     */
    createShadowRoot: function(element: HTMLElement, options: ShadowRootInit = { mode: 'open' }): ShadowRoot {
        if (element.shadowRoot) {
            console.warn('Element already has a shadow root')
            return element.shadowRoot
        }

        try {
            const shadowRoot = element.attachShadow(options)
            
            // Track shadow root creation for debugging
            const componentId = element.getAttribute('data-component-id') ?? element.tagName.toLowerCase()
            const registration = this._componentRegistry.get(componentId)
            if (registration) {
                registration.shadowRoot = shadowRoot
                registration.lastUpdate = new Date()
            }

            return shadowRoot
        } catch (error) {
            console.error('Failed to create shadow root:', error)
            throw error
        }
    },

    /**
     * Creates a template element with HTML and optional styles
     * @param html - The HTML content for the template
     * @param styles - Optional CSS styles to include
     * @param cacheKey - Optional cache key for template reuse
     * @returns The created template element
     */
    createTemplate: function(html: string, styles?: string, cacheKey?: string): HTMLTemplateElement {
        // Check cache first if cache key provided
        if (cacheKey && this._templateCache.has(cacheKey)) {
            const cached = this._templateCache.get(cacheKey)!
            if (cached.html === html && cached.styles === styles) {
                return cached.template.cloneNode(true) as HTMLTemplateElement
            }
        }

        const template = document.createElement('template')
        
        let content = html
        if (styles) {
            content = `<style>${styles}</style>${html}`
        }
        
        template.innerHTML = content

        // Cache the template if cache key provided
        if (cacheKey) {
            this._templateCache.set(cacheKey, {
                html,
                styles,
                template: template.cloneNode(true) as HTMLTemplateElement,
                createdAt: new Date()
            })
        }

        return template
    },

    /**
     * Clones a template and returns its content
     * @param template - The template element to clone
     * @returns The cloned template content
     */
    cloneTemplate: function(template: HTMLTemplateElement): DocumentFragment {
        return template.content.cloneNode(true) as DocumentFragment
    },

    /**
     * Registers a component for tracking and debugging
     * @param componentId - Unique identifier for the component
     * @param element - The component element
     * @param template - Optional template associated with the component
     */
    registerComponent: function(componentId: string, element: HTMLElement, template?: HTMLTemplateElement): void {
        const registration: ComponentRegistration = {
            id: componentId,
            element,
            template,
            registeredAt: new Date()
        }

        // Add data attribute for debugging
        element.setAttribute('data-component-id', componentId)
        
        this._componentRegistry.set(componentId, registration)
    },

    /**
     * Unregisters a component and cleans up tracking
     * @param componentId - The component ID to unregister
     */
    unregisterComponent: function(componentId: string): void {
        const registration = this._componentRegistry.get(componentId)
        if (registration) {
            // Clean up data attribute
            registration.element.removeAttribute('data-component-id')
            this._componentRegistry.delete(componentId)
        }
    },

    /**
     * Gets component registration for debugging
     * @param componentId - The component ID to look up
     * @returns The component registration or undefined
     */
    getComponentRegistration: function(componentId: string): ComponentRegistration | undefined {
        return this._componentRegistry.get(componentId)
    },

    /**
     * Gets all registered components for debugging
     * @returns Array of all component registrations
     */
    getAllComponents: function(): ComponentRegistration[] {
        return Array.from(this._componentRegistry.values())
    },

    /**
     * Creates a detailed DOM tree representation for debugging
     * @param element - The root element to inspect
     * @param maxDepth - Maximum depth to traverse (default: 5)
     * @returns Object representing the DOM tree structure
     */
    getElementTree: function(element: HTMLElement, maxDepth: number = 5): any {
        const getNodeInfo = (node: Element, depth: number): any => {
            if (depth >= maxDepth) {
                return { tagName: node.tagName, truncated: true }
            }

            const info: any = {
                tagName: node.tagName,
                id: node.id || undefined,
                className: node.className || undefined,
                attributes: {},
                children: []
            }

            // Capture important attributes
            for (const attr of node.attributes) {
                if (attr.name.startsWith('data-') || ['role', 'aria-', 'title'].some(prefix => attr.name.startsWith(prefix))) {
                    info.attributes[attr.name] = attr.value
                }
            }

            // Process children
            for (const child of node.children) {
                info.children.push(getNodeInfo(child, depth + 1))
            }

            return info
        }

        return getNodeInfo(element, 0)
    },

    /**
     * Starts mutation observation for component changes
     * @param callback - Callback to handle mutations
     * @param options - Mutation observer options
     */
    startMutationObserver: function(
        callback: (mutations: MutationRecord[]) => void,
        options: MutationObserverInit = {
            childList: true,
            attributes: true,
            subtree: true,
            attributeFilter: ['data-component-id', 'class', 'style']
        }
    ): void {
        if (this._mutationObserver) {
            this.stopMutationObserver()
        }

        this._mutationObserver = new MutationObserver(callback)
        this._mutationObserver.observe(document.body, options)
    },

    /**
     * Stops mutation observation
     */
    stopMutationObserver: function(): void {
        if (this._mutationObserver) {
            this._mutationObserver.disconnect()
            this._mutationObserver = null
        }
    },

    /**
     * Performs batched DOM operations for performance
     * @param callback - Function containing DOM operations to batch
     * @returns The result of the callback function
     */
    batchOperation: function<T>(callback: () => T): T {
        // Use requestAnimationFrame for batching
        return new Promise<T>((resolve) => {
            requestAnimationFrame(() => {
                resolve(callback())
            })
        }) as any
    },

    /**
     * Clears template cache (useful for development)
     * @param olderThan - Optional date to clear templates older than
     */
    clearTemplateCache: function(olderThan?: Date): void {
        if (olderThan) {
            for (const [key, cached] of this._templateCache.entries()) {
                if (cached.createdAt < olderThan) {
                    this._templateCache.delete(key)
                }
            }
        } else {
            this._templateCache.clear()
        }
    },

    /**
     * Gets cache statistics for debugging
     */
    getCacheStats: function(): { templateCacheSize: number, componentCount: number } {
        return {
            templateCacheSize: this._templateCache.size,
            componentCount: this._componentRegistry.size
        }
    }
}
