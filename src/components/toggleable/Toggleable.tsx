import React, { ReactNode, useState } from 'react'

import { ToggleableStateType } from '@core/framework/common/common.toggleable'
import { toggleableContext } from './toggleable.context'

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
