import { IDomManager } from '../dom-manager.types';
/**
 * Retrieves an element by its ID from the registered elements.
 * @param id - The ID of the element to retrieve.
 * @returns The element if found, otherwise null.
 */
export declare function dmGet<T extends HTMLElement>(this: IDomManager<T>, id: string): T | null;
