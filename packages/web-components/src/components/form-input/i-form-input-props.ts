/**
 * FormInput Web Component Properties Interface
 * Following CONTRIBUTING.md: Interface names prefixed with 'I'
 */
export interface IFormInputProps {
  /** Input value */
  value?: string;
  
  /** Input type (text, email, password, etc.) */
  type?: string;
  
  /** Placeholder text */
  placeholder?: string;
  
  /** Whether the input is required */
  required?: boolean;
  
  /** Whether the input is disabled */
  disabled?: boolean;
  
  /** Input name for form submission */
  name?: string;
  
  /** Input label text */
  label?: string;
  
  /** Error message to display */
  error?: string;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Validation rules from formular.dev.lib */
  validation?: any; // Will be properly typed once formular.dev.lib is available
}
