import { IServiceManager } from '@core/managers/service-manager/service-manager.types'
import {
    ITrackingStrategyService,
    STrackingStrategyService
} from '../../services/tracking-strategy-service'
import {
    IValidationStrategyService,
    SValidationStrategyService
} from '../../services/validation-strategy-service'
import { IValidationTriggerService } from '../../services/validation-trigger-service'
import { IValueStrategyService, SValueStrategyService } from '../../services/value-strategy-service'
import { IConfiguration } from './i-configuration'

export const SConfigProvider = Symbol.for('IConfigProvider')

export interface IConfigProvider {
    new (sm: IServiceManager): IConfigProvider
    getConfig: () => IConfiguration
}

export const ConfigProvider = function (
    this: IConfigProvider,
    sm: IServiceManager
): IConfigProvider {
    if (!sm) {
        throw new Error(
            'ServiceManager is not provided. Please provide a valid ServiceManager instance.'
        )
    }

    const validationTriggerService = sm.resolve<IValidationTriggerService>(
        'ValidationTriggerService'
    )
    const validationService = sm.resolve<IValidationStrategyService>(SValidationStrategyService)
    const valueStrategyService = sm.resolve<IValueStrategyService>(SValueStrategyService)
    const trackingStrategyService = sm.resolve<ITrackingStrategyService>(STrackingStrategyService)

    this.getConfig = () => {
        const output: IConfiguration = {
            validationStrategies: validationService.strategies,
            trackingStrategies: trackingStrategyService.strategies,
            valueStrategies: valueStrategyService.strategies,
            triggerKeyWordType: validationTriggerService.triggers
        }

        return output
    }

    return this
} as any as IConfigProvider
