/**
 * Button Web Component Properties Interface
 * Following CONTRIBUTING.md: Interface names prefixed with 'I'
 */
export interface IButtonProps {
  /** Button text content */
  text?: string;
  
  /** Button variant (primary, secondary, outline) */
  variant?: 'primary' | 'secondary' | 'outline';
  
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  
  /** Whether the button is disabled */
  disabled?: boolean;
  
  /** Button type for form submission */
  type?: 'button' | 'submit' | 'reset';
  
  /** Additional CSS classes */
  className?: string;
  
  /** Loading state */
  loading?: boolean;
  
  /** Icon to display before text */
  icon?: string;
  
  /** Whether button should take full width */
  fullWidth?: boolean;
}
