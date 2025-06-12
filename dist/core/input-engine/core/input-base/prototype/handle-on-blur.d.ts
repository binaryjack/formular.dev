import { IEvents } from '../../../../framework/events/events.types';
import { IExtendedInput } from '../input-base.types';
/**
 * Handles the blur event for a field input.
 *
 * @this IInput - The context of the field input instance.
 * @param data - Optional additional data associated with the blur event.
 * Logs the blur event, the provided data, and the current value of the field input.
 */
export declare const handleOnBlur: <T extends IEvents>(this: IExtendedInput, data?: T) => void;
