import { IValidationManager } from './validation-manager.types';
/**
 * Validator class that implements the IValidator interface.
 *
 * @class
 * @implements {IValidator}
 *
 * @method addStrategies
 * @param {...IValidatorStrategy[]} strategies - An array of strategies to be added.
 *
 * @method validate
 * @param {IValidatorStrategyData} data - The data to be validated.
 * @returns {IValidationResult[]} An array of validation results from the applied strategies.
 */
export declare const ValidationManager: IValidationManager;
