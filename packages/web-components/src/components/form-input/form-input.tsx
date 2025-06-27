import { css, html, LitElement, PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

/**
 * FormInput Web Component
 * A web component for form inputs using formular.dev.lib and design-system
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
@customElement('formular-input')
export class FormInputElement extends LitElement {
  // Following CONTRIBUTING.md: Using prototype-based approach where possible
  // but using class syntax for web components as it's the standard pattern
  
  @property({ type: String }) value = '';
  @property({ type: String }) type = 'text';
  @property({ type: String }) placeholder = '';
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) name = '';
  @property({ type: String }) label = '';
  @property({ type: String }) error = '';
  @property({ type: String, attribute: 'class-name' }) className = '';
  
  @state() private _focused = false;
  @state() private _touched = false;

  static readonly styles = css`
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
  `;

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    
    // Handle integration with formular.dev.lib when available
    if (changedProperties.has('value')) {
      this._validateInput();
    }
  }

  private _validateInput(): void {
    // Placeholder for formular.dev.lib validation integration
    // Will be implemented once the dependency is properly resolved
    console.log('Validation logic will be implemented with formular.dev.lib');
  }

  private _handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this._touched = true;
    
    // Dispatch custom event for form integration
    this.dispatchEvent(new CustomEvent('formular-input', {
      detail: { value: this.value, name: this.name },
      bubbles: true,
      composed: true
    }));
  }

  private _handleFocus(): void {
    this._focused = true;
  }

  private _handleBlur(): void {
    this._focused = false;
    this._touched = true;
  }

  render() {
    const inputClasses = [
      'form-input',
      this.error ? 'error' : '',
      this.className
    ].filter(Boolean).join(' ');

    return html`
      <div class="form-input-container">
        ${this.label ? html`
          <label class="form-input-label ${this.required ? 'required' : ''}">
            ${this.label}
          </label>
        ` : ''}
        
        <div class="form-input-wrapper">
          <input
            class="${inputClasses}"
            type="${this.type}"
            .value="${this.value}"
            placeholder="${this.placeholder}"
            ?required="${this.required}"
            ?disabled="${this.disabled}"
            name="${this.name}"
            @input="${this._handleInput}"
            @focus="${this._handleFocus}"
            @blur="${this._handleBlur}"
          />
        </div>
        
        ${this.error ? html`
          <div class="form-input-error">${this.error}</div>
        ` : ''}
      </div>
    `;
  }
}

// Following prototype-based approach for methods where applicable
export const validateInput = function(this: FormInputElement): boolean {
  // Validation logic using formular.dev.lib
  return true; // Placeholder
};

export const clearError = function(this: FormInputElement): void {
  this.error = '';
};

export const setError = function(this: FormInputElement, message: string): void {
  this.error = message;
};

// Assign methods to prototype following CONTRIBUTING.md guidelines
Object.assign(FormInputElement.prototype, {
  validateInput,
  clearError,
  setError
});

declare global {
  interface HTMLElementTagNameMap {
    'formular-input': FormInputElement;
  }
}
