import { ITabManager } from '../types/i-tab-manager';
export interface ISmartTabsDropDownContainerProps {
    manager: ITabManager;
    onSelect: (tabId: string) => void;
}
export declare const SmartTabsDropDownContainer: ({ manager, onSelect }: ISmartTabsDropDownContainerProps) => import("@emotion/react/jsx-runtime").JSX.Element;
