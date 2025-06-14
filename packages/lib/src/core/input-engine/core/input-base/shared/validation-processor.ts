import { IEvents } from '@core/framework/events/events.types'
import { IValidationResult } from '@core/managers/validation-manager/validation-manager.types'
import { IExtendedInput } from '../input-base.types'

// Import all shared utilities
import {
    hasValidationManager,
    isRequiredDataMissing,
    shouldInterruptByBeforeValidation,
    shouldInterruptByFirstSubmitRule
} from './validation-guards'
import { handleValidationError, runAfterValidationHook } from './validation-hooks'
import {
    triggerUiUpdateNotification,
    triggerValidationChangeNotification
} from './validation-notifications'
import { logValidationDebug, setFieldBusyState, storeValidationResults } from './validation-state'
import { updateAriaAttributes, updateValidationStyles } from './validation-styles'

/**
 * Common validation logic that can be shared between sync and async validation handlers
 */
interface IValidationProcessor<T extends IEvents> {
    context: IExtendedInput
    functionName: string
    performPreValidationChecks: (data: T) => boolean
    processValidationResults: (data: T, results: IValidationResult[]) => void
    setBusyState: (data: T, isBusy: boolean) => void
    handleError: (data: T, error: any) => void
}

/**
 * Common validation logic that can be shared between sync and async validation handlers
 */
export const ValidationProcessor = function (
    this: IValidationProcessor<any>,
    context: IExtendedInput,
    functionName: string
) {
    this.context = context
    this.functionName = functionName
} as any as new <T extends IEvents>(
    context: IExtendedInput,
    functionName: string
) => IValidationProcessor<T>

Object.assign(ValidationProcessor.prototype, {
    /**
     * Performs pre-validation checks and returns false if validation should be skipped
     */
    performPreValidationChecks: function <T extends IEvents>(
        this: IValidationProcessor<T>,
        data: T
    ): boolean {
        // Check if validation should be interrupted by custom hooks
        if (shouldInterruptByBeforeValidation(data, this.functionName)) {
            return false
        }

        // Check if validation should be interrupted by formular settings
        if (shouldInterruptByFirstSubmitRule(data, this.functionName)) {
            return false
        }

        // Check if required data is missing
        if (isRequiredDataMissing(data)) {
            return false
        }

        // Log debug information
        logValidationDebug(data)

        // Check if validation manager is available
        if (!hasValidationManager(data, this.context, this.functionName)) {
            return false
        }

        return true
    },

    /**
     * Processes validation results and updates UI state
     */
    processValidationResults: function <T extends IEvents>(
        this: IValidationProcessor<T>,
        data: T,
        results: IValidationResult[]
    ): void {
        // Store validation results and update field validity
        storeValidationResults(data, results)

        // Update styles based on validation results
        updateValidationStyles(data, results) // Update ARIA attributes for accessibility
        updateAriaAttributes(data, data.fieldRef?.input?.isValid ?? false)

        // Trigger UI update notification
        triggerUiUpdateNotification(data, this.functionName)

        // Trigger validation change notification
        triggerValidationChangeNotification(data, this.functionName)

        // Run custom post-validation hook
        runAfterValidationHook(data)
    },

    /**
     * Sets the field busy state
     */
    setBusyState: function <T extends IEvents>(
        this: IValidationProcessor<T>,
        data: T,
        isBusy: boolean
    ): void {
        setFieldBusyState(data, isBusy)
    },

    /**
     * Handles validation errors
     */
    handleError: function <T extends IEvents>(
        this: IValidationProcessor<T>,
        data: T,
        error: any
    ): void {
        handleValidationError(data, this.context, this.functionName, error)
    }
})

// Export all utilities for direct use if needed
export {
    handleValidationError,
    hasValidationManager,
    isRequiredDataMissing,
    logValidationDebug,
    runAfterValidationHook,
    setFieldBusyState,
    shouldInterruptByBeforeValidation,
    shouldInterruptByFirstSubmitRule,
    storeValidationResults,
    triggerUiUpdateNotification,
    triggerValidationChangeNotification,
    updateAriaAttributes,
    updateValidationStyles
}
