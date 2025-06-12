import { IExtendedInput, IInputBase } from '../../input-engine/core/input-base/input-base.types';
import { EventsType, IEvents } from './events.types';
export declare const newEvent: (fieldName: string, emitterName: string, type: EventsType, action: string, target?: string, fieldRef?: IExtendedInput | IInputBase) => IEvents;
