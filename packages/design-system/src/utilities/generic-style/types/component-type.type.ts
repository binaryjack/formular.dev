/**
 * Component types supported by the new Generic Style System
 *
 * Core components with full styling support:
 * - button: Interactive element with complex visual variants
 * - typography: Text-only component for text styling validation
 * - input: Form input with mixed component and text styling
 * - accordion: Expandable container component
 * - card: Container component with various styling options
 * - field: Form field wrapper with label and help text
 * - switch: Toggle switch for boolean inputs
 * - checkbox: Checkbox input component
 * - radio: Radio button input component
 * - drawer: Expandable/collapsible content container
 * - status-icon: Icon component for status indication
 * - validation: Form validation feedback component
 * - layout: Layout container components
 */
export type ComponentType =
    | 'button'
    | 'typography'
    | 'input'
    | 'accordion'
    | 'card'
    | 'field'
    | 'switch'
    | 'checkbox'
    | 'radio'
    | 'drawer'
    | 'status-icon'
    | 'validation'
    | 'layout'
