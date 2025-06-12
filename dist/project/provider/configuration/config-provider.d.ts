import { ITrackingStrategyService } from '../../services/tracking-strategy-service';
import { IValidationStrategyService } from '../../services/validation-strategy-service';
import { IValidationTriggerService } from '../../services/validation-trigger-service';
import { IValueStrategyService } from '../../services/value-strategy-service';
import { IConfiguration } from './i-configuration';
export declare const SConfigProvider: unique symbol;
export interface IConfigProvider {
    new (validationTriggerService: IValidationTriggerService, validationService: IValidationStrategyService, valueStrategyService: IValueStrategyService, trackingStrategyService: ITrackingStrategyService): IConfigProvider;
    getConfig: () => IConfiguration;
}
export declare const ConfigProvider: IConfigProvider;
