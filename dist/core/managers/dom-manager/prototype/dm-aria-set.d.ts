import { IDomManager } from '../dom-manager.types';
/**
 * Sets ARIA attributes for an element by its ID.
 * @param id - The ID of the element to set ARIA attributes for.
 * @param name - The name to set for the element.
 */
export declare function dmAriaSet<T extends HTMLElement>(this: IDomManager<T>, id: string, name: string): void;
