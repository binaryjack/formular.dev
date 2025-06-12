import { EventsType, IEvents } from '../../events/events.types';
export declare const takeLatest: <T extends IEvents>(type: EventsType, timeoutId: NodeJS.Timeout, data?: T) => void;
