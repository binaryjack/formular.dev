/**
 * Props for the InputText component.
 */
interface IInputTextProps {
    /** The name of the field as defined in the form schema */
    fieldName: string;
}
/**
 * A text input component that integrates with the FORMULAR form management system.
 *
 * This component provides a complete text input solution with:
 * - Automatic field binding and state management
 * - Real-time validation with visual feedback
 * - Keyboard navigation support (Delete key to clear)
 * - Focus management and accessibility features
 * - Integration with the form's validation system
 *
 * The component automatically connects to the form instance via context and manages
 * its own state through the FORMULAR input engine.
 *
 * @param props - The component props
 * @param props.fieldName - The name of the field as defined in the form schema.
 *                          This must match a field name in your form's schema definition.
 *
 * @returns A rendered text input field with validation and state management
 *
 * @example
 * ```tsx
 * // Basic usage
 * <InputText fieldName="username" />
 * ```
 *
 * @example
 * ```tsx
 * // Within a form
 * <FormularForm formular={myFormInstance}>
 *   <InputText fieldName="firstName" />
 *   <InputText fieldName="lastName" />
 *   <InputText fieldName="email" />
 * </FormularForm>
 * ```
 *
 * @example
 * ```tsx
 * // With form schema
 * const schema = {
 *   properties: [
 *     InputTextBuilder.setId(1)
 *       .setName('username')
 *       .setLabel('Username')
 *       .setValidationData(true, Validators.required().build())
 *       .build()
 *   ]
 * }
 *
 * // Component automatically binds to the 'username' field
 * <InputText fieldName="username" />
 * ```
 *
 * @remarks
 * - The fieldName must match a field defined in your form schema
 * - The component handles its own validation state and error display
 * - Supports keyboard shortcuts (Delete key clears the field)
 * - Automatically focuses when the field wrapper is clicked
 * - Integrates with the form's submission and validation lifecycle
 */
declare const InputText: ({ fieldName }: IInputTextProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default InputText;
