import { IEvents } from '@core/framework/events/events.types'
import { IValidationResult } from '@core/managers/validation-manager/validation-manager.types'
import { IExtendedInput } from '../input-base.types'
import { ValidationProcessor } from '../shared'

export const handleValidationAsync = async function <T extends IEvents>(
    this: IExtendedInput,
    data: T
) {
    return new Promise<IValidationResult[]>(async (resolve, reject) => {
        const processor = new ValidationProcessor(this, handleValidationAsync.name)

        try {
            // Perform pre-validation checks
            if (!processor.performPreValidationChecks(data)) {
                resolve([])
                return
            }

            let results: IValidationResult[] = []

            processor.setBusyState(data, true)

            // Perform asynchronous validation
            results = await data?.fieldRef?.input.validationManager.validateAsync(data?.fieldRef)

            processor.setBusyState(data, false)

            // Process validation results and update UI
            processor.processValidationResults(data, results)

            resolve(results)
        } catch (e: any) {
            processor.handleError(data, e)
            reject(new Error(e))
        } finally {
            processor.setBusyState(data, false)
        }
    })
}
