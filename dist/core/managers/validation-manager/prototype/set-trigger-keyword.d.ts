import { EventsType } from '../../../framework/events/events.types';
import { IValidationManager } from '../validation-manager.types';
/**
 * Sets the validation trigger mode for the field input.
 *
 * @param this - The current instance of the field input implementing `IFieldInput`.
 * @param keyWord - An array of `TriggerKeyWordType` values that define the validation trigger modes.
 */
export declare const setTriggerKeyWord: (this: IValidationManager, keyWord: EventsType[]) => void;
