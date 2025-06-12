import { IInput } from '../input-base.types';
/**
 * Subscribes a callback function to observe changes in the field input.
 *
 * @param callback - The function to be called whenever a change is observed.
 * @this IInput - The context in which this function is called, representing the field input instance.
 */
export declare const hasChanges: (this: IInput, callback: () => void) => void;
