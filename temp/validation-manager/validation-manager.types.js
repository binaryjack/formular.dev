"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrorsCodes = exports.newValidationResult = exports.newValidationResults = void 0;
const newValidationResults = (isValid, results, formId) => {
    return { isValid, results: results ?? [], formId };
};
exports.newValidationResults = newValidationResults;
const newValidationResult = (state, fieldName, code, triggerEventTypes, error, guide) => {
    return { state, fieldName, code, error, guide, triggerEventTypes };
};
exports.newValidationResult = newValidationResult;
exports.ValidationErrorsCodes = {
    min: 'MIN_ERROR',
    max: 'MAX_ERROR',
    minLength: 'MIN_LENGTH_ERROR',
    maxLength: 'MAX_LENGTH_ERROR',
    required: 'REQUIRED',
    pattern: 'PATTERN',
    custom: 'CUSTOM'
};
