/**
 * Form submission strategy pattern
 * Allows different submission behaviors for different contexts
 */

import type { IFormular } from './core/formular-engine/formular-base/formular-base.types'

/**
 * Form submission strategy interface
 */
export interface IFormSubmissionStrategy<T extends object> {
    /**
     * Submit form data
     * @param data - Validated form data
     * @param form - Form instance
     * @returns Promise resolving to submission result
     */
    submit(data: T, form: IFormular<T>): Promise<unknown>
}

/**
 * Direct submission strategy
 * Submits data immediately without additional checks
 */
export const DirectSubmissionStrategy = function <T extends object>(
    this: IDirectSubmissionStrategyImpl<T>,
    submitFn: (data: T) => Promise<unknown>
): void {
    this._submitFn = submitFn
} as unknown as {
    new <T extends object>(
        submitFn: (data: T) => Promise<unknown>
    ): IDirectSubmissionStrategyImpl<T>
    prototype: IFormSubmissionStrategy<any>
}

interface IDirectSubmissionStrategyImpl<T extends object> extends IFormSubmissionStrategy<T> {
    _submitFn: (data: T) => Promise<unknown>
}

DirectSubmissionStrategy.prototype.submit = async function <T extends object>(
    this: IDirectSubmissionStrategyImpl<T>,
    data: T,
    form: IFormular<T>
): Promise<unknown> {
    return this._submitFn(data)
}

/**
 * Context-aware submission strategy
 * Used with FormProvider/FormContext in pulsar-formular-ui
 * Ensures validation is complete and checks for user dismissal
 */
export const ContextSubmissionStrategy = function <T extends object>(
    this: IContextSubmissionStrategyImpl<T>,
    submitFn: (data: T) => Promise<unknown>,
    contextChecks?: {
        isDismissed?: () => boolean
        onValidationStart?: () => void
        onValidationComplete?: (isValid: boolean) => void
    }
): void {
    this._submitFn = submitFn
    this._contextChecks = contextChecks ?? {}
} as unknown as {
    new <T extends object>(
        submitFn: (data: T) => Promise<unknown>,
        contextChecks?: {
            isDismissed?: () => boolean
            onValidationStart?: () => void
            onValidationComplete?: (isValid: boolean) => void
        }
    ): IContextSubmissionStrategyImpl<T>
    prototype: IFormSubmissionStrategy<any>
}

interface IContextSubmissionStrategyImpl<T extends object> extends IFormSubmissionStrategy<T> {
    _submitFn: (data: T) => Promise<unknown>
    _contextChecks: {
        isDismissed?: () => boolean
        onValidationStart?: () => void
        onValidationComplete?: (isValid: boolean) => void
    }
}

ContextSubmissionStrategy.prototype.submit = async function <T extends object>(
    this: IContextSubmissionStrategyImpl<T>,
    data: T,
    form: IFormular<T>
): Promise<unknown> {
    // Notify validation start
    if (this._contextChecks.onValidationStart) {
        this._contextChecks.onValidationStart()
    }

    // Wait for all validations to complete
    const isValid = await form.validateForm()

    // Notify validation complete
    if (this._contextChecks.onValidationComplete) {
        this._contextChecks.onValidationComplete(isValid)
    }

    // Check if form is valid
    if (!isValid) {
        throw new Error('Form validation failed')
    }

    // Check if user dismissed
    if (this._contextChecks.isDismissed && this._contextChecks.isDismissed()) {
        throw new Error('Form submission dismissed by user')
    }

    // Submit through strategy
    return this._submitFn(data)
}

/**
 * Form submission error
 */
export class FormSubmissionError extends Error {
    constructor(
        message: string,
        public readonly code: string
    ) {
        super(message)
        this.name = 'FormSubmissionError'
    }
}

/**
 * Form dismissed error
 */
export class FormDismissedError extends FormSubmissionError {
    constructor() {
        super('Form submission was dismissed by the user', 'FORM_DISMISSED')
        this.name = 'FormDismissedError'
    }
}
