/**
 * Interface for specifying key event callbacks for useKeyBindings hook.
 * Each callback receives the React KeyboardEvent for the target element.
 */
export interface IKeyBindings<T> {
    /** Called on any key event, before specific key callbacks. */
    onKeyCallback?: (e: React.KeyboardEvent<T>) => void
    /** Called when the Enter key is pressed. */
    onEnterCallback?: (e: React.KeyboardEvent<T>) => void

    onSpacebarCallback?: (e: React.KeyboardEvent<T>) => void
    /** Called when the Escape key is pressed. */
    onEscapeCallback?: (e: React.KeyboardEvent<T>) => void
    /** Called when the ArrowDown key is pressed. */
    onArrowDownCallback?: (e: React.KeyboardEvent<T>) => void
    /** Called when the ArrowUp key is pressed. */
    onArrowUpCallback?: (e: React.KeyboardEvent<T>) => void
    /** Called when the ArrowLeft key is pressed. */
    onArrowLeftCallback?: (e: React.KeyboardEvent<T>) => void
    /** Called when the ArrowRight key is pressed. */
    onArrowRightCallback?: (e: React.KeyboardEvent<T>) => void
    /** Called when the Delete key is pressed. */
    onDeleteCallback?: (e: React.KeyboardEvent<T>) => void
}

/**
 * React hook for handling keyboard events with customizable callbacks.
 *
 * @param options - Partial set of key event callbacks to handle.
 * @returns An object containing the handleKeyDown function to be used as an event handler.
 *
 * @example
 * const { handleKeyDown } = useKeyBindings<HTMLInputElement>({
 *   onEnterCallback: (e) => { ... },
 *   onEscapeCallback: (e) => { ... },
 * });
 * <input onKeyDown={handleKeyDown} />
 */
const useKeyBindings = <T>(options: Partial<IKeyBindings<T>>) => {
    const handleKeyDown = (e: React.KeyboardEvent<T>) => {
        if (options.onKeyCallback) {
            options.onKeyCallback(e)
            // e.preventDefault()
        }
        if (options.onEnterCallback && e.key === 'Enter') {
            options.onEnterCallback(e)
            // e.preventDefault()
        }
        if (options.onEscapeCallback && e.key === 'Escape') {
            options.onEscapeCallback(e)
            // e.preventDefault()
        }
        if (options.onArrowDownCallback && e.key === 'ArrowDown') {
            options.onArrowDownCallback(e)
            //e.preventDefault()
        }
        if (options.onArrowUpCallback && e.key === 'ArrowUp') {
            options.onArrowUpCallback(e)
            // e.preventDefault()
        }
        if (options.onDeleteCallback && e.key === 'Delete') {
            options.onDeleteCallback(e)
            // e.preventDefault()
        }
        if (options.onArrowLeftCallback && e.key === 'ArrowLeft') {
            options.onArrowLeftCallback(e)
            // e.preventDefault()
        }
        if (options.onArrowRightCallback && e.key === 'ArrowRight') {
            options.onArrowRightCallback(e)
            // e.preventDefault()
        }
        if (options.onSpacebarCallback && e.key === ' ') {
            options.onSpacebarCallback(e)
            // e.preventDefault()
        }
        // Add more keybindings as needed
    }

    return {
        handleKeyDown
    }
}
export default useKeyBindings
