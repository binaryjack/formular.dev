import { ToggleableStateType } from 'formular.dev.lib'
import React from 'react'

export interface IDrawerContext {
    state: ToggleableStateType
    toggle: (state: ToggleableStateType) => void
    height: string
    width: string
    toggleContextId?: string
}

export const defaultDrawerContext: IDrawerContext = {
    state: 'idle',
    toggle: () => {
        return
    },
    width: '200px',
    height: '400px',
    toggleContextId: undefined
}

export const DrawerContext = React.createContext<IDrawerContext>(defaultDrawerContext)
export const useDrawerContext = () => {
    return React.useContext(DrawerContext)
}
