import { IEvents } from '../../../../framework/events/events.types';
import { IValidationResult } from '../../../../managers/validation-manager/validation-manager.types';
/**
 * Updates style manager with validation states
 */
export declare const updateValidationStyles: <T extends IEvents>(data: T, results: IValidationResult[]) => void;
/**
 * Updates ARIA attributes for accessibility
 */
export declare const updateAriaAttributes: <T extends IEvents>(data: T, isValid: boolean) => void;
