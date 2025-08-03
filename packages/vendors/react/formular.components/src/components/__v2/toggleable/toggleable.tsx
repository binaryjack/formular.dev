import { useRef, useState } from 'react'

import { ToggleableStateType } from 'formular.dev.lib'

import { getToggleableContext, IToggleableContextType } from './toggleable.context'
import { IToggleableProviderProps } from './toggleable.types'

export const Toggleable = ({ children, id, initialState, style }: IToggleableProviderProps) => {
    const [toggleState, setToggleState] = useState<ToggleableStateType>(initialState ?? 'idle')
    const ToggleableContext = getToggleableContext(id)
    const toggleableContainerRef = useRef<HTMLDivElement>(null)

    const handleToggleState = (state?: ToggleableStateType) => {
        if (state) {
            setToggleState(state)
            return
        }
        setToggleState((prevState: ToggleableStateType) =>
            prevState === 'open' ? 'closed' : 'open'
        )
    }

    const toggleableContext: IToggleableContextType = {
        toggleState,
        setToggleState: handleToggleState,
        id: id,
        containerRef: toggleableContainerRef
    }

    return (
        <ToggleableContext.Provider value={toggleableContext}>
            <div id={id} data-toggleable-container={id} ref={toggleableContainerRef} style={style}>
                {children}
            </div>
        </ToggleableContext.Provider>
    )
}
