import { ToggleableStateType } from '../../core/framework/common/common.toggleable';
export interface IToggleableContextType {
    toggleState: ToggleableStateType;
    setToggleState: (state: ToggleableStateType) => void;
}
export declare const toggleableContextTypeDefault: IToggleableContextType;
export declare const toggleableContext: import('react').Context<IToggleableContextType>;
