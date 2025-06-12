import { ToggleableStateType } from '../../../core/framework/common/common.toggleable';
import { ElementPositionOutputType } from '../../../style/global.types';
export type OverflowingEdgeType = 'top' | 'bottom' | 'none';
export declare const useDrawerIsOverflowing: <T extends HTMLElement>(element: T, position: ElementPositionOutputType, toggleState?: ToggleableStateType, height?: string) => {
    isOverflowingAt: OverflowingEdgeType;
};
