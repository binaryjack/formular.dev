// const DropdownButtonPortal = React.lazy(
//     () => import('@components/portals/DropdownButtonPortal')
// )

import { useRef, useState } from 'react'

import useMediaScreens from '../../../core/hooks/screen/useMediaScreens'
import useIsomorphicLayoutEffect from '../../../core/hooks/useIsomorphicLayout'
import useThrottle from '../../../core/hooks/useThrottle'
import { AppContext, IAppContext } from './AppContext.context'

import { IDebug } from '../debug/debug.types'

interface AppContextProps {
    debug?: IDebug
    children: React.ReactNode
}

/**
 * AppContextProvider component that provides application context to its children.
 *
 *
 * @param {AppContextProps} props - The properties for the AppContextProvider component.
 * @param {React.ReactNode} props.children - The child components that will receive the context.
 *
 * @returns {JSX.Element} The AppContextProvider component with the provided context.
 *
 * @description
 * This component initializes the application context and provides it to its children.
 * It uses `useAppDispatch` to dispatch actions and `useSelector` to select state from the Redux store.
 * It also uses `useIsomorphicLayoutEffect` to perform side effects during the render phase.
 *
 * The context output includes:
 * - `currentMessage`: The current message from the state.
 * - `clearCurrentMessage`: A function to clear the current message.
 *
 * The component also renders a `Toast` component along with its children.
 */
const AppContextProvider = ({ debug, children }: AppContextProps) => {
    const [currentY, setCurrentY] = useState<number>(0)
    const [middleScreenY, setMiddleScreenY] = useState<number>(0)
    const [middleScreenRefPositionY, setMiddleScreenRefPositionY] = useState<number>(0)
    const middleScreenRef = useRef(null)

    const { breakpoints, media, windowY, windowX } = useMediaScreens()

    const updateY = useThrottle(() => {
        setCurrentY(window.scrollY)
        const computeMiddleOfScreen = window.innerHeight / 2 + window.scrollY

        setMiddleScreenY(computeMiddleOfScreen)

        const _mspy = middleScreenRef?.current as unknown as HTMLDivElement

        if (!_mspy) return
        setMiddleScreenRefPositionY(_mspy.getBoundingClientRect().top + window.scrollY)
    }, 2)

    useIsomorphicLayoutEffect(() => {
        window.addEventListener('scroll', updateY, { passive: true })
        updateY()
        return () => {
            window.removeEventListener('scroll', updateY)
        }
    }, [])

    const contextOutput: IAppContext = {
        breakpoints: breakpoints,
        media: media,
        currentY: currentY,
        middleScreenY: middleScreenY,
        middleScreenRefPositionY: middleScreenRefPositionY,
        isMobileDevice: false
    }

    return (
        <AppContext.Provider value={contextOutput}>
            <div className="z-50 sticky flex flex-1 items-center justify-center top-0 w-full h-6 bg-blue-900 text-blue-100 text-sm ">{`${media.media} - ${media.orientation} - x: ${windowX} y:${windowY}`}</div>

            <div
                style={{
                    top: `${middleScreenRefPositionY}px`,
                    display: 'flex',
                    background: 'red',
                    width: '100%',
                    height: debug ? '6px' : '0px',
                    position: 'absolute',
                    zIndex: debug ? 99999 : -1
                }}
            />
            <div
                ref={middleScreenRef}
                style={{
                    top: `${middleScreenY}px`,
                    display: 'flex',
                    background: debug?.color,
                    width: '100%',
                    height: debug ? '5px' : '0px',
                    position: 'absolute',
                    zIndex: debug ? 9999 : -1
                }}
            />
            {children}
        </AppContext.Provider>
    )
}

export { AppContextProvider }
