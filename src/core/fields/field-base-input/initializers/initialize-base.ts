import { IBuilderParams } from '@core/factory/builder/field-builder'
import { IFieldBaseInput } from '@core/fields/field-base-input/field-input-base-types'
import { generalExceptionHandler } from '@core/general-exception-handler/genaral-exception-handler'
import { defaultPrecheck, IInitilizationCheckResult } from '../prototype/check-initialized'

export const initializeBase = function (this: IFieldBaseInput, params: IBuilderParams): boolean {
    let check: IInitilizationCheckResult = defaultPrecheck
    try {
        check = this.checkInitialized()
        if (!check.success) {
            this.initializeTracking(params.trackingStrategies)
                .initializeNotifier(params.notifierInstance)
                .initializeDommable()
                .initializeValidationStrategy(params.descriptor, ...params.validationStrategies)
                .initializeStyle()
                .initializeDrawerableState()
                .initializeValueStrategy(...params.valueStrategies)
        }

        check = this.checkInitialized()

        if (!check.success) {
            generalExceptionHandler(undefined, 'critical', this.name, check.errors.join('\n'))
        }
        return check.success
    } catch (e: any) {
        generalExceptionHandler(
            undefined,
            'critical',
            this.name,
            `an error has occured when initializing initializeBase ${this.name} class: ${e.message}`
        )
        return false
    }
}
