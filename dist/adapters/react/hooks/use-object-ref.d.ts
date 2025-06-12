/** This hook aims to ease the use of dom ref avoiding to have to always cast the ref to its current target */
export declare const useObjectRef: <T extends HTMLElement>() => {
    mainRef: import('react').RefObject<T>;
    castedRefObject: T;
};
