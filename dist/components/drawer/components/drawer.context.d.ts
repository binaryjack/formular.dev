import { ToggleableStateType } from '../../../core/framework/common/common.toggleable';
export interface IDrawerContext {
    setOpenState: (e: React.MouseEvent<HTMLElement, MouseEvent>, state: ToggleableStateType) => void;
    toggleState: ToggleableStateType;
    drawerHeight?: string;
    drawerWidth?: string;
}
export declare const drawerContextDefault: IDrawerContext;
export declare const DrawerContext: import('react').Context<IDrawerContext | undefined>;
export declare const useDrawerContext: () => IDrawerContext;
