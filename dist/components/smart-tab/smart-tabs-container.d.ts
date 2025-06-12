import { ITab } from './types/i-tab';
import { ITabManager } from './types/i-tab-manager';
export interface ISmartTabsContainerProps {
    manager: ITabManager;
    onSelected: (tab: ITab) => void;
}
export declare const SmartTabsContainer: ({ manager, onSelected }: ISmartTabsContainerProps) => import("@emotion/react/jsx-runtime").JSX.Element;
