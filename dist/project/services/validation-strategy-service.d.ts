import { IServiceManager } from '../../core/managers/service-manager/service-manager.types';
import { IValidationMethodStrategy } from '../../core/managers/validation-manager/validation-manager.types';
export declare const SValidationStrategyService: unique symbol;
export interface IValidationStrategyService {
    new (sm: IServiceManager): IValidationStrategyService;
    sm: IServiceManager;
    strategies: IValidationMethodStrategy[];
    add: (...strategies: IValidationMethodStrategy[]) => void;
    remove: (...strategies: IValidationMethodStrategy[]) => void;
    reset: () => void;
    sync: () => void;
}
export declare const ValidationStrategyService: IValidationStrategyService;
