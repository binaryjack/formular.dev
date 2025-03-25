import { useDrawerContext } from './Drawer.context'

interface DrawerContentProps {
    id: string
}

const DrawerContent = ({ id }: DrawerContentProps) => {
    const { drawerHeight, drawerWidth } = useDrawerContext()
    return (
        <div
            id={id}
            className={`relative flex w-full h-full bg-blue-400 p-3 m-0`}
            style={{ height: drawerHeight, width: drawerWidth }}
        >
            <span>{id} TEST</span>
        </div>
    )
}

export default DrawerContent
