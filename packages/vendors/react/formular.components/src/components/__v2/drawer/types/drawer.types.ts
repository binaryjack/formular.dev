import { ElementPositionType } from 'formular.design.system'

export type DrawerType = 'dropdown' | 'expandable'

export interface IDrawerSize {
    width: number
    height: number
}

export interface IDrawerPos {
    x: number
    y: number
}

export interface IDrawerProps {
    id: string
    toggleContextId: string
    owner: React.ReactNode
    children: React.ReactNode
    position: ElementPositionType
    size?: IDrawerSize
    drawerType?: DrawerType
}

export interface IExpandableDrawerProps {
    id: string
    toggleContextId: string
    children: React.ReactNode
    position: ElementPositionType
    size?: IDrawerSize
    drawerType?: DrawerType
}
