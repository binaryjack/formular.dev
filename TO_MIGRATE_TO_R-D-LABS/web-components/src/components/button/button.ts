import { FwcElement, type IFormularElementInstance } from '../../core/base'

/**
 * Local interface extending IFormularElementInstance with button-specific properties
 */
interface IButtonInstance extends IFormularElementInstance {
  // Button-specific properties
  text: string
  variant: 'primary' | 'secondary' | 'outline'
  size: 'sm' | 'md' | 'lg'
  disabled: boolean
  type: 'button' | 'submit' | 'reset'
  className: string
  loading: boolean
  icon: string
  fullWidth: boolean
  
  // State tracking properties
  _shadowRoot: ShadowRoot | null
  _buttonElement: HTMLButtonElement | null
  
  // Button-specific methods
  click(): void
  focus(): void
  blur(): void
  
  // Internal methods
  _setupShadowRoot(): void
  _setupStyles(): void
  _render(): void
  _handleClick(event: Event): void
  _updateState(): void
  _getButtonClasses(): string
}

/**
 * Button Web Component
 * A web component for buttons using formular.dev.lib and design-system
 * Following CONTRIBUTING.md: Using prototype-based approach instead of class syntax
 * 
 * @example
 * ```html
 * <formular-button 
 *   text="Click me" 
 *   variant="primary" 
 *   size="md">
 * </formular-button>
 * ```
 */

/**
 * ButtonElement Constructor Function
 * Following CONTRIBUTING.md: Using prototype-based approach instead of class syntax
 */
export const ButtonElement = function(this: HTMLElement & IButtonInstance) {
  FwcElement.call(this)
  
  // Initialize properties
  this.text = this.getAttribute('text') ?? this.textContent ?? 'Button'
  this.variant = (this.getAttribute('variant') as any) ?? 'primary'
  this.size = (this.getAttribute('size') as any) ?? 'md'
  this.disabled = this.hasAttribute('disabled')
  this.type = (this.getAttribute('type') as any) ?? 'button'
  this.className = this.getAttribute('class-name') ?? ''
  this.loading = this.hasAttribute('loading')
  this.icon = this.getAttribute('icon') ?? ''
  this.fullWidth = this.hasAttribute('full-width')
  
  // Internal state
  this._shadowRoot = null
  this._buttonElement = null
  
  // Setup initial rendering
  this._setupShadowRoot()
  this._setupStyles()
  this._render()
}

// Set up prototype inheritance
ButtonElement.prototype = Object.create(FwcElement.prototype)
ButtonElement.prototype.constructor = ButtonElement

// Define observed attributes for the custom element
;(ButtonElement as any).observedAttributes = [
  'text', 'variant', 'size', 'disabled', 'type', 
  'class-name', 'loading', 'icon', 'full-width'
]

/**
 * Setup shadow root for the button component
 */
const _setupShadowRoot = function(this: HTMLElement & IButtonInstance) {
  this._shadowRoot ??= this.attachShadow({ mode: 'open' })
}

/**
 * Setup styles for the button component using design system tokens
 */
const _setupStyles = function(this: HTMLElement & IButtonInstance) {
  if (!this._shadowRoot) return
  
  const styleElement = document.createElement('style')
  styleElement.textContent = `
    /* Import design system tokens */
    @import url('../../../design-system/src/styles/tokens.css');
    @import url('../../../design-system/src/styles/components.css');
    
    :host {
      display: inline-block;
    }
    
    .formular-button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-family-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      font-weight: var(--font-weight-medium, 500);
      line-height: var(--line-height-none, 1);
      border: none;
      border-radius: var(--radius, 0.375rem);
      transition: all var(--duration-fast, 0.15s) var(--ease-in-out, ease-in-out);
      cursor: pointer;
      text-decoration: none;
      outline: none;
      overflow: hidden;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }
    
    .formular-button:focus {
      outline: none;
      box-shadow: 0 0 0 3px var(--color-primary-500, #3b82f6)/20;
    }
    
    .formular-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    /* ComponentSizeType variants using design system tokens */
    .formular-button--sm {
      font-size: var(--font-size-xs, 0.875rem);
      padding: var(--spacing-sm, 0.5rem) var(--spacing-md, 0.75rem);
      gap: var(--spacing-sm, 0.5rem);
      min-height: 32px;
    }
    
    .formular-button--md {
      font-size: var(--font-size-sm, 1rem);
      padding: var(--spacing-md, 0.625rem) var(--spacing-lg, 1rem);
      gap: var(--spacing-sm, 0.5rem);
      min-height: 40px;
    }
    
    .formular-button--lg {
      font-size: var(--font-size-md, 1.125rem);
      padding: var(--spacing-lg, 0.75rem) var(--spacing-xl, 1.5rem);
      gap: var(--spacing-md, 0.75rem);
      min-height: 48px;
    }
    
    /* Color variants using design system tokens */
    .formular-button--primary {
      background-color: var(--color-primary-500, #3b82f6);
      color: var(--color-text-on-primary, #ffffff);
    }
    
    .formular-button--primary:hover:not(:disabled) {
      background-color: var(--color-primary-600, #2563eb);
    }
    
    .formular-button--primary:focus:not(:disabled) {
      background-color: var(--color-primary-600, #2563eb);
      box-shadow: 0 0 0 3px var(--color-primary-500, #3b82f6)/20;
    }
    
    .formular-button--primary:active:not(:disabled) {
      background-color: var(--color-primary-700, #1d4ed8);
    }
    
    .formular-button--primary:disabled {
      background-color: var(--color-primary-300, #93c5fd);
    }
    
    .formular-button--secondary {
      background-color: var(--color-secondary-500, #64748b);
      color: var(--color-text-on-primary, #ffffff);
    }
    
    .formular-button--secondary:hover:not(:disabled) {
      background-color: var(--color-secondary-600, #475569);
    }
    
    .formular-button--secondary:focus:not(:disabled) {
      background-color: var(--color-secondary-600, #475569);
      box-shadow: 0 0 0 3px var(--color-secondary-500, #64748b)/20;
    }
    
    .formular-button--secondary:active:not(:disabled) {
      background-color: var(--color-secondary-700, #334155);
    }
    
    .formular-button--secondary:disabled {
      background-color: var(--color-secondary-300, #cbd5e1);
    }
    
    .formular-button--outline {
      background-color: transparent;
      color: var(--color-text-primary, #374151);
      border: 1px solid var(--color-border-primary, #d1d5db);
    }
    
    .formular-button--outline:hover:not(:disabled) {
      background-color: var(--color-surface-primary, #f9fafb);
      border-color: var(--color-border-secondary, #9ca3af);
    }
    
    .formular-button--outline:focus:not(:disabled) {
      background-color: var(--color-surface-primary, #f9fafb);
      border-color: var(--color-primary-500, #3b82f6);
      box-shadow: 0 0 0 3px var(--color-primary-500, #3b82f6)/20;
    }
    
    .formular-button--outline:active:not(:disabled) {
      background-color: var(--color-surface-secondary, #f3f4f6);
    }
    
    .formular-button--outline:disabled {
      color: var(--color-text-muted, #9ca3af);
      border-color: var(--color-border-muted, #e5e5e5);
    }
    
    /* Full width */
    .formular-button--full-width {
      width: 100%;
    }
    
    /* Loading state */
    .formular-button--loading {
      color: transparent;
    }
    
    .formular-button__spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1rem;
      height: 1rem;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: translate(-50%, -50%) rotate(0deg); }
      100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    /* Icon styles */
    .formular-button__icon {
      margin-right: 0.5rem;
      font-size: 1em;
    }
    
    .formular-button__text {
      display: inline-block;
    }
  `
  
  this._shadowRoot.appendChild(styleElement)
}

/**
 * Render the button component
 */
const _render = function(this: HTMLElement & IButtonInstance) {
  if (!this._shadowRoot) return
  
  // Clear existing content (except styles)
  const existingButton = this._shadowRoot.querySelector('.formular-button')
  if (existingButton) {
    existingButton.remove()
  }
  
  // Create button element
  this._buttonElement = document.createElement('button')
  this._buttonElement.className = this._getButtonClasses()
  this._buttonElement.type = this.type
  this._buttonElement.disabled = this.disabled || this.loading
  
  // Add click handler
  this._buttonElement.addEventListener('click', this._handleClick.bind(this))
  
  // Add content
  let content = ''
  
  if (this.loading) {
    content += '<span class="formular-button__spinner"></span>'
  }
  
  if (this.icon && !this.loading) {
    content += `<span class="formular-button__icon">${this.icon}</span>`
  }
  
  if (this.text) {
    content += `<span class="formular-button__text">${this.text}</span>`
  }
  
  this._buttonElement.innerHTML = content
  
  this._shadowRoot.appendChild(this._buttonElement)
}

/**
 * Get CSS classes for the button based on current properties
 */
const _getButtonClasses = function(this: HTMLElement & IButtonInstance): string {
  const classes = ['formular-button']
  
  // Add variant class
  classes.push(`formular-button--${this.variant}`)
  
  // Add size class
  classes.push(`formular-button--${this.size}`)
  
  // Add full width class
  if (this.fullWidth) {
    classes.push('formular-button--full-width')
  }
  
  // Add loading class
  if (this.loading) {
    classes.push('formular-button--loading')
  }
  
  // Add custom class name
  if (this.className) {
    classes.push(this.className)
  }
  
  return classes.join(' ')
}

/**
 * Handle button click events
 */
const _handleClick = function(this: HTMLElement & IButtonInstance, event: Event) {
  if (this.disabled || this.loading) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  
  // Dispatch custom click event
  const customEvent = new CustomEvent('formular-click', {
    detail: {
      originalEvent: event,
      buttonText: this.text,
      variant: this.variant,
      size: this.size
    },
    bubbles: true,
    cancelable: true
  })
  
  this.dispatchEvent(customEvent)
}

/**
 * Update component state and re-render if necessary
 */
const _updateState = function(this: HTMLElement & IButtonInstance) {
  this._render()
}

/**
 * Focus the button
 */
const focus = function(this: HTMLElement & IButtonInstance) {
  if (this._buttonElement) {
    this._buttonElement.focus()
  }
}

/**
 * Blur the button
 */
const blur = function(this: HTMLElement & IButtonInstance) {
  if (this._buttonElement) {
    this._buttonElement.blur()
  }
}

/**
 * Programmatically click the button
 */
const click = function(this: HTMLElement & IButtonInstance) {
  if (this._buttonElement && !this.disabled && !this.loading) {
    this._buttonElement.click()
  }
}

/**
 * Attribute change callback
 */
const attributeChangedCallback = function(
  this: HTMLElement & IButtonInstance,
  name: string,
  oldValue: string | null,
  newValue: string | null
) {
  if (oldValue === newValue) return
  
  switch (name) {
    case 'text':
      this.text = newValue ?? ''
      break
    case 'variant':
      this.variant = (newValue as any) ?? 'primary'
      break
    case 'size':
      this.size = (newValue as any) ?? 'md'
      break
    case 'disabled':
      this.disabled = newValue !== null
      break
    case 'type':
      this.type = (newValue as any) ?? 'button'
      break
    case 'class-name':
      this.className = newValue ?? ''
      break
    case 'loading':
      this.loading = newValue !== null
      break
    case 'icon':
      this.icon = newValue ?? ''
      break
    case 'full-width':
      this.fullWidth = newValue !== null
      break
  }
  
  this._updateState()
}

/**
 * Connected callback - called when element is added to DOM
 */
const connectedCallback = function(this: HTMLElement & IButtonInstance) {
  if (!this._shadowRoot) {
    this._setupShadowRoot()
    this._setupStyles()
    this._render()
  }
}

/**
 * Disconnected callback - called when element is removed from DOM
 */
const disconnectedCallback = function(this: HTMLElement & IButtonInstance) {
  // Cleanup if needed
  if (this._buttonElement) {
    this._buttonElement.removeEventListener('click', this._handleClick.bind(this))
  }
}

// Assign methods to prototype following CONTRIBUTING.md guidelines
Object.assign(ButtonElement.prototype, {
  _setupShadowRoot,
  _setupStyles,
  _render,
  _getButtonClasses,
  _handleClick,
  _updateState,
  focus,
  blur,
  click,
  attributeChangedCallback,
  connectedCallback,
  disconnectedCallback
})

// Define the custom element
if (!customElements.get('formular-button')) {
  customElements.define('formular-button', ButtonElement as any)
}

export { ButtonElement as FormularButton }

