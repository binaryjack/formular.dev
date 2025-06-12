import { RefObject } from 'react';
type EventType = 'mousedown' | 'mouseup' | 'touchstart' | 'touchend' | 'focusin' | 'focusout';
export declare function useOnClickOutside<T extends HTMLElement = HTMLElement>(ref: RefObject<T> | RefObject<T>[], handler: <E extends MouseEvent | TouchEvent | FocusEvent>(event: E) => void, eventType?: EventType, eventListenerOptions?: AddEventListenerOptions): void;
export {};
