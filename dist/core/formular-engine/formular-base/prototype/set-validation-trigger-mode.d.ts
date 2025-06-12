import { EventsType } from '../../../framework/events/events.types';
import { IFormular } from '../formular-base.types';
/**
 * Sets the validation trigger mode for the Formy instance.
 * @param mode - An array of validation trigger modes to set.
 */
export declare const setTriggerKeyWord: <T extends object>(this: IFormular<T>, mode: EventsType[]) => void;
