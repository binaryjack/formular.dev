import {
    IExtendedInput,
    IFieldStateFlags,
    IInputBase,
    defaultFieldStateFlags,
    notification
} from 'formular.dev.lib'
import { useCallback, useRef, useSyncExternalStore } from 'react'

/**
 * Return type for the useField hook.
 *
 * @template T - The type of field instance (IInputBase or IExtendedInput)
 */
export interface IUseFieldHookReturn<T extends IInputBase | IExtendedInput> {
    /** The field instance with all its properties and methods */
    instance: T | undefined

    /** Current state flags for the field (valid, dirty, pristine, focus, etc.) */
    flags: IFieldStateFlags
}

/**
 * Type definition for the useField hook function.
 *
 * @template T - The type of field instance
 */
export type useFieldHookType = <T extends IInputBase | IExtendedInput>(
    field?: T
) => IUseFieldHookReturn<T>

/**
 * React hook for managing individual field state and reactivity.
 *
 * This hook provides a reactive interface between FORMULAR field instances and React components.
 * It automatically subscribes to field changes and updates the component when the field state
 * changes, ensuring the UI stays in sync with the underlying field data and validation state.
 *
 * Uses React 18+ useSyncExternalStore for optimal performance and concurrent rendering compatibility.
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
export const useField = <T extends IExtendedInput | IInputBase>(
    field?: T
): IUseFieldHookReturn<T> => {
    // Cache the last snapshot to avoid creating new objects on every call
    const lastSnapshotRef = useRef<IFieldStateFlags>(defaultFieldStateFlags)

    // Subscribe function for useSyncExternalStore
    const subscribe = useCallback(
        (callback: () => void) => {
            if (!field) {
                return () => {}
            }

            console.log('useField subscribing to field:', field?.input?.name)

            const notifications = [
                notification(field, callback, 'onUiUpdate', 'useField.onUiUpdate', 'useField'),
                notification(field, callback, 'onFocus', 'useField.onFocus', 'useField'),
                notification(field, callback, 'onBlur', 'useField.onBlur', 'useField')
            ]

            notifications.forEach((notif) => field.input.notificationManager?.accept(notif))

            return () => {
                console.log('useField unsubscribing from field:', field?.input?.name)
                field.input.notificationManager?.observers.unSubscribe(callback)
                notifications.forEach((notif) => field.input.notificationManager?.dismiss(notif))
            }
        },
        [field]
    )

    // Snapshot function for useSyncExternalStore - must return stable references
    const getSnapshot = useCallback(() => {
        if (!field) {
            return defaultFieldStateFlags
        }

        const styleManager = field?.input?.styleManager
        const newFlags = styleManager?.getFlagsObject?.() ?? defaultFieldStateFlags

        // Only update the cached snapshot if the flags have actually changed
        const lastSnapshot = lastSnapshotRef.current
        const hasChanged =
            !lastSnapshot ||
            Object.keys(newFlags).some(
                (key) =>
                    newFlags[key as keyof IFieldStateFlags] !==
                    lastSnapshot[key as keyof IFieldStateFlags]
            )

        if (hasChanged) {
            console.log(
                'useField getSnapshot - flags changed for field:',
                field?.input?.name,
                'new flags:',
                newFlags
            )
            lastSnapshotRef.current = newFlags
        }

        return lastSnapshotRef.current
    }, [field])

    // Use React 18+ useSyncExternalStore for optimal performance
    const flags = useSyncExternalStore(subscribe, getSnapshot)

    return {
        instance: field,
        flags
    }
}
