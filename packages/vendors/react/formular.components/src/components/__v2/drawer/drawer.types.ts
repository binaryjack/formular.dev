import { ElementPositionType } from 'formular.design.system'

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
}
