import { IEvents } from '../../../../framework/events/events.types';
import { IClickBaseInput } from '../click-base-input.types';
export declare const onClickHandle: <T extends IEvents>(this: IClickBaseInput, data?: T) => void;
