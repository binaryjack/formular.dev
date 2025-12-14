/**
 * @fileoverview Template utilities for web components
 * 
 * Provides helper functions for advanced template operations like conditional rendering,
 * loops, event handling, and template composition.
 * 
 * @version 1.0.0
 * @namespace TemplateUtils
 */

import { html, TemplateResult } from './template-engine'

/**
 * Advanced conditional rendering with multiple conditions
 * 
 * @param conditions - Array of condition objects
 * @returns Conditional template
 */
export const choose = function(conditions: Array<{ condition: boolean; template: any }>): any {
    return {
        __conditional: true,
        render() {
            for (const { condition, template } of conditions) {
                if (condition) {
                    return template
                }
            }
            return ''
        }
    }
}

/**
 * Switch-case style conditional rendering
 * 
 * @param value - Value to switch on
 * @param cases - Object mapping values to templates
 * @param defaultCase - Default template if no match
 * @returns Switch template
 */
export const switchCase = function<T>(
    value: T, 
    cases: Record<string, any>, 
    defaultCase?: any
): any {
    return {
        __conditional: true,
        render() {
            const key = String(value)
            return cases[key] ?? defaultCase ?? ''
        }
    }
}

/**
 * Async template rendering helper
 * 
 * @param asyncValue - Promise that resolves to a template
 * @param placeholder - Template to show while loading
 * @param errorTemplate - Template to show on error
 * @returns Async template
 */
export const asyncTemplate = function(
    asyncValue: Promise<any>,
    placeholder?: any,
    errorTemplate?: any
) {
    const state: {
        loading: boolean
        value: any
        error: Error | null
        __conditional: boolean
    } = {
        loading: true,
        value: null,
        error: null,
        __conditional: true
    }

    asyncValue
        .then(value => {
            state.loading = false
            state.value = value
        })
        .catch((error: Error) => {
            state.loading = false
            state.error = error
        })

    return {
        __conditional: true,
        render() {
            if (state.loading) {
                return placeholder ?? 'Loading...'
            }
            if (state.error) {
                return errorTemplate ?? `Error: ${state.error.message}`
            }
            return state.value
        }
    }
}

/**
 * Template composition helper for reusable components
 * 
 * @param baseTemplate - Base template function
 * @param slots - Named slots to insert content
 * @returns Composed template
 */
export const composeTemplate = function(
    baseTemplate: (slots: Record<string, any>) => TemplateResult,
    slots: Record<string, any>
): TemplateResult {
    return baseTemplate(slots)
}

/**
 * Slot placeholder for template composition
 * 
 * @param name - Slot name
 * @param defaultContent - Default content if slot not filled
 * @returns Slot placeholder
 */
export const slot = function(name: string, defaultContent?: any): string {
    const defaultSuffix = defaultContent ? '||' + String(defaultContent) : ''
    return `__SLOT_${name}__${defaultSuffix}`
}

/**
 * Processes slots in a template string
 * 
 * @param template - Template string with slot placeholders
 * @param slotContent - Content for each slot
 * @returns Processed template string
 */
export const processSlots = function(template: string, slotContent: Record<string, string>): string {
    return template.replace(/__SLOT_(\w+)__(\|\|.*?)?/g, (match, slotName, defaultContent) => {
        if (slotContent[slotName] !== undefined) {
            return slotContent[slotName]
        }
        if (defaultContent) {
            return defaultContent.substring(2) // Remove '||' prefix
        }
        return ''
    })
}

/**
 * Event handler factory for common UI patterns
 */
export const eventHandlers = {
    /**
     * Creates a click handler that prevents default
     * 
     * @param handler - Original click handler
     * @returns Enhanced click handler
     */
    preventDefault: (handler: (event: Event) => void) => (event: Event) => {
        event.preventDefault()
        handler(event)
    },

    /**
     * Creates a handler that stops event propagation
     * 
     * @param handler - Original handler
     * @returns Enhanced handler
     */
    stopPropagation: (handler: (event: Event) => void) => (event: Event) => {
        event.stopPropagation()
        handler(event)
    },

    /**
     * Creates a debounced event handler
     * 
     * @param handler - Original handler
     * @param delay - Debounce delay in milliseconds
     * @returns Debounced handler
     */
    debounce: (handler: (event: Event) => void, delay: number) => {
        let timeoutId: number
        return (event: Event) => {
            clearTimeout(timeoutId)
            timeoutId = window.setTimeout(() => handler(event), delay)
        }
    },

    /**
     * Creates a throttled event handler
     * 
     * @param handler - Original handler
     * @param limit - Throttle limit in milliseconds
     * @returns Throttled handler
     */
    throttle: (handler: (event: Event) => void, limit: number) => {
        let inThrottle: boolean
        return (event: Event) => {
            if (!inThrottle) {
                handler(event)
                inThrottle = true
                setTimeout(() => inThrottle = false, limit)
            }
        }
    }
}

/**
 * CSS class helper functions
 */
export const classHelpers = {
    /**
     * Conditionally applies CSS classes
     * 
     * @param classes - Object mapping class names to conditions
     * @returns Space-separated class string
     */
    conditional: (classes: Record<string, boolean>): string => {
        return Object.entries(classes)
            .filter(([_, condition]) => condition)
            .map(([className]) => className)
            .join(' ')
    },

    /**
     * Combines multiple class sources
     * 
     * @param sources - Array of class strings or objects
     * @returns Combined class string
     */
    combine: (...sources: Array<string | Record<string, boolean> | undefined>): string => {
        const classes: string[] = []
        
        for (const source of sources) {
            if (typeof source === 'string') {
                classes.push(source)
            } else if (source && typeof source === 'object') {
                classes.push(classHelpers.conditional(source))
            }
        }
        
        return classes.filter(Boolean).join(' ')
    }
}

/**
 * Style helper functions
 */
export const styleHelpers = {
    /**
     * Creates inline styles from an object
     * 
     * @param styles - Object mapping CSS properties to values
     * @returns Inline style string
     */
    inline: (styles: Record<string, string | number>): string => {
        return Object.entries(styles)
            .map(([property, value]) => `${property}: ${value}`)
            .join('; ')
    },

    /**
     * Creates CSS custom properties (variables)
     * 
     * @param variables - Object mapping variable names to values
     * @returns CSS custom properties string
     */
    variables: (variables: Record<string, string | number>): string => {
        return Object.entries(variables)
            .map(([name, value]) => `--${name}: ${value}`)
            .join('; ')
    }
}

/**
 * Template validation helpers
 */
export const validation = {
    /**
     * Validates that required properties are present
     * 
     * @param props - Properties object
     * @param required - Array of required property names
     * @throws Error if required properties are missing
     */
    requireProps: (props: Record<string, any>, required: string[]): void => {
        const missing = required.filter(prop => !(prop in props))
        if (missing.length > 0) {
            throw new Error(`Missing required properties: ${missing.join(', ')}`)
        }
    },

    /**
     * Validates prop types
     * 
     * @param props - Properties object
     * @param types - Object mapping property names to expected types
     * @throws Error if type validation fails
     */
    validateTypes: (props: Record<string, any>, types: Record<string, string>): void => {
        for (const [prop, expectedType] of Object.entries(types)) {
            if (prop in props) {
                const actualType = typeof props[prop]
                if (actualType !== expectedType) {
                    throw new Error(`Property '${prop}' expected ${expectedType}, got ${actualType}`)
                }
            }
        }
    }
}

/**
 * Common template patterns
 */
export const patterns = {
    /**
     * Loading state template
     * 
     * @param isLoading - Loading state
     * @param content - Content to show when not loading
     * @param loadingMessage - Custom loading message
     * @returns Loading template
     */
    loading: (isLoading: boolean, content: any, loadingMessage = 'Loading...') => {
        const loadingTemplate = html`<div class="loading">${loadingMessage}</div>`
        const result = isLoading ? loadingTemplate : content
        return {
            html: typeof result === 'object' && result.html ? result.html : String(result),
            __isTemplate: true
        }
    },

    /**
     * Error boundary template
     * 
     * @param error - Error object or null
     * @param content - Content to show when no error
     * @param errorTemplate - Custom error template
     * @returns Error boundary template
     */
    errorBoundary: (error: Error | null, content: any, errorTemplate?: any) => {
        const result = error 
            ? (errorTemplate ?? html`<div class="error">Error: ${error.message}</div>`)
            : content
        return {
            html: typeof result === 'object' && result.html ? result.html : String(result),
            __isTemplate: true
        }
    },

    /**
     * Empty state template
     * 
     * @param items - Array to check for emptiness
     * @param content - Content to show when not empty
     * @param emptyMessage - Message to show when empty
     * @returns Empty state template
     */
    emptyState: (items: any[], content: any, emptyMessage = 'No items found') => {
        const result = items.length > 0 
            ? content 
            : html`<div class="empty-state">${emptyMessage}</div>`
        return {
            html: typeof result === 'object' && result.html ? result.html : String(result),
            __isTemplate: true
        }
    },

    /**
     * Card template pattern
     * 
     * @param title - Card title
     * @param content - Card content
     * @param actions - Optional actions
     * @returns Card template
     */
    card: (title: string, content: any, actions?: any) => html`
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">${title}</h3>
            </div>
            <div class="card-content">
                ${content}
            </div>
            ${actions ? html`<div class="card-actions">${actions}</div>` : ''}
        </div>
    `
}

/**
 * Animation and transition helpers
 */
export const animations = {
    /**
     * Fade in animation
     * 
     * @param element - Element to animate
     * @param duration - Animation duration in milliseconds
     * @returns Promise that resolves when animation completes
     */
    fadeIn: (element: HTMLElement, duration = 300): Promise<void> => {
        return new Promise(resolve => {
            element.style.opacity = '0'
            element.style.transition = `opacity ${duration}ms ease-in-out`
            
            requestAnimationFrame(() => {
                element.style.opacity = '1'
                setTimeout(resolve, duration)
            })
        })
    },

    /**
     * Slide down animation
     * 
     * @param element - Element to animate
     * @param duration - Animation duration in milliseconds
     * @returns Promise that resolves when animation completes
     */
    slideDown: (element: HTMLElement, duration = 300): Promise<void> => {
        return new Promise(resolve => {
            const height = element.scrollHeight
            element.style.height = '0'
            element.style.overflow = 'hidden'
            element.style.transition = `height ${duration}ms ease-in-out`
            
            requestAnimationFrame(() => {
                element.style.height = `${height}px`
                setTimeout(() => {
                    element.style.height = ''
                    element.style.overflow = ''
                    element.style.transition = ''
                    resolve()
                }, duration)
            })
        })
    }
}

/**
 * Accessibility helpers
 */
export const a11y = {
    /**
     * Creates ARIA attributes for better accessibility
     * 
     * @param options - ARIA options
     * @returns Object with ARIA attributes
     */
    aria: (options: {
        label?: string
        describedBy?: string
        expanded?: boolean
        hidden?: boolean
        live?: 'polite' | 'assertive' | 'off'
        atomic?: boolean
    }) => {
        const attrs: Record<string, string> = {}
        
        if (options.label) attrs['aria-label'] = options.label
        if (options.describedBy) attrs['aria-describedby'] = options.describedBy
        if (options.expanded !== undefined) attrs['aria-expanded'] = String(options.expanded)
        if (options.hidden !== undefined) attrs['aria-hidden'] = String(options.hidden)
        if (options.live) attrs['aria-live'] = options.live
        if (options.atomic !== undefined) attrs['aria-atomic'] = String(options.atomic)
        
        return attrs
    },

    /**
     * Creates proper button attributes
     * 
     * @param options - Button options
     * @returns Template for button attributes
     */
    button: (options: {
        disabled?: boolean
        pressed?: boolean
        expanded?: boolean
    } = {}) => {
        const attrs = []
        if (options.disabled) attrs.push('disabled')
        if (options.pressed !== undefined) attrs.push(`aria-pressed="${options.pressed}"`)
        if (options.expanded !== undefined) attrs.push(`aria-expanded="${options.expanded}"`)
        return attrs.join(' ')
    }
}
