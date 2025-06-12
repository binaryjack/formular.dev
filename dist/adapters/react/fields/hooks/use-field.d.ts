import { IExtendedInput, IInputBase } from '../../../../core/input-engine/core/input-base/input-base.types';
import { IFieldStateFlags } from '../../../../core/managers/style-manager/style-manager.types';
/**
 * Return type for the useField hook.
 *
 * @template T - The type of field instance (IInputBase or IExtendedInput)
 */
export interface IUseFieldHookReturn<T extends IInputBase | IExtendedInput> {
    /** The field instance with all its properties and methods */
    instance: T | undefined;
    /** Current state flags for the field (valid, dirty, pristine, focus, etc.) */
    flags: IFieldStateFlags;
}
/**
 * Type definition for the useField hook function.
 *
 * @template T - The type of field instance
 */
export type useFieldHookType = <T extends IInputBase | IExtendedInput>(field?: T) => IUseFieldHookReturn<T>;
/**
 * React hook for managing individual field state and reactivity.
 *
 * This hook provides a reactive interface between FORMULAR field instances and React components.
 * It automatically subscribes to field changes and updates the component when the field state
 * changes, ensuring the UI stays in sync with the underlying field data and validation state.
 *
 * The hook manages:
 * - Field state flags (isValid, isDirty, isPristine, isFocus, etc.)
 * - Value change notifications
 * - Validation state updates
 * - Cleanup on component unmount
 *
 * @template T - The type of field instance (IInputBase or IExtendedInput)
 *
 * @param field - The field instance to manage (optional)
 * @returns Object containing the field instance and current state flags
 *
 * @example
 * ```tsx
 * // Basic usage in a form component
 * const MyInput = ({ fieldName }: { fieldName: string }) => {
 *   const { formInstance } = useFormularContext();
 *   const field = formInstance?.getField(fieldName);
 *   const { instance, flags } = useField(field);
 *
 *   return (
 *     <div className={`field ${flags.isValid ? 'valid' : 'invalid'}`}>
 *       <input
 *         {...instance?.register()}
 *         className={flags.isDirty ? 'dirty' : 'pristine'}
 *       />
 *       {!flags.isValid && <span className="error">Invalid input</span>}
 *     </div>
 *   );
 * };
 * ```
 *
 * @example
 * ```tsx
 * // Advanced usage with custom validation feedback
 * const AdvancedInput = ({ fieldName }: { fieldName: string }) => {
 *   const { formInstance } = useFormularContext();
 *   const field = formInstance?.getField(fieldName);
 *   const { instance, flags } = useField(field);
 *
 *   useEffect(() => {
 *     if (flags.isDirty && !flags.isValid) {
 *       // Show validation errors for dirty, invalid fields
 *       showValidationErrors(instance?.input?.errors);
 *     }
 *   }, [flags.isDirty, flags.isValid, instance?.input?.errors]);
 *
 *   return (
 *     <input
 *       {...instance?.register()}
 *       onFocus={() => instance?.input?.setFocus()}
 *       onBlur={() => instance?.input?.setValue(instance.input.value)}
 *     />
 *   );
 * };
 * ```
 */
export declare const useField: <T extends IExtendedInput | IInputBase>(field?: T) => IUseFieldHookReturn<T>;
