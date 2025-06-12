import { IEvents } from '../../../../framework/events/events.types';
import { IValidationResult } from '../../../../managers/validation-manager/validation-manager.types';
/**
 * Sets the busy state of an input field
 */
export declare const setFieldBusyState: <T extends IEvents>(data: T, isBusy: boolean) => void;
/**
 * Stores validation results and updates field validity state
 */
export declare const storeValidationResults: <T extends IEvents>(data: T, results: IValidationResult[]) => void;
/**
 * Logs validation debug information
 */
export declare const logValidationDebug: <T extends IEvents>(data: T) => void;
