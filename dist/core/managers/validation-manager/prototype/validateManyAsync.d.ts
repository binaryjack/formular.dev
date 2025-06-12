import { IExtendedInput } from '../../../input-engine/core/input-base/input-base.types';
import { IValidationManager, IValidationResult } from '../validation-manager.types';
/**
 * Validates the provided data using the strategies defined in the Validator instance.
 * @param {IValidationStrategyData} data - The data to be validated.
 * @returns {IValidationResult[]} An array of validation results from the applied strategies.
 */
export declare const validateManyAsync: (this: IValidationManager, fields: IExtendedInput[], reset?: boolean) => Promise<IValidationResult[]>;
