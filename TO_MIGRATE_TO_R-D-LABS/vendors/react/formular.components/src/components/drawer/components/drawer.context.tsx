import { ToggleableStateType } from 'formular.dev.lib'
import { createContext, useContext } from 'react'

export interface IDrawerContext {
    setOpenState: (e: React.MouseEvent<HTMLElement, MouseEvent>, state: ToggleableStateType) => void
    toggleState: ToggleableStateType
    drawerHeight?: string
    drawerWidth?: string
}

export const drawerContextDefault: IDrawerContext = {
    setOpenState: () => {
        return
    },
    toggleState: 'closed',
    drawerHeight: undefined,
    drawerWidth: undefined
}
export const DrawerContext = createContext<IDrawerContext | undefined>(drawerContextDefault)

export const useDrawerContext = (): IDrawerContext => {
    const context = useContext(DrawerContext)
    if (!context)
        throw Error('Could not use hook useDrawerContext outside Drawer children hierarchy')

    return context
}
