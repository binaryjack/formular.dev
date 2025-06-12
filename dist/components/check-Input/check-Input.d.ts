/**
 * Props for the CheckInput component.
 */
interface ICheckInputProps {
    /** The name of the field as defined in the form schema */
    fieldName: string;
}
/**
 * A checkbox input component that integrates with the FORMULAR form management system.
 *
 * This component provides a complete checkbox solution with:
 * - Automatic field binding and boolean state management
 * - Real-time validation with visual feedback
 * - Keyboard navigation support (Delete key to clear/uncheck)
 * - Focus management and accessibility features
 * - Integration with the form's validation system
 *
 * The component automatically connects to the form instance via context and manages
 * its checked state through the FORMULAR input engine.
 *
 * @param props - The component props
 * @param props.fieldName - The name of the field as defined in the form schema.
 *                          This must match a boolean field name in your form's schema definition.
 *
 * @returns A rendered checkbox input field with validation and state management
 *
 * @example
 * ```tsx
 * // Basic usage
 * <CheckInput fieldName="agreeToTerms" />
 * ```
 *
 * @example
 * ```tsx
 * // Within a form with schema
 * const schema = {
 *   properties: [
 *     CheckBuilder.setId(1)
 *       .setName('newsletter')
 *       .setLabel('Subscribe to newsletter')
 *       .build()
 *   ]
 * }
 *
 * <FormularForm formular={myFormInstance}>
 *   <CheckInput fieldName="newsletter" />
 *   <CheckInput fieldName="agreeToTerms" />
 * </FormularForm>
 * ```
 *
 * @example
 * ```tsx
 * // With validation
 * const schema = {
 *   properties: [
 *     CheckBuilder.setId(1)
 *       .setName('agreeToTerms')
 *       .setLabel('I agree to the terms and conditions')
 *       .setValidationData(true, Validators.required('You must agree to terms').build())
 *       .build()
 *   ]
 * }
 *
 * <CheckInput fieldName="agreeToTerms" />
 * ```
 *
 * @remarks
 * - The fieldName must match a boolean field defined in your form schema
 * - The component handles its own validation state and error display
 * - Supports keyboard shortcuts (Delete key unchecks the checkbox)
 * - Automatically focuses when the field wrapper is clicked
 * - Integrates with the form's submission and validation lifecycle
 * - The checked state is managed through the FORMULAR input engine
 */
declare const CheckInput: ({ fieldName }: ICheckInputProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default CheckInput;
