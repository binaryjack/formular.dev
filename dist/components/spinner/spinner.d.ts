interface SpinnerProps {
    width?: number;
    height?: number;
    strokeWidth?: number;
    strokeOppacity?: number;
    strokeColor?: string;
    activeColor?: string;
    frameWidth?: number;
    frameHeight?: number;
}
declare const Spinner: ({ frameWidth, frameHeight, width, height, strokeOppacity, strokeWidth, strokeColor, activeColor }: SpinnerProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default Spinner;
