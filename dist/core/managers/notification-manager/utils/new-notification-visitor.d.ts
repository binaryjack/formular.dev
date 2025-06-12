import { IFormular } from '../../../formular-engine/formular-base/formular-base.types';
import { eventSignature } from '../../../framework/events/event-signature';
import { EventsType, IEvents } from '../../../framework/events/events.types';
import { IExtendedInputBase, IInputBase } from '../../../input-engine/core/input-base/input-base.types';
import { INotification, TNotificationMethod, TNotificationMethodAsnyc } from '../notification-manager.types';
export declare const newNotificationVisitor: <T>(event: IEvents, method: TNotificationMethod<T> | TNotificationMethodAsnyc<T>) => INotification;
export declare const notification: <T extends CallableFunction | IExtendedInputBase | IInputBase | IFormular<any>, TEvt extends IEvents>(owner: T, eventHandler: eventSignature<TEvt>, eventType: EventsType, action: string, target: string) => INotification;
