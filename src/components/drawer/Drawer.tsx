import { useEffect, useMemo, useRef, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

import { useOnClickOutside } from '../../core/hooks/useOnClickOutside'
import Button from '../button/Button'
import useAppContext from '../context/appContext/AppContext.context'
import Portal from '../portals/Portal'
import { DatePickerContext, IDrawerContext } from './Drawer.context'
import { DrawerDisplayStyleType, DrawerOpenStateType } from './Drawer.types'

interface IDrawerProps {
    id: string
    children: React.ReactNode
    drawerOpenState?: DrawerOpenStateType
    onSetOpenState?: (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        state: DrawerOpenStateType
    ) => void
}

const Drawer = ({ id, children, drawerOpenState, onSetOpenState }: IDrawerProps) => {
    const [drawerHeightSize, setDrawerHeightSize] = useState<number>(0)
    const [drawerDisplayStyle, setDrawerDisplayStyle] = useState<DrawerDisplayStyleType>('bottom')
    const { currentY, middleScreenY, breakpoints, media } = useAppContext()
    const drawerContainerRef = useRef(null)

    const reportDraweSize = (size: number) => {
        setDrawerHeightSize(size)
    }

    const handleClose = () => {
        onSetOpenState?.({} as React.MouseEvent<HTMLElement, MouseEvent>, 'closed')
    }

    useOnClickOutside(drawerContainerRef, handleClose, 'mouseup')

    const drawerContextDefault: IDrawerContext = {
        onSetOpenState,
        drawerOpenState,
        reportDraweSize
    }

    const positionY = useMemo(() => {
        const _el = drawerContainerRef.current as unknown as HTMLDivElement
        if (!_el) return 0
        // console.log('RENDER MEMO')
        return _el.getBoundingClientRect().height / 2 + _el.getBoundingClientRect().top
    }, [(drawerContainerRef?.current as unknown as HTMLDivElement)?.getBoundingClientRect?.()?.top])

    useEffect(() => {
        console.log(currentY, positionY, middleScreenY)
        if (!media?.media) return
        /** if height of drawer is greater than half of screen size */

        if (['M', 'L', 'XL', 'XXL'].includes(media?.media)) {
            setDrawerDisplayStyle(positionY >= middleScreenY ? 'top' : 'bottom')
        } else {
            setDrawerDisplayStyle('center')
        }
    }, [middleScreenY, media, drawerHeightSize, positionY])

    const drawerStyle = `
        #${id}-drawer-slot-${drawerDisplayStyle} .open {
            height: ${drawerHeightSize}px;
        }
       

    `

    return (
        <DatePickerContext.Provider key={id} value={drawerContextDefault}>
            <Portal
                id={id}
                slotName={`drawer-slot-${drawerDisplayStyle}`}
                children={
                    <div
                        ref={drawerContainerRef}
                        id={`${id}-drawer-wrapper`}
                        className={`drawer-container  ${drawerOpenState === 'open' ? 'open' : 'closed'}`}
                    >
                        {children}
                    </div>
                }
            />

            <Portal
                id={id}
                slotName={'close-drawer'}
                children={
                    <Button
                        id={`${id}-close-drawer-btn`}
                        title={'Close Drawer'}
                        variant={{ rounded: true, size: 'md' }}
                        onClickCallback={(e) =>
                            onSetOpenState?.(e, drawerOpenState === 'open' ? 'closed' : 'open')
                        }
                    >
                        {drawerOpenState === 'closed' ? <FaChevronDown /> : <FaChevronUp />}
                    </Button>
                }
            />
        </DatePickerContext.Provider>
    )
}

export default Drawer
