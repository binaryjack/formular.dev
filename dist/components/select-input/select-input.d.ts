/**
 * Props for the Select component.
 */
interface ISelectProps {
    /** The name of the field as defined in the form schema */
    fieldName: string;
}
/**
 * A select dropdown component that integrates with the FORMULAR form management system.
 *
 * This component provides a complete select/dropdown solution with:
 * - Automatic field binding and option management
 * - Toggleable dropdown interface with smooth animations
 * - Real-time validation with visual feedback
 * - Keyboard navigation support (Arrow keys, Delete to clear)
 * - Search/filter functionality within options
 * - Focus management and accessibility features
 * - Integration with the form's validation system
 *
 * The component uses a drawer-based UI for the dropdown options and automatically
 * connects to the form instance via context, managing its selected state through
 * the FORMULAR input engine.
 *
 * @param props - The component props
 * @param props.fieldName - The name of the field as defined in the form schema.
 *                          This must match a select field name in your form's schema definition.
 *
 * @returns A rendered select dropdown field with validation and state management
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Select fieldName="country" />
 * ```
 *
 * @example
 * ```tsx
 * // Within a form with options
 * const schema = {
 *   properties: [
 *     SelectBuilder.setId(1)
 *       .setName('country')
 *       .setLabel('Select Country')
 *       .setOptionData('country', [
 *         { id: 1, value: 'us', label: 'United States' },
 *         { id: 2, value: 'ca', label: 'Canada' },
 *         { id: 3, value: 'uk', label: 'United Kingdom' }
 *       ])
 *       .build()
 *   ]
 * }
 *
 * <FormularForm formular={myFormInstance}>
 *   <Select fieldName="country" />
 * </FormularForm>
 * ```
 *
 * @example
 * ```tsx
 * // With validation
 * const schema = {
 *   properties: [
 *     SelectBuilder.setId(1)
 *       .setName('priority')
 *       .setLabel('Priority Level')
 *       .setOptionData('priority', priorityOptions)
 *       .setValidationData(true, Validators.required('Please select a priority').build())
 *       .build()
 *   ]
 * }
 *
 * <Select fieldName="priority" />
 * ```
 *
 * @remarks
 * - The fieldName must match a select field defined in your form schema
 * - Options are defined in the form schema using setOptionData()
 * - The component provides a searchable dropdown interface
 * - Supports keyboard navigation (Arrow keys to open, Delete to clear)
 * - Automatically focuses when clicked and manages dropdown state
 * - Integrates with the form's submission and validation lifecycle
 * - Uses the Toggleable wrapper for smooth open/close animations
 */
declare const Select: ({ fieldName }: ISelectProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default Select;
