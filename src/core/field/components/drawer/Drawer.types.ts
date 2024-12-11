export type DrawerOpenStateType = 'open' | 'closed'

export interface IDrawerBase {
    openState: DrawerOpenStateType
    setOpenState: (state: DrawerOpenStateType) => void
}
