import { EventsType } from '../../core/framework/events/events.types';
import { IServiceManager } from '../../core/managers/service-manager/service-manager.types';
export declare const SValidationTriggerService: unique symbol;
export interface IValidationTriggerService {
    new (sm: IServiceManager): IValidationTriggerService;
    triggers: EventsType[];
    sm: IServiceManager;
    canTrigger: (...triggers: EventsType[]) => boolean;
    add: (...triggers: EventsType[]) => void;
    remove: (...triggers: EventsType[]) => void;
    reset: () => void;
    sync: () => void;
}
export declare const ValidationTriggerService: IValidationTriggerService;
