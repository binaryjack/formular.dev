import { IDomManager } from '../dom-manager.types';
/**
 * Sets the value of an element by its ID.
 * @param id - The ID of the element to set the value for.
 * @param value - The value to set.
 */
export declare function dmSetValue<T extends HTMLElement>(this: IDomManager<T>, id: string, value: string): void;
