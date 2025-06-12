import { IDomManager } from '../dom-manager.types';
/**
 * Sets the checked state of an element by its ID.
 * @param id - The ID of the element to set the checked state for.
 * @param value - The checked state to set (true or false).
 */
export declare function dmSetChecked<T extends HTMLElement>(this: IDomManager<T>, id: string, value: boolean): void;
