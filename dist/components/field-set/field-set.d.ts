import { IFieldStateFlags } from '../../core/managers/style-manager/style-manager.types';
/**
 * Props for the FieldSet component.
 *
 * @template TType - The type of the input field
 */
interface IFieldSetProps<TType> {
    /** Unique identifier for the input field */
    inputId: string;
    /** Optional label text for the field */
    label?: string;
    /** The type of input field (text, password, select, etc.) */
    type: TType;
    /** Whether password is visible (for password fields) */
    isPasswordVisible?: boolean;
    /** Field state flags (valid, dirty, focus, etc.) */
    flags: IFieldStateFlags;
    /** The main input element(s) to render */
    children: React.ReactNode;
    /** Optional content for items drawer (e.g., select options) */
    itemsChildren?: React.ReactNode;
    /** Width of the items drawer */
    itemsDrawerWidth?: string;
    /** Height of the items drawer */
    itemsDrawerHeight?: string;
    /** Validation feedback components */
    validationChildren?: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Callback when field receives focus */
    onSetFocus?: () => void;
    /** Callback when field is cleared */
    onClear?: () => void;
    /** Callback when item is selected (for select fields) */
    onSelectItem?: () => void;
    /** Callback when field is clicked */
    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
/**
 * A comprehensive field wrapper component that provides a unified interface for all FORMULAR input fields.
 *
 * This component serves as the foundation for all form inputs in the FORMULAR system, providing:
 * - Consistent visual layout and styling for all field types
 * - Label management and accessibility features
 * - Validation state visualization (valid, invalid, dirty, pristine)
 * - Focus management and visual feedback
 * - Clear button functionality for resetting field values
 * - Drawer integration for complex inputs (select, date picker)
 * - Password visibility toggle support
 * - Debug information and development tools
 * - Responsive design and mobile-friendly interactions
 *
 * The FieldSet component is used internally by all FORMULAR input components
 * and provides a consistent foundation for field behavior and appearance.
 *
 * @template TType - The type of the input field being wrapped
 *
 * @param props - The component props
 * @param props.inputId - Unique identifier for the input field, used for accessibility
 * @param props.label - Optional label text displayed above the field
 * @param props.type - The type of input field (affects styling and behavior)
 * @param props.flags - Field state flags that control visual appearance and behavior
 * @param props.children - The actual input element(s) to render inside the fieldset
 * @param props.validationChildren - Validation feedback components (errors, warnings)
 * @param props.itemsChildren - Content for dropdown/selection drawers
 * @param props.onClick - Callback when the field area is clicked
 * @param props.onClear - Callback when the clear button is pressed
 *
 * @returns A rendered fieldset with consistent styling and behavior
 *
 * @example
 * ```tsx
 * // Basic usage (typically used internally by input components)
 * <FieldSet
 *   inputId="username"
 *   label="Username"
 *   type="text"
 *   flags={fieldFlags}
 *   onClick={() => field.focus()}
 *   onClear={() => field.clear()}
 *   validationChildren={<ValidationErrors errors={field.errors} />}
 * >
 *   <input {...field.register()} />
 * </FieldSet>
 * ```
 *
 * @example
 * ```tsx
 * // With select items drawer
 * <FieldSet
 *   inputId="country"
 *   label="Select Country"
 *   type="select"
 *   flags={fieldFlags}
 *   itemsChildren={<CountryOptions />}
 *   itemsDrawerWidth="300px"
 *   itemsDrawerHeight="400px"
 * >
 *   <input {...field.register()} readOnly />
 * </FieldSet>
 * ```
 *
 * @example
 * ```tsx
 * // Password field with visibility toggle
 * <FieldSet
 *   inputId="password"
 *   label="Password"
 *   type="password"
 *   flags={fieldFlags}
 *   isPasswordVisible={showPassword}
 * >
 *   <input type={showPassword ? 'text' : 'password'} {...field.register()} />
 * </FieldSet>
 * ```
 *
 * @remarks
 * - This component is primarily used internally by FORMULAR input components
 * - Provides consistent styling based on field state flags
 * - Handles accessibility attributes and label associations
 * - Integrates with the drawer system for complex input interactions
 * - Supports debug mode for development and troubleshooting
 * - Responsive design adapts to different screen sizes
 * - All visual feedback is driven by the flags prop from the field state
 */
declare const FieldSet: <TType>({ inputId, label, type, isPasswordVisible, flags, children, itemsChildren, validationChildren, onSetFocus, className, onClear, onClick, itemsDrawerWidth, itemsDrawerHeight }: IFieldSetProps<TType>) => import("@emotion/react/jsx-runtime").JSX.Element;
export default FieldSet;
