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
    :host {
      display: inline-block;
    }
    
    .formular-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-weight: 500;
      border-radius: 0.375rem;
      border: 1px solid transparent;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      text-decoration: none;
      outline: none;
      position: relative;
      overflow: hidden;
    }
    
    .formular-button:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
    
    .formular-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    /* Size variants */
    .formular-button--sm {
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
    
    .formular-button--md {
      padding: 0.625rem 1rem;
      font-size: 1rem;
      line-height: 1.5rem;
    }
    
    .formular-button--lg {
      padding: 0.75rem 1.5rem;
      font-size: 1.125rem;
      line-height: 1.75rem;
    }
    
    /* Color variants */
    .formular-button--primary {
      background-color: #3b82f6;
      color: white;
    }
    
    .formular-button--primary:hover:not(:disabled) {
      background-color: #2563eb;
    }
    
    .formular-button--primary:active:not(:disabled) {
      background-color: #1d4ed8;
    }
    
    .formular-button--secondary {
      background-color: #64748b;
      color: white;
    }
    
    .formular-button--secondary:hover:not(:disabled) {
      background-color: #475569;
    }
    
    .formular-button--secondary:active:not(:disabled) {
      background-color: #334155;
    }
    
    .formular-button--outline {
      background-color: transparent;
      color: #374151;
      border-color: #d1d5db;
    }
    
    .formular-button--outline:hover:not(:disabled) {
      background-color: #f9fafb;
      border-color: #9ca3af;
    }
    
    .formular-button--outline:active:not(:disabled) {
      background-color: #f3f4f6;
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

