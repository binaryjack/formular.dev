import { EventsType } from '../../../core/framework/events/events.types';
import { ITrackingOutputProvider } from '../../../core/managers/tracking-manager/tracker-manager.types';
import { IValidationMethodStrategy } from '../../../core/managers/validation-manager/validation-manager.types';
import { IParserStrategy } from '../../../core/managers/value-manager/value-manager.types';
export interface IConfiguration {
    [key: string]: any;
    validationStrategies: IValidationMethodStrategy[];
    trackingStrategies: ITrackingOutputProvider[];
    valueStrategies: IParserStrategy<any>[];
    triggerKeyWordType: EventsType[];
}
