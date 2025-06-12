import { ITabManager } from '../types/i-tab-manager';
export interface ISmartTabsHorizontalContainerProps {
    manager: ITabManager;
    onSelect: (tabId: string) => void;
}
export declare const SmartTabsHorizontalContainer: ({ manager, onSelect }: ISmartTabsHorizontalContainerProps) => import("@emotion/react/jsx-runtime").JSX.Element;
