import { EventsType, IEvents } from '../../events/events.types';
export declare const getCallByType: <T extends IEvents>(type: EventsType) => T | undefined;
