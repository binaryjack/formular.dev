import { IEvents } from '@core/framework/events/events.types'
import { IValidationResult } from '@core/managers/validation-manager/validation-manager.types'
import { IExtendedInput } from '../input-base.types'
import { ValidationProcessor } from '../shared'

export const handleValidation = function <T extends IEvents>(this: IExtendedInput, data: T) {
    const processor = new ValidationProcessor(this, handleValidation.name)

    try {
        // Perform pre-validation checks
        if (!processor.performPreValidationChecks(data)) {
            return []
        }

        let results: IValidationResult[] = []

        processor.setBusyState(data, true)

        // Perform synchronous validation
        results = data?.fieldRef?.input.validationManager.validate(data?.fieldRef)

        processor.setBusyState(data, false)

        // Process validation results and update UI
        processor.processValidationResults(data, results)

        return results
    } catch (e: any) {
        processor.handleError(data, e)
    } finally {
        processor.setBusyState(data, false)
    }
    return []
}
