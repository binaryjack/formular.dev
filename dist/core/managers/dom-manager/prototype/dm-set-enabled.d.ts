import { IDomManager } from '../dom-manager.types';
/**
 * Enables or disables an element by its ID.
 * @param id - The ID of the element to enable or disable.
 * @param enabled - True to enable, false to disable.
 */
export declare function dmSetEnabled<T extends HTMLElement>(this: IDomManager<T>, id: string, enabled: boolean): void;
