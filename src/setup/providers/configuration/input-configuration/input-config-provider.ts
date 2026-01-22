import {
    ITrackingStrategyService,
    IValidationStrategyService,
    IValidationTriggerService,
    IValueStrategyService
} from '../../../services'
import { IInputConfiguration } from '../../interfaces/i-input-configuration'

export const SInputConfigProvider = Symbol.for('IInputConfigProvider')

export interface IInputConfigProvider {
    new (
        validationTriggerService: IValidationTriggerService,
        validationService: IValidationStrategyService,
        valueStrategyService: IValueStrategyService,
        trackingStrategyService: ITrackingStrategyService
    ): IInputConfigProvider

    getConfig: () => IInputConfiguration
}

export const InputConfigProvider = function (
    this: IInputConfigProvider,
    validationTriggerService: IValidationTriggerService,
    validationService: IValidationStrategyService,
    valueStrategyService: IValueStrategyService,
    trackingStrategyService: ITrackingStrategyService
): IInputConfigProvider {
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

        const output: IInputConfiguration = {
            validationStrategies: validationService?.strategies,
            trackingStrategies: trackingStrategyService?.strategies,
            valueStrategies: valueStrategyService?.strategies,
            triggerKeyWordType: validationTriggerService?.triggers
        }

        return output
    }

    return this
} as any as IInputConfigProvider
