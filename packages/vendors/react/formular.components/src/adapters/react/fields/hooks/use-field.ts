import {
    IExtendedInput,
    IFieldStateFlags,
    IInputBase,
    defaultFieldStateFlags,
    notification
} from 'formular.dev.lib'
import React, { useCallback, useEffect } from 'react'

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
    const [flags, setFlags] = React.useState<IFieldStateFlags>(defaultFieldStateFlags)
    const [value, setValue] = React.useState(field?.input?.value)
    const [renderCount, setRenderCount] = React.useState(0)

    const stableField = React.useMemo(() => field, [field])

    // Add logging to track useField behavior
    // console.log('useField initialized for field:', field?.input?.name)    // Optimize handleRefresh to avoid redundant updates
    const handleRefresh = useCallback(() => {
        const newFlags = stableField?.input.styleManager?.getFlagsObject?.()
        const newValue = stableField?.input?.value
        console.log('useField handleRefresh triggered for field:', stableField?.input?.name)
        // More efficient comparison for boolean flags
        const flagsChanged =
            newFlags &&
            (!flags ||
                Object.keys(newFlags).some(
                    (key) =>
                        newFlags[key as keyof IFieldStateFlags] !==
                        flags[key as keyof IFieldStateFlags]
                ))

        if (flagsChanged) {
            setFlags(newFlags)
        }
        // Update value
        if (newValue !== value) {
            setValue(newValue)
        }
        setRenderCount((prev) => prev + 1)
    }, [stableField, flags, value])

    // Optimize useEffect dependencies
    useEffect(() => {
        const classNames = stableField?.input.styleManager?.classNames()
        if (classNames) {
            console.log('useField useEffect triggered for field:', stableField?.input?.name)
            setFlags(stableField?.input.styleManager?.getFlagsObject?.())
        }
    }, [stableField?.input.styleManager?.classNames])

    useEffect(() => {
        if (!stableField) return
        /** Bind the function handleRefresh to followng field events*/
        const notifications = [
            notification(
                stableField,
                handleRefresh,
                'onUiUpdate',
                'useField.onUiUpdate',
                'useField'
            ),
            // notification(
            //     stableField,
            //     handleRefresh,
            //     'onValueChange',
            //     'useField.onValueChange',
            //     'useField'
            // ),
            // notification(
            //     stableField,
            //     handleRefresh,
            //     'onValidationChange',
            //     'useField.onValidationChange',
            //     'useField'
            // ),
            notification(stableField, handleRefresh, 'onFocus', 'useField.onFocus', 'useField'),
            notification(stableField, handleRefresh, 'onBlur', 'useField.onBlur', 'useField')
        ]

        notifications.forEach((notif) => stableField.input.notificationManager?.accept(notif))

        return () => {
            stableField.input.notificationManager?.observers.unSubscribe(handleRefresh)
            notifications.forEach((notif) => stableField.input.notificationManager?.dismiss(notif))
            console.log('useField cleanup for field:', stableField?.input?.name)
        }
    }, [stableField])

    return {
        instance: stableField,
        flags
    }
}
