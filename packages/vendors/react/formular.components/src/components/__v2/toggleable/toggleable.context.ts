import { ToggleableStateType } from 'formular.dev.lib'
import React from 'react'

export interface IToggleableContextType {
    toggleState: ToggleableStateType
    setToggleState: (commandId?: string) => void
    id?: string
}
export const toggleableContextTypeDefault: IToggleableContextType = {
    toggleState: 'idle',
    setToggleState: () => {
        return
    },
    id: ''
}

const toggleableContextInstances = new Map<string, React.Context<IToggleableContextType>>()

export const getToggleableContext = (id?: string) => {
    if (!id) {
        if (!toggleableContextInstances.has('default')) {
            return React.createContext<IToggleableContextType>(toggleableContextTypeDefault)
        }
        return toggleableContextInstances.get('default')!
    }
    if (!toggleableContextInstances.has(id)) {
        toggleableContextInstances.set(
            id,
            React.createContext<IToggleableContextType>(toggleableContextTypeDefault)
        )
    }
    return toggleableContextInstances.get(id)!
}
// Keep the default export for backward compatibility
export const toggleableContext = getToggleableContext()
