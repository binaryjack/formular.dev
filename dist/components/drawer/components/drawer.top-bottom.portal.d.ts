import { ToggleableStateType } from '../../../core/framework/common/common.toggleable';
import { ElementPositionOutputType } from '../../../style/global.types';
interface IDrawerTopBottomPortalProps {
    id: string;
    position: ElementPositionOutputType;
    drawerContainerRef: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
    width?: string;
    height?: string;
    toggleState?: ToggleableStateType;
}
export declare const DrawerTopBottomPortal: ({ children, drawerContainerRef, id, position, toggleState, height, width }: IDrawerTopBottomPortalProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
