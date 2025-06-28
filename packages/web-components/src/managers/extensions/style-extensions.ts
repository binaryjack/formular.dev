/**
 * Style Extensions for Web Components
 * Following CONTRIBUTING.md: Using prototype-based approach
 * 
 * Extends StyleManager with web component specific functionality:
 * - Component-scoped styles in Shadow DOM
 * - CSS custom properties management
 * - Dynamic theme switching
 * - Style debugging utilities
 * - CSS-in-JS generation
 */

/**
 * Component style registration for tracking and debugging
 */
interface ComponentStyleRegistration {
    componentId: string
    shadowRoot: ShadowRoot
    styleElement?: HTMLStyleElement
    cssVariables: Map<string, string>
    theme?: string
    registeredAt: Date
}

/**
 * Theme definition interface
 */
interface ThemeDefinition {
    name: string
    variables: Record<string, string>
    description?: string
}

/**
 * Web Component Style Extensions
 * These methods extend the StyleManager with web component specific capabilities
 */
export const WebComponentStyleExtensions = {
    // Component style registry for tracking
    _componentStyles: new Map<string, ComponentStyleRegistration>(),
    _themes: new Map<string, ThemeDefinition>(),
    _globalCSSVariables: new Map<string, string>(),

    /**
     * Adds component-scoped styles to a shadow root
     * @param componentId - Unique identifier for the component
     * @param styles - CSS styles as string or style object
     * @param shadowRoot - The shadow root to apply styles to
     * @param merge - Whether to merge with existing styles (default: false)
     */
    addComponentStyles: function(
        componentId: string,
        styles: string | Record<string, any>,
        shadowRoot: ShadowRoot,
        merge: boolean = false
    ): void {
        let cssText: string

        if (typeof styles === 'string') {
            cssText = styles
        } else {
            cssText = this.generateCSS(styles)
        }

        let registration = this._componentStyles.get(componentId)
        
        if (!registration) {
            registration = {
                componentId,
                shadowRoot,
                cssVariables: new Map(),
                registeredAt: new Date()
            }
            this._componentStyles.set(componentId, registration)
        }

        // Find or create style element
        let styleElement = registration.styleElement
        if (!styleElement) {
            styleElement = document.createElement('style')
            styleElement.setAttribute('data-component-id', componentId)
            shadowRoot.appendChild(styleElement)
            registration.styleElement = styleElement
        }

        // Apply styles
        if (merge && styleElement.textContent) {
            styleElement.textContent += '\n' + cssText
        } else {
            styleElement.textContent = cssText
        }
    },

    /**
     * Updates component styles
     * @param componentId - The component to update
     * @param newStyles - New styles to apply
     */
    updateComponentStyles: function(componentId: string, newStyles: string | Record<string, any>): void {
        const registration = this._componentStyles.get(componentId)
        if (!registration) {
            console.warn(`Component ${componentId} not found in style registry`)
            return
        }

        this.addComponentStyles(componentId, newStyles, registration.shadowRoot, false)
    },

    /**
     * Sets a CSS custom property (CSS variable) within a specific scope
     * @param name - The CSS variable name (without --)
     * @param value - The CSS variable value
     * @param scope - The scope: 'global', 'component:id', or specific element
     */
    setCSSVariable: function(name: string, value: string, scope: string | HTMLElement = 'global'): void {
        const varName = name.startsWith('--') ? name : `--${name}`

        if (scope === 'global') {
            document.documentElement.style.setProperty(varName, value)
            this._globalCSSVariables.set(name, value)
        } else if (typeof scope === 'string' && scope.startsWith('component:')) {
            const componentId = scope.replace('component:', '')
            const registration = this._componentStyles.get(componentId)
            
            if (registration) {
                (registration.shadowRoot.host as HTMLElement).style.setProperty(varName, value)
                registration.cssVariables.set(name, value)
            }
        } else if (scope instanceof HTMLElement) {
            scope.style.setProperty(varName, value)
        }
    },

    /**
     * Gets a CSS custom property value from a specific scope
     * @param name - The CSS variable name (without --)
     * @param scope - The scope to read from
     * @returns The CSS variable value or undefined
     */
    getCSSVariable: function(name: string, scope: string | HTMLElement = 'global'): string | undefined {
        const varName = name.startsWith('--') ? name : `--${name}`

        if (scope === 'global') {
            return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || undefined
        } else if (typeof scope === 'string' && scope.startsWith('component:')) {
            const componentId = scope.replace('component:', '')
            const registration = this._componentStyles.get(componentId)
            
            if (registration) {
                return getComputedStyle(registration.shadowRoot.host as HTMLElement).getPropertyValue(varName).trim() || undefined
            }
        } else if (scope instanceof HTMLElement) {
            return getComputedStyle(scope).getPropertyValue(varName).trim() || undefined
        }

        return undefined
    },

    /**
     * Registers a theme with CSS variables
     * @param themeName - Name of the theme
     * @param themeVars - Object containing CSS variable definitions
     * @param description - Optional theme description
     */
    registerTheme: function(themeName: string, themeVars: Record<string, string>, description?: string): void {
        this._themes.set(themeName, {
            name: themeName,
            variables: themeVars,
            description
        })
    },

    /**
     * Applies a theme globally or to specific components
     * @param themeName - Name of the theme to apply
     * @param scope - Scope to apply theme: 'global', 'component:id', or array of component IDs
     */
    applyTheme: function(themeName: string, scope: string | string[] = 'global'): void {
        const theme = this._themes.get(themeName)
        if (!theme) {
            console.warn(`Theme ${themeName} not found`)
            return
        }

        if (scope === 'global') {
            for (const [name, value] of Object.entries(theme.variables)) {
                this.setCSSVariable(name, value, 'global')
            }
        } else if (typeof scope === 'string' && scope.startsWith('component:')) {
            for (const [name, value] of Object.entries(theme.variables)) {
                this.setCSSVariable(name, value, scope)
            }
        } else if (Array.isArray(scope)) {
            for (const componentId of scope) {
                for (const [name, value] of Object.entries(theme.variables)) {
                    this.setCSSVariable(name, value, `component:${componentId}`)
                }
            }
        }
    },

    /**
     * Gets computed styles for a component
     * @param componentId - The component to inspect
     * @param properties - Specific properties to get (optional)
     * @returns Object containing computed style values
     */
    getComponentComputedStyles: function(
        componentId: string,
        properties?: string[]
    ): Record<string, string> {
        const registration = this._componentStyles.get(componentId)
        if (!registration) {
            console.warn(`Component ${componentId} not found`)
            return {}
        }

        const element = registration.shadowRoot.host as HTMLElement
        const computedStyles = getComputedStyle(element)
        const result: Record<string, string> = {}

        if (properties) {
            for (const prop of properties) {
                result[prop] = computedStyles.getPropertyValue(prop)
            }
        } else {
            // Get all CSS variables for the component
            for (const [name] of registration.cssVariables) {
                const varName = name.startsWith('--') ? name : `--${name}`
                result[name] = computedStyles.getPropertyValue(varName)
            }
        }

        return result
    },

    /**
     * Generates CSS string from a style object (CSS-in-JS)
     * @param styleObject - Object containing CSS rules
     * @param selector - Optional root selector (default: ':host')
     * @returns Generated CSS string
     */
    generateCSS: function(styleObject: Record<string, any>, selector: string = ':host'): string {
        const generateRules = (obj: Record<string, any>, currentSelector: string): string => {
            let css = ''
            const rules: string[] = []
            const nestedSelectors: Record<string, any> = {}

            for (const [key, value] of Object.entries(obj)) {
                if (typeof value === 'object' && value !== null) {
                    // Handle nested selectors
                    const nestedSelector = key.startsWith('&') 
                        ? key.replace('&', currentSelector)
                        : `${currentSelector} ${key}`
                    nestedSelectors[nestedSelector] = value
                } else {
                    // Convert camelCase to kebab-case
                    const cssProperty = key.replace(/([A-Z])/g, '-$1').toLowerCase()
                    rules.push(`  ${cssProperty}: ${value};`)
                }
            }

            // Generate CSS for current selector
            if (rules.length > 0) {
                css += `${currentSelector} {\n${rules.join('\n')}\n}\n\n`
            }

            // Generate CSS for nested selectors
            for (const [nestedSel, nestedObj] of Object.entries(nestedSelectors)) {
                css += generateRules(nestedObj, nestedSel)
            }

            return css
        }

        return generateRules(styleObject, selector).trim()
    },

    /**
     * Removes component styles and cleans up
     * @param componentId - The component to clean up
     */
    removeComponentStyles: function(componentId: string): void {
        const registration = this._componentStyles.get(componentId)
        if (registration) {
            if (registration.styleElement) {
                registration.styleElement.remove()
            }
            this._componentStyles.delete(componentId)
        }
    },

    /**
     * Gets style debugging information for a component
     * @param componentId - The component to debug
     * @returns Debug information object
     */
    getStyleDebugInfo: function(componentId: string): any {
        const registration = this._componentStyles.get(componentId)
        if (!registration) {
            return { error: `Component ${componentId} not found` }
        }

        return {
            componentId,
            registeredAt: registration.registeredAt,
            theme: registration.theme,
            cssVariables: Object.fromEntries(registration.cssVariables),
            styleElement: {
                exists: !!registration.styleElement,
                textLength: registration.styleElement?.textContent?.length ?? 0,
                rules: registration.styleElement?.sheet?.cssRules.length ?? 0
            },
            computedStyles: this.getComponentComputedStyles(componentId)
        }
    },

    /**
     * Lists all registered themes
     * @returns Array of theme definitions
     */
    getAvailableThemes: function(): ThemeDefinition[] {
        return Array.from(this._themes.values())
    },

    /**
     * Gets global CSS variables
     * @returns Object containing all global CSS variables
     */
    getGlobalCSSVariables: function(): Record<string, string> {
        return Object.fromEntries(this._globalCSSVariables)
    },

    /**
     * Clears all component styles (useful for development)
     */
    clearAllComponentStyles: function(): void {
        for (const [componentId] of this._componentStyles) {
            this.removeComponentStyles(componentId)
        }
    }
}
