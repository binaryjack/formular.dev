import { FwcElement, type IFormularElementInstance } from '../../core/base'

/**
 * Local interface extending IFormularElementInstance with form-specific properties
 */
interface IFormInputInstance extends IFormularElementInstance {
  // Form-specific properties
  value: string
  placeholder: string
  disabled: boolean
  required: boolean
  type: string
  name: string
  label: string
  error: string
  className: string
  
  // State tracking properties
  _focused: boolean
  _touched: boolean
  _shadowRoot: ShadowRoot | null
  
  // Form-specific methods
  setValue(value: string): void
  getValue(): string
  focus(): void
  blur(): void
  reset(): void
  validate(): boolean
  
  // Internal methods
  _setupShadowRoot(): void
  _setupStyles(): void
  _render(): void
  _updateValue(newValue: string): void
  _handleInput(event: Event): void
  _handleFocus(event: Event): void
  _handleBlur(event: Event): void
  _handleKeyDown(event: KeyboardEvent): void
}

/**
 * FormInput Web Component
 * A web component for form inputs using formular.dev.lib and design-system
 * Following CONTRIBUTING.md: Using prototype-based approach instead of class syntax
 * 
 * @example
 * ```html
 * <formular-input 
 *   type="email" 
 *   label="Email Address" 
 *   placeholder="Enter your email"
 *   required>
 * </formular-input>
 * ```
 */

/**
 * FormInputElement Constructor Function
 * Following CONTRIBUTING.md: Using prototype-based approach instead of class syntax
 */
export const FormInputElement = function(this: HTMLElement & IFormInputInstance) {
  FwcElement.call(this)
  
  // Initialize properties
  this.value = this.getAttribute('value') ?? ''
  this.type = this.getAttribute('type') ?? 'text'
  this.placeholder = this.getAttribute('placeholder') ?? ''
  this.required = this.hasAttribute('required')
  this.disabled = this.hasAttribute('disabled')
  this.name = this.getAttribute('name') ?? ''
  this.label = this.getAttribute('label') ?? ''
  this.error = this.getAttribute('error') ?? ''
  this.className = this.getAttribute('class-name') ?? ''
  
  // State tracking
  this._focused = false
  this._touched = false
  
  // Setup initial rendering
  this._setupShadowRoot()
  this._setupStyles()
  this._render()
}

// Set up prototype inheritance
FormInputElement.prototype = Object.create(FwcElement.prototype)
FormInputElement.prototype.constructor = FormInputElement

// Define observed attributes for the custom element
;(FormInputElement as any).observedAttributes = [
  'value', 'type', 'placeholder', 'required', 'disabled', 
  'name', 'label', 'error', 'class-name'
]

/**
 * Interface for FormInputElement instance properties
 */
interface FormInputElementInstance {
  value: string
  type: string
  placeholder: string
  required: boolean
  disabled: boolean
  name: string
  label: string
  error: string
  className: string
  _focused: boolean
  _touched: boolean
  
  _setupShadowRoot(): void
  _setupStyles(): void
  _render(): void
  _validateInput(): void
  _handleInput(event: Event): void
  _handleFocus(): void
  _handleBlur(): void
  _updateProperty(name: string, value: string | null): void
  validateInput(): boolean
  clearError(): void
  setError(message: string): void
}

// Setup Shadow DOM
const _setupShadowRoot = function(this: FormInputElementInstance & HTMLElement) {
  if (!this.shadowRoot) {
    this.attachShadow({ mode: 'open' })
  }
}

// Setup component styles
const _setupStyles = function(this: FormInputElementInstance & HTMLElement) {
  if (!this.shadowRoot) return
  
  const style = document.createElement('style')
  style.textContent = `
    :host {
      display: block;
      font-family: var(--formular-font-family, system-ui, -apple-system, sans-serif);
    }

    .form-input-container {
      margin-bottom: 1rem;
    }

    .form-input-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--formular-color-text-primary, #374151);
    }

    .form-input-wrapper {
      position: relative;
    }

    .form-input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid var(--formular-color-border, #d1d5db);
      border-radius: var(--formular-border-radius, 0.5rem);
      font-size: 1rem;
      transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      background-color: var(--formular-color-background, #ffffff);
      color: var(--formular-color-text, #111827);
    }

    .form-input:focus {
      outline: none;
      border-color: var(--formular-color-primary, #3b82f6);
      box-shadow: 0 0 0 3px var(--formular-color-primary-alpha, rgba(59, 130, 246, 0.1));
    }

    .form-input:disabled {
      background-color: var(--formular-color-disabled, #f9fafb);
      cursor: not-allowed;
      opacity: 0.6;
    }

    .form-input.error {
      border-color: var(--formular-color-error, #ef4444);
    }

    .form-input.error:focus {
      border-color: var(--formular-color-error, #ef4444);
      box-shadow: 0 0 0 3px var(--formular-color-error-alpha, rgba(239, 68, 68, 0.1));
    }

    .form-input-error {
      margin-top: 0.25rem;
      font-size: 0.875rem;
      color: var(--formular-color-error, #ef4444);
    }

    .required::after {
      content: ' *';
      color: var(--formular-color-error, #ef4444);
    }
  `
  
  this.shadowRoot.appendChild(style)
}

// Render the component
const _render = function(this: FormInputElementInstance & HTMLElement) {
  if (!this.shadowRoot) return
  
  // Clear existing content (except styles)
  const style = this.shadowRoot.querySelector('style')
  this.shadowRoot.innerHTML = ''
  if (style) {
    this.shadowRoot.appendChild(style)
  }
  
  const container = document.createElement('div')
  container.className = 'form-input-container'
  
  // Create label if provided
  if (this.label) {
    const label = document.createElement('label')
    label.className = `form-input-label ${this.required ? 'required' : ''}`
    label.textContent = this.label
    container.appendChild(label)
  }
  
  // Create input wrapper
  const wrapper = document.createElement('div')
  wrapper.className = 'form-input-wrapper'
  
  // Create input element
  const input = document.createElement('input')
  const inputClasses = [
    'form-input',
    this.error ? 'error' : '',
    this.className
  ].filter(Boolean).join(' ')
  
  input.className = inputClasses
  input.type = this.type
  input.value = this.value
  input.placeholder = this.placeholder
  input.required = this.required
  input.disabled = this.disabled
  input.name = this.name
  
  // Add event listeners
  input.addEventListener('input', this._handleInput.bind(this))
  input.addEventListener('focus', this._handleFocus.bind(this))
  input.addEventListener('blur', this._handleBlur.bind(this))
  
  wrapper.appendChild(input)
  container.appendChild(wrapper)
  
  // Create error message if provided
  if (this.error) {
    const errorDiv = document.createElement('div')
    errorDiv.className = 'form-input-error'
    errorDiv.textContent = this.error
    container.appendChild(errorDiv)
  }
  
  this.shadowRoot.appendChild(container)
}

// Validation logic
const _validateInput = function(this: FormInputElementInstance) {
  // Placeholder for formular.dev.lib validation integration
  // Will be implemented once the dependency is properly resolved
  console.log('Validation logic will be implemented with formular.dev.lib')
}

// Event handlers
const _handleInput = function(this: FormInputElementInstance & HTMLElement, event: Event) {
  const target = event.target as HTMLInputElement
  this.value = target.value
  this._touched = true
  
  // Update the attribute to keep in sync
  this.setAttribute('value', this.value)
  
  // Dispatch custom event for form integration
  this.dispatchEvent(new CustomEvent('formular-input', {
    detail: { value: this.value, name: this.name },
    bubbles: true,
    composed: true
  }))
}

const _handleFocus = function(this: FormInputElementInstance) {
  this._focused = true
}

const _handleBlur = function(this: FormInputElementInstance) {
  this._focused = false
  this._touched = true
}

// Handle attribute changes
const _updateProperty = function(this: FormInputElementInstance & HTMLElement, name: string, value: string | null) {
  switch (name) {
    case 'value':
      this.value = value ?? ''
      break
    case 'type':
      this.type = value ?? 'text'
      break
    case 'placeholder':
      this.placeholder = value ?? ''
      break
    case 'required':
      this.required = value !== null
      break
    case 'disabled':
      this.disabled = value !== null
      break
    case 'name':
      this.name = value ?? ''
      break
    case 'label':
      this.label = value ?? ''
      break
    case 'error':
      this.error = value ?? ''
      break
    case 'class-name':
      this.className = value ?? ''
      break
  }
  
  // Re-render after property change
  this._render()
}

// Custom element lifecycle methods
const connectedCallback = function(this: FormInputElementInstance & HTMLElement) {
  FwcElement.prototype.connectedCallback.call(this)
  this._render()
}

const attributeChangedCallback = function(this: FormInputElementInstance & HTMLElement, name: string, oldValue: string | null, newValue: string | null) {
  FwcElement.prototype.attributeChangedCallback.call(this, name, oldValue, newValue)
  this._updateProperty(name, newValue)
}

// Public API methods following CONTRIBUTING.md prototype-based style
const validateInput = function(this: FormInputElementInstance): boolean {
  // Validation logic using formular.dev.lib
  return true // Placeholder
}

const clearError = function(this: FormInputElementInstance & HTMLElement): void {
  this.error = ''
  this.removeAttribute('error')
  this._render()
}

const setError = function(this: FormInputElementInstance & HTMLElement, message: string): void {
  this.error = message
  this.setAttribute('error', message)
  this._render()
}

// Assign all methods to prototype following CONTRIBUTING.md guidelines
Object.assign(FormInputElement.prototype, {
  _setupShadowRoot,
  _setupStyles,
  _render,
  _validateInput,
  _handleInput,
  _handleFocus,
  _handleBlur,
  _updateProperty,
  connectedCallback,
  attributeChangedCallback,
  validateInput,
  clearError,
  setError
})

// Register the custom element
customElements.define('formular-input', FormInputElement as any)

declare global {
  interface HTMLElementTagNameMap {
    'formular-input': HTMLElement & FormInputElementInstance
  }
}
