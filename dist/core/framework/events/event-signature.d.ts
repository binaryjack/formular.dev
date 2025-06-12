import { IEvents } from './events.types';
export type eventSignature<T extends IEvents = IEvents> = (data?: T) => void;
