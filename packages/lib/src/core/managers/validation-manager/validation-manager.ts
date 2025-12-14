/**
 * FORMULAR - ValidationManager Core
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Comprehensive validation engine with country-specific support
 */

import { addValidationStrategies } from './prototype/add-validation-strategies'
import { setTriggerKeyWord } from './prototype/set-trigger-keyword'

import { addValidationStrategy } from './prototype/add-validation-strategy'
import { dispose } from './prototype/dispose'
import { initialize } from './prototype/initialize'
import { validate } from './prototype/validate'
import { validateManyParallel } from './prototype/validate-many-parallel'
import { validateAsync } from './prototype/validateAsync'
import { validateMany } from './prototype/validateMany'
import { validateManyAsync } from './prototype/validateManyAsync'
import { ValidationCache } from './validation-cache'
import { IValidationManager } from './validation-manager.types'

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
export const ValidationManager = function (this: IValidationManager) {
    this.isInitialized = false
    this.isValidating = false
    this.validationStrategies = []
    this.triggerKeyWordType = []
    this.validationCache = new ValidationCache()
    Object.defineProperty(this, 'dependencyName', {
        value: 'ValidationManager',
        writable: false, // Prevent modification
        configurable: false // Prevent deletion or redefinition
    })
} as any as IValidationManager

Object.assign(ValidationManager.prototype, {
    initialize,
    addValidationStrategies,
    addValidationStrategy,
    setTriggerKeyWord,
    validate,
    validateAsync,
    validateMany,
    validateManyAsync,
    validateManyParallel,
    dispose
})
