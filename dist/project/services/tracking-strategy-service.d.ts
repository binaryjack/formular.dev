import { IServiceManager } from '../../core/managers/service-manager/service-manager.types';
import { ITrackingOutputProvider } from '../../core/managers/tracking-manager/tracker-manager.types';
export declare const STrackingStrategyService: unique symbol;
export interface ITrackingStrategyService {
    new (sm: IServiceManager): ITrackingStrategyService;
    sm: IServiceManager;
    strategies: ITrackingOutputProvider[];
    add: (...strategies: ITrackingOutputProvider[]) => void;
    remove: (...strategies: ITrackingOutputProvider[]) => void;
    reset: () => void;
    sync: () => void;
}
export declare const TrackingStrategyService: ITrackingStrategyService;
