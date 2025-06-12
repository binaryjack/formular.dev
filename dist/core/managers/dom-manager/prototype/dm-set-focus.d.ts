import { IDomManager } from '../dom-manager.types';
/**
 * Sets focus to an element by its ID. If the element is not found, focuses on the first registered element.
 * @param id - The ID of the element to focus.
 */
export declare function dmSetFocus<T extends HTMLElement>(this: IDomManager<T>, id: string): void;
