import { EventsType, IEvents } from '../../../framework/events/events.types';
import { INotificationManager } from '../notification-manager-base.types';
export declare const debounceNotify: <T extends IEvents>(this: INotificationManager, type: EventsType, delay: number, data?: T) => void;
