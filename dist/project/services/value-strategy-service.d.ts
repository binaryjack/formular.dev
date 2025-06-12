import { IServiceManager } from '../../core/managers/service-manager/service-manager.types';
import { IParserStrategy } from '../../core/managers/value-manager/value-manager.types';
export declare const SValueStrategyService: unique symbol;
export interface IValueStrategyService {
    new (sm: IServiceManager): IValueStrategyService;
    sm: IServiceManager;
    strategies: IParserStrategy<any>[];
    add: (...strategies: IParserStrategy<any>[]) => void;
    remove: (...strategies: IParserStrategy<any>[]) => void;
    reset: () => void;
    sync: () => void;
}
export declare const ValueStrategyService: IValueStrategyService;
