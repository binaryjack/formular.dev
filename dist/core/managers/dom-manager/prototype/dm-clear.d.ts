import { IDomManager } from '../dom-manager.types';
/**
 * Clears all registered elements by resetting their values and states.
 */
export declare function dmClear<T extends HTMLElement>(this: IDomManager<T>): void;
