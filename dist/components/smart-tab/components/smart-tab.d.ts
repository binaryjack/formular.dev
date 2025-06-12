import { ITab } from '../types/i-tab';
export interface SmartTabProps {
    tab: ITab;
    onSelect: (id: string) => void;
}
export declare const SmartTab: ({ tab, onSelect }: SmartTabProps) => import("@emotion/react/jsx-runtime").JSX.Element;
