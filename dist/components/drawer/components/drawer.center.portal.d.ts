import { ToggleableStateType } from '../../../core/framework/common/common.toggleable';
import { ElementPositionOutputType } from '../../../style/global.types';
interface IDrawerCenterPortalProps {
    id: string;
    position: ElementPositionOutputType;
    drawerContainerRef: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
    width?: string;
    height?: string;
    toggleState?: ToggleableStateType;
}
export declare const DrawerCenterPortal: ({ children, drawerContainerRef, id, position, toggleState, height, width }: IDrawerCenterPortalProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
