import { IEvents } from '../../../../framework/events/events.types';
import { IExtendedInput } from '../input-base.types';
/**
 * Checks if validation should be interrupted by custom onBeforeValidation hook
 */
export declare const shouldInterruptByBeforeValidation: <T extends IEvents>(data: T, functionName: string) => boolean;
/**
 * Checks if validation should be interrupted by formular validateOnFirstSubmit setting
 */
export declare const shouldInterruptByFirstSubmitRule: <T extends IEvents>(data: T, functionName: string) => boolean;
/**
 * Checks if required field data is missing
 */
export declare const isRequiredDataMissing: <T extends IEvents>(data: T) => boolean;
/**
 * Checks if validation manager is available
 */
export declare const hasValidationManager: <T extends IEvents>(data: T, context: IExtendedInput, functionName: string) => boolean;
