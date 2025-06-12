import { IFormular } from '../formular-base.types';
/**
 * Checks if the Formy instance has changes and executes a callback if so.
 * @param callback - The callback to execute if changes are detected.
 */
export declare const hasChanges: <T extends object>(this: IFormular<T>, callback: () => void) => void;
