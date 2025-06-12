import { IDomManager } from '../dom-manager.types';
/**
 * Checks if an element with the given ID exists in the registered elements.
 * @param id - The ID of the element to check.
 * @returns True if the element exists, otherwise false.
 */
export declare function dmExists<T extends HTMLElement>(this: IDomManager<T>, id: string): boolean;
