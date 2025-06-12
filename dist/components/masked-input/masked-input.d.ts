import { default as React } from 'react';
interface IMaskedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    mask: string;
    value?: string;
    onChange?: (value: string) => void;
}
declare const MaskedInput: ({ mask, value, onChange, placeholder, className, ...rest }: IMaskedInputProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default MaskedInput;
