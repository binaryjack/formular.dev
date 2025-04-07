import React, { ReactNode, useState } from 'react'

import { toggleableContext } from './Toggleable.context'
import { ToggleableStateType } from './Toggleable.types'

interface ToggleableProviderProps {
    children: ReactNode
}

export const Toggleable: React.FC<ToggleableProviderProps> = ({ children }) => {
    const [toggleState, setToggleState] = useState<ToggleableStateType>('closed')

    return (
        <toggleableContext.Provider value={{ toggleState, setToggleState }}>
            {children}
        </toggleableContext.Provider>
    )
}
