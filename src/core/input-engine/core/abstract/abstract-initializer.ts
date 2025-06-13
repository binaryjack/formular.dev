/**
 * Provides types and a generic initializer function for input fields in the input engine.
 *
 * This module exports:
 * - `abstractInitializerSignatureType`: A generic type signature for an async initializer function.
 * - `abstractInitializer`: A generic function that initializes an input field, optionally runs a setup callback, and processes notifications.
 *
 * Usage:
 *   Use `abstractInitializer` to initialize any object implementing `IInputBase`, optionally running a setup routine and sending notifications.
 *
 * Example:
 *   await abstractInitializer(field, setupFn, [notification1, notification2]);
 */

import { INotification } from '@core/managers/notification-manager/notification-manager.types'
import { IInputBase } from '../input-base/input-base.types'

/**
 * Type signature for a generic asynchronous initializer function for input fields.
 *
 * @template TInput - The type of the input field, extending IInputBase.
 * @param fieldInput - The input field instance to initialize.
 * @param setup - Optional setup callback to further configure the input field.
 * @param notifiers - Optional array of notifications to send to the input's notification manager.
 * @returns Promise<boolean> - Resolves to true if initialization succeeds, rejects if an error occurs.
 */
export type abstractInitializerSignatureType = <TInput extends IInputBase>(
    fieldInput: TInput,
    setup?: (fieldInput: TInput) => void,
    notifiers?: INotification[]
) => Promise<boolean>

/**
 * Generic initializer for input fields.
 *
 * Initializes the given input field, optionally runs a setup callback, and processes an array of notifications.
 *
 * @template TFieldInput - The type of the input field, extending IInputBase.
 * @param fieldInput - The input field instance to initialize.
 * @param setup - Optional setup callback to further configure the input field.
 * @param notifiers - Optional array of notifications to send to the input's notification manager.
 * @returns Promise<boolean> - Resolves to true if initialization succeeds, rejects if an error occurs.
 */
export const abstractInitializer: abstractInitializerSignatureType = <
    TFieldInput extends IInputBase
>(
    fieldInput: TFieldInput,
    setup?: (fieldInput: TFieldInput) => void,
    notifiers?: INotification[]
) => {
    try {
        setup?.(fieldInput)

        if (notifiers) {
            for (const n of notifiers) {
                fieldInput.notificationManager?.accept(n)
            }
        }
        return Promise.resolve(true)
    } catch (e: any) {
        return Promise.reject(e instanceof Error ? e : new Error(String(e)))
    }
}
