export interface IElementRef {
    height: number;
    width: number;
    top: number;
    left: number;
    right: number;
    x: number;
    y: number;
}
export declare const useElementRef: <T extends HTMLElement>(inputRef: React.RefObject<T>) => {
    elementPositionRefs: IElementRef;
    scrollY: number;
};
