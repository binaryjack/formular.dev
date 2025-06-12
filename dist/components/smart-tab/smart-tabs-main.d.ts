import { ITab } from './types/i-tab';
import { ITabManager } from './types/i-tab-manager';
export interface ISmartTabsMainProps {
    manager: ITabManager;
    onSelected: (tab: ITab) => void;
}
export declare const SmartTabsMain: ({ manager, onSelected }: ISmartTabsMainProps) => import("@emotion/react/jsx-runtime").JSX.Element;
