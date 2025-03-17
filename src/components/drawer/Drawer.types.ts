export type DrawerOpenStateType = 'open' | 'closed'
export type DrawerDisplayStyleType = 'top' | 'bottom' | 'center'

export interface IDrawerBase {
    openState: DrawerOpenStateType
    setOpenState: (state: DrawerOpenStateType) => void
}

export interface IDrawerSize {
    width: number
    height: number
}
