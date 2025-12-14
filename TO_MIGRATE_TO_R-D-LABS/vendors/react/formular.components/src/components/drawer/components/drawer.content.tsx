import { useDrawerContext } from './drawer.context'

interface DrawerContentProps {
    id: string
}

export const DrawerContent = ({ id }: DrawerContentProps) => {
    const { drawerHeight, drawerWidth } = useDrawerContext()
    return (
        <div
            id={id}
            className={`relative flex w-full h-full bg-blue-400 p-3 m-0 `}
            style={{ height: drawerHeight, width: drawerWidth }}
        >
            <span>{id} TEST</span>
        </div>
    )
}
