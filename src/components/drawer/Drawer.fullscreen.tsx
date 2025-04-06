import { ReactNode } from 'react'

interface IDrawerFullScreenSlotProps {
    children: ReactNode
}

export const DrawerFullScreenSlot = ({ children }: IDrawerFullScreenSlotProps) => {
    return <div>{children}</div>
}
