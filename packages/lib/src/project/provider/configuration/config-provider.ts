import { ITrackingStrategyService } from '../../services/tracking-strategy-service'
import { IValidationStrategyService } from '../../services/validation-strategy-service'
import { IValidationTriggerService } from '../../services/validation-trigger-service'
import { IValueStrategyService } from '../../services/value-strategy-service'
import { IConfiguration } from '../interfaces/i-configuration'

export const SConfigProvider = Symbol.for('IConfigProvider')

export interface IConfigProvider {
    new (
        validationTriggerService: IValidationTriggerService,
        validationService: IValidationStrategyService,
        valueStrategyService: IValueStrategyService,
        trackingStrategyService: ITrackingStrategyService
    ): IConfigProvider

    getConfig: () => IConfiguration
}

export const ConfigProvider = function (
    this: IConfigProvider,
    validationTriggerService: IValidationTriggerService,
    validationService: IValidationStrategyService,
    valueStrategyService: IValueStrategyService,
    trackingStrategyService: ITrackingStrategyService
): IConfigProvider {
    this.getConfig = () => {
        if (
            !validationTriggerService ||
            !validationService ||
            !valueStrategyService ||
            !trackingStrategyService
        ) {
            throw new Error(
                'One or more services are not provided. Please ensure all required services are available.'
            )
        }

        const output: IConfiguration = {
            validationStrategies: validationService?.strategies,
            trackingStrategies: trackingStrategyService?.strategies,
            valueStrategies: valueStrategyService?.strategies,
            triggerKeyWordType: validationTriggerService?.triggers
        }

        return output
    }

    return this
} as any as IConfigProvider
