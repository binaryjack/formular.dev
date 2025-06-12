import { IDomManager } from '../dom-manager.types';
/**
 * Registers a new element if it does not already exist.
 * @param element - The element to register.
 */
export declare function dmRegister<T extends HTMLElement>(this: IDomManager<T>, element: T | null): void;
