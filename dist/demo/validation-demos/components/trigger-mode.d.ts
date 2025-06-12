import { EventsType } from '../../../core/framework/events/events.types';
export interface ITriggerModeProps {
    handleTriggerModeChange: (mode: EventsType[]) => void;
    triggerKeyWord: EventsType[];
}
export declare const TriggerMode: ({ handleTriggerModeChange, triggerKeyWord }: ITriggerModeProps) => import("@emotion/react/jsx-runtime").JSX.Element;
