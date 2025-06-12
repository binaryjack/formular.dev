import { default as React } from 'react';
declare const useRippleEffect: <E extends React.MouseEvent<HTMLButtonElement, MouseEvent>>(onClickCallback: (e: E) => void, disabled: boolean) => {
    mainRef: React.RefObject<HTMLButtonElement>;
    castedRefObject: HTMLButtonElement;
    onClick: (e: E) => void;
    classRef: string;
    rippleStyle: React.CSSProperties;
};
export default useRippleEffect;
