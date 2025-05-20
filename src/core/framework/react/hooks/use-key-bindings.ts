export interface IKeyBindings<T> {
    onEnterCallback?: (e: React.KeyboardEvent<T>) => void
    onEscapeCallback?: (e: React.KeyboardEvent<T>) => void
    onArrowDownCallback?: (e: React.KeyboardEvent<T>) => void
    onArrowUpCallback?: (e: React.KeyboardEvent<T>) => void
    onArrowLeftCallback?: (e: React.KeyboardEvent<T>) => void
    onArrowRightCallback?: (e: React.KeyboardEvent<T>) => void
    onDeleteCallback?: (e: React.KeyboardEvent<T>) => void
    onKeyCallback?: (e: React.KeyboardEvent<T>) => void
}

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

        // Add more keybindings as needed
    }

    return {
        handleKeyDown
    }
}
export default useKeyBindings
