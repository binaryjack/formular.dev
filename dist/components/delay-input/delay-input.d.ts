interface IDelayInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    delay: number;
    onChangeCallback: (value: string) => void;
    onClearCallback: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    canGotFocus?: boolean;
    classNames?: string;
    tabIndex?: number;
}
declare const DelayInput: ({ classNames, delay, canGotFocus, onChangeCallback, onClearCallback, tabIndex, ...rest }: IDelayInputProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default DelayInput;
