import { useState } from 'react'

import { ToggleableStateType } from 'formular.dev.lib'
import { getToggleableContext, IToggleableContextType } from './toggleable.context'
import { IToggleableProviderProps } from './toggleable.types'

export const Toggleable = ({ children, id, initialState, style }: IToggleableProviderProps) => {
    const [toggleState, setToggleState] = useState<ToggleableStateType>(initialState ?? 'idle')
    const ToggleableContext = getToggleableContext(id)
    const handleToggleState = () => {
        setToggleState((prevState) => (prevState === 'open' ? 'closed' : 'open'))
    }

    const toggleableContext: IToggleableContextType = {
        toggleState,
        setToggleState: handleToggleState,
        id: id
    }

    return (
        <ToggleableContext.Provider value={toggleableContext}>
            <div style={style}> {children}</div>
        </ToggleableContext.Provider>
    )
}
