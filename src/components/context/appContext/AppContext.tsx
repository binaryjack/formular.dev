// const DropdownButtonPortal = React.lazy(
//     () => import('@components/portals/DropdownButtonPortal')
// )

import useMediaScreens from '../../../core/hooks/screen/useMediaScreens'
import { AppContext, IAppContext } from './AppContext.context'

import { IDebug } from '../debug/debug.types'
import { useVisualDebugContext } from '../debug/VisualDebug.context'

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
    const { breakpoints, media, windowY, windowX } = useMediaScreens()

    const { options } = useVisualDebugContext()

    const contextOutput: IAppContext = {
        breakpoints: breakpoints,
        media: media,
        isMobileDevice: false,
        debug: options
    }

    return (
        <AppContext.Provider value={contextOutput}>
            <div className="z-50 sticky flex flex-1 items-center justify-center top-0 w-full  h-6 bg-blue-900 text-blue-100 text-sm ">{`${media.media} - ${media.orientation} - x: ${windowX} y:${windowY}`}</div>
            {children}
        </AppContext.Provider>
    )
}

export { AppContextProvider }
