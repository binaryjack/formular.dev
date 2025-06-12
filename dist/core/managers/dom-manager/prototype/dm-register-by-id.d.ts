import { IDomManager } from '../dom-manager.types';
/**
 * Registers an element by its ID if it exists in the DOM.
 * @param id - The ID of the element to register.
 */
export declare function dmRegisterById<T extends HTMLElement>(this: IDomManager<T>, id: string): void;
