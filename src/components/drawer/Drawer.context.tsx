import { createContext, useContext } from 'react'

import { DrawerOpenStateType } from './Drawer.types'

export interface IDrawerContext {
    drawerOpenState?: DrawerOpenStateType
    onSetOpenState?: (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        state: DrawerOpenStateType
    ) => void
    reportDraweSize: (size: number) => void
}

export const drawerContextDefault: IDrawerContext = {
    drawerOpenState: 'closed',
    onSetOpenState: () => {
        return
    },
    reportDraweSize: () => {
        return
    }
}
const DrawerContext = createContext<IDrawerContext>(drawerContextDefault)

const useDrawerContext = (): IDrawerContext => {
    return useContext(DrawerContext)
}

export { DrawerContext as DatePickerContext, useDrawerContext }
