import { default as React } from 'react';
import { IFormular } from '../../core/formular-engine/formular-base/formular-base.types';
import { InputDataTypes } from '../../core/framework/common/common.input.data.types';
/**
 * Props for the FormularForm component.
 *
 * @template T - The type of data this form manages and returns upon submission
 */
interface IFormularProps<T extends object> {
    /** The form instance created by FormularManager that contains all form logic and state */
    formular: IFormular<T>;
    /** Child components (typically form fields and buttons) to render within the form */
    children: React.ReactNode;
    /** Optional loading state to disable form interaction during async operations */
    isloading?: boolean;
    /**
     * Callback function invoked when the form is successfully submitted and validated
     * @param data - The validated form data as key-value pairs
     */
    onSubmit?: (data: Record<string, InputDataTypes>) => void;
}
/**
 * Main form wrapper component that provides form context and manages form submission.
 *
 * This component serves as the primary container for all FORMULAR forms. It provides:
 * - Form context to child components via React Context
 * - Form submission handling with validation
 * - Loading state management
 * - Error and notification display
 * - Integration with the FORMULAR form engine
 *
 * The component automatically handles form validation, state management, and provides
 * a consistent interface for form operations across the application.
 *
 * @template T - The type of data this form manages
 *
 * @example
 * ```tsx
 * interface UserData {
 *   username: string;
 *   email: string;
 * }
 *
 * const UserForm = () => {
 *   const handleSubmit = (data: Record<string, InputDataTypes>) => {
 *     console.log('Form submitted:', data);
 *     // Handle form submission
 *   };
 *
 *   return (
 *     <FormularForm formular={userFormInstance} onSubmit={handleSubmit}>
 *       <InputText fieldName="username" />
 *       <InputText fieldName="email" />
 *       <button type="submit">Submit</button>
 *     </FormularForm>
 *   );
 * };
 * ```
 *
 * @param props - Component props containing form instance, children, and callbacks
 * @returns JSX element representing the form with context provider
 */
declare const FormularForm: <T extends object>({ formular, children, isloading, onSubmit }: IFormularProps<T>) => import("@emotion/react/jsx-runtime").JSX.Element;
export default FormularForm;
