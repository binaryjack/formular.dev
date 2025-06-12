import { IEvents } from '../../../../framework/events/events.types';
import { IValidationResult } from '../../../../managers/validation-manager/validation-manager.types';
import { IExtendedInput } from '../input-base.types';
import { hasValidationManager, isRequiredDataMissing, shouldInterruptByBeforeValidation, shouldInterruptByFirstSubmitRule } from './validation-guards';
import { handleValidationError, runAfterValidationHook } from './validation-hooks';
import { triggerUiUpdateNotification, triggerValidationChangeNotification } from './validation-notifications';
import { logValidationDebug, setFieldBusyState, storeValidationResults } from './validation-state';
import { updateAriaAttributes, updateValidationStyles } from './validation-styles';
/**
 * Common validation logic that can be shared between sync and async validation handlers
 */
export declare class ValidationProcessor<T extends IEvents> {
    private readonly context;
    private readonly functionName;
    constructor(context: IExtendedInput, functionName: string);
    /**
     * Performs pre-validation checks and returns false if validation should be skipped
     */
    performPreValidationChecks(data: T): boolean;
    /**
     * Processes validation results and updates UI state
     */
    processValidationResults(data: T, results: IValidationResult[]): void;
    /**
     * Sets the field busy state
     */
    setBusyState(data: T, isBusy: boolean): void;
    /**
     * Handles validation errors
     */
    handleError(data: T, error: any): void;
}
export { handleValidationError, hasValidationManager, isRequiredDataMissing, logValidationDebug, runAfterValidationHook, setFieldBusyState, shouldInterruptByBeforeValidation, shouldInterruptByFirstSubmitRule, storeValidationResults, triggerUiUpdateNotification, triggerValidationChangeNotification, updateAriaAttributes, updateValidationStyles };
