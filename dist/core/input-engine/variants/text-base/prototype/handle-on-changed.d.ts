import { IEvents } from '../../../../framework/events/events.types';
import { ITextBaseInput } from '../text-base-input.types';
/**
 * Handles the change event for a field input.
 *
 * @this IFieldInput - The context of the field input instance.
 * @param data - Optional parameter representing the new data or value associated with the change event.
 *
 * Logs the updated value and the provided data to the console.
 */
export declare const handleOnChanged: <T extends IEvents>(this: ITextBaseInput, data?: T) => void;
