import { createContext, useContext } from 'react'

import { DrawerOpenStateType } from './Drawer.types'

export interface IDrawerContext {
    drawerOpenState?: DrawerOpenStateType
    onSetOpenState?: (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        state: DrawerOpenStateType
    ) => void
    drawerHeight?: string
    drawerWidth?: string
}

export const drawerContextDefault: IDrawerContext = {
    drawerOpenState: 'closed',
    onSetOpenState: () => {
        return
    },
    drawerHeight: undefined,
    drawerWidth: undefined
}
export const DrawerContext = createContext<IDrawerContext>(drawerContextDefault)

export const useDrawerContext = (): IDrawerContext => {
    const context = useContext(DrawerContext)
    if (!context)
        throw Error('Could not use hook useDrawerContext outside Drawer children hierarchy')

    return context
}
