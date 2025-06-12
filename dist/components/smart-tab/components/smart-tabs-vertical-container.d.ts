import { ITabManager } from '../types/i-tab-manager';
export interface ISmartTabsVerticalContainerProps {
    manager: ITabManager;
    onSelect: (tabId: string) => void;
}
export declare const SmartTabsVerticalContainer: ({ manager, onSelect }: ISmartTabsVerticalContainerProps) => import("@emotion/react/jsx-runtime").JSX.Element;
