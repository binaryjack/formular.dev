import { createContext, useContext } from 'react'

import { DrawerOpenStateType } from './Drawer.types'

export interface IDrawerContext {
    drawerOpenState?: DrawerOpenStateType
    onSetOpenState?: (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        state: DrawerOpenStateType
    ) => void
    drawerHeight: string
    drawerWidth: string
}

export const drawerContextDefault: IDrawerContext = {
    drawerOpenState: 'closed',
    onSetOpenState: () => {
        return
    },
    drawerHeight: '0px',
    drawerWidth: '0px'
}
const DrawerContext = createContext<IDrawerContext>(drawerContextDefault)

const useDrawerContext = (): IDrawerContext => {
    return useContext(DrawerContext)
}

export { DrawerContext as DatePickerContext, useDrawerContext }
