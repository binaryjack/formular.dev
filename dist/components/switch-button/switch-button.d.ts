import { ISwitchButtonOptions } from './switch-button.types';
interface ISwitchButtonProps {
    fieldName: string;
    options: ISwitchButtonOptions;
    onToggle: (value: boolean) => void;
    isToggle: boolean;
}
export declare const SwitchButton: ({ fieldName, options, onToggle, isToggle }: ISwitchButtonProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
