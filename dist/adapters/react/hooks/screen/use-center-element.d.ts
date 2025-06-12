import { IScreenProperties } from '../../../../components/context/scrolling/scrolling.context';
import { ElementPositionOutputType } from '../../../../style/global.types';
export declare const useCenterElementTrigger: <T extends HTMLElement>() => {
    elementRef: import('react').RefObject<T>;
    elementPositionRefs: import('../use-element-ref').IElementRef;
    scrollPosition: IScreenProperties;
    toggle: ElementPositionOutputType;
};
