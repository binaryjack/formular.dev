import { IFieldInput } from '../field-input-base-types'

/**
 * Subscribes a callback function to observe changes in the field input.
 *
 * @param callback - The function to be called whenever a change is observed.
 * @this IFieldInput - The context in which this function is called, representing the field input instance.
 */
export const hasChanges = function (this: IFieldInput, callback: () => void) {
    this?.notificationManager?.observers.subscribe(callback)
}
