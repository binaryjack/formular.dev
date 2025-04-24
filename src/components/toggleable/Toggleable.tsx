import React, { ReactNode, useState } from 'react'

import { toggleableContext } from './toggleable.context'
import { ToggleableStateType } from './toggleable.types'

interface ToggleableProviderProps {
    children: ReactNode
}

export const Toggleable: React.FC<ToggleableProviderProps> = ({ children }) => {
    const [toggleState, setToggleState] = useState<ToggleableStateType>('idle')

    return (
        <toggleableContext.Provider value={{ toggleState, setToggleState }}>
            {children}
        </toggleableContext.Provider>
    )
}
