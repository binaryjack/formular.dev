import { IButtonVariant } from '../button/button';
import { ToggleableStateType } from '../../core/framework/common/common.toggleable';
export interface IChevronToggleButtonProps {
    id: string;
    toggleState: ToggleableStateType;
    handleDrawerOpenState: (e: React.MouseEvent<HTMLButtonElement>, state: ToggleableStateType) => void;
    variantProperties?: Partial<IButtonVariant>;
}
export declare const ChevronToggleButton: ({ id, toggleState, handleDrawerOpenState, variantProperties }: IChevronToggleButtonProps) => import("@emotion/react/jsx-runtime").JSX.Element;
