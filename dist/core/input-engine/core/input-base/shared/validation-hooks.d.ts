import { IEvents } from '../../../../framework/events/events.types';
/**
 * Runs custom onAfterValidation hook if available
 */
export declare const runAfterValidationHook: <T extends IEvents>(data: T) => void;
/**
 * Handles validation errors by logging them
 */
export declare const handleValidationError: <T extends IEvents>(data: T, context: {
    name: string;
}, functionName: string, error: any) => void;
