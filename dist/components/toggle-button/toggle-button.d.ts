import { AppBreakPointSizesType, TextCaseType, TextWeightType, VariantNameType } from '../../style/global.types';
interface IToggleButtonProps {
    id: string;
    name: string;
    toggle: boolean;
    children: React.ReactNode;
    disabled?: boolean;
    size?: AppBreakPointSizesType;
    variant?: VariantNameType;
    textCase?: TextCaseType;
    weight?: TextWeightType;
    className?: string;
    width?: string;
    height?: string;
    onToggle: (id: string, newState: boolean) => void;
}
export declare const ToggleButton: ({ id, name, toggle, className, children, size, variant, textCase, weight, onToggle, width, height, disabled }: IToggleButtonProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
