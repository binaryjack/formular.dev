import { IEvents } from '../../../../framework/events/events.types';
import { IExtendedInput } from '../input-base.types';
/**
 * Handles the focus event for a field input.
 *
 * @this IInput - The context of the field input instance.
 * @param data - Optional data associated with the focus event.
 * Logs the focus event details, including the optional data and the current value of the field input.
 */
export declare const handleOnKeyUp: <T extends IEvents>(this: IExtendedInput, data?: T) => void;
