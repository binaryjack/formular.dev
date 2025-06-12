export interface IKeyBindings<T> {
    onEnterCallback?: (e: React.KeyboardEvent<T>) => void;
    onEscapeCallback?: (e: React.KeyboardEvent<T>) => void;
    onArrowDownCallback?: (e: React.KeyboardEvent<T>) => void;
    onArrowUpCallback?: (e: React.KeyboardEvent<T>) => void;
    onArrowLeftCallback?: (e: React.KeyboardEvent<T>) => void;
    onArrowRightCallback?: (e: React.KeyboardEvent<T>) => void;
    onDeleteCallback?: (e: React.KeyboardEvent<T>) => void;
    onKeyCallback?: (e: React.KeyboardEvent<T>) => void;
}
declare const useKeyBindings: <T>(options: Partial<IKeyBindings<T>>) => {
    handleKeyDown: (e: React.KeyboardEvent<T>) => void;
};
export default useKeyBindings;
