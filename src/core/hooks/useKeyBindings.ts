export interface IKeyBindings<T> {
    onEnterCallback?: () => void
    onEscapeCallback?: () => void
    onArrowDownCallback?: () => void
    onArrowUpCallback?: () => void
    onDeleteCallback?: () => void
}

const useKeyBindings = <T>(options: Partial<IKeyBindings<T>>) => {
    const handleKeyDown = (e: React.KeyboardEvent<T>) => {
        if (options.onEnterCallback && e.key === 'Enter') {
            options.onEnterCallback()
            // e.preventDefault()
        }
        if (options.onEscapeCallback && e.key === 'Escape') {
            options.onEscapeCallback()
            // e.preventDefault()
        }
        if (options.onArrowDownCallback && e.key === 'ArrowDown') {
            options.onArrowDownCallback()
            //e.preventDefault()
        }
        if (options.onArrowUpCallback && e.key === 'ArrowUp') {
            options.onArrowUpCallback()
            // e.preventDefault()
        }
        if (options.onDeleteCallback && e.key === 'Delete') {
            options.onDeleteCallback()
            // e.preventDefault()
        }
        // Add more keybindings as needed
    }

    return {
        handleKeyDown
    }
}
export default useKeyBindings
