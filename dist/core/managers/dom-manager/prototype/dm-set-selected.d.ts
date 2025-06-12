import { IDomManager } from '../dom-manager.types';
/**
 * Sets the selected value of an element by its ID.
 * @param id - The ID of the element to set the selected value for.
 * @param selectionValue - The value to set as selected.
 */
export declare function dmSetSelected<T extends HTMLElement>(this: IDomManager<T>, id: string, selectionValue: string | null): void;
