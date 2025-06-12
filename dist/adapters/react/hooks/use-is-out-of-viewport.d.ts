declare const useIsOutOfViewport: (element: React.MutableRefObject<any | undefined>, throttleDelay: number) => {
    isTopOut: boolean;
    isBottomOut: boolean;
};
export default useIsOutOfViewport;
