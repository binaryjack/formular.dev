import { AppBreakPointSizesType, TextCaseType, TextWeightType, VariantNameType } from '../../style/global.types';
export interface IButtonVariant {
    variant: VariantNameType;
    size: AppBreakPointSizesType;
    textCase: TextCaseType;
    weight: TextWeightType;
    rounded: boolean;
    width: string;
    height: string;
    className: string;
}
interface IButtonProps {
    id: string;
    title: string;
    children?: React.ReactNode | string;
    onClickCallback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    variantProperties?: Partial<IButtonVariant>;
    loading?: boolean;
    icon?: React.ReactNode;
    disabled?: boolean;
    isToggle?: boolean;
    tabindex?: number;
}
export declare const Button: ({ id, title, children, onClickCallback, variantProperties, loading, icon, disabled, isToggle, tabindex }: IButtonProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
