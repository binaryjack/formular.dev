import { IDomManager } from '../dom-manager.types';
/**
 * Sets the class name of an element by its ID.
 * @param id - The ID of the element to set the class name for.
 * @param rules - The class name(s) to set.
 */
export declare function dmSetClass<T extends HTMLElement>(this: IDomManager<T>, id: string, rules: string): void;
