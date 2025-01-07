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
            e.preventDefault()
            options.onEnterCallback()
        }
        if (options.onEscapeCallback && e.key === 'Escape') {
            e.preventDefault()
            options.onEscapeCallback()
        }
        if (options.onArrowDownCallback && e.key === 'ArrowDown') {
            e.preventDefault()
            options.onArrowDownCallback()
        }
        if (options.onArrowUpCallback && e.key === 'ArrowUp') {
            e.preventDefault()
            options.onArrowUpCallback()
        }
        if (options.onDeleteCallback && e.key === 'Delete') {
            e.preventDefault()
            options.onDeleteCallback()
        }
        // Add more keybindings as needed
    }

    return {
        handleKeyDown
    }
}
export default useKeyBindings
