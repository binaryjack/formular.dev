import { IInput } from '../input-base.types';
/**
 * Sets the focus state for the field input.
 *
 * This method checks if the internal HTML element reference is disabled.
 * If it is not disabled, it updates the `isFocus` property to `true`,
 * applies the focus state style to the field, and sets focus on the
 * internal HTML element.
 *
 * @this IInput - The context of the field input instance.
 */
export declare const setFocus: (this: IInput) => void;
