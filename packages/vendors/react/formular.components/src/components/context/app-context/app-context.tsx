// const DropdownButtonPortal = React.lazy(
//     () => import('@components/portals/DropdownButtonPortal')
// )

import { AppContext, IAppContext } from './app-context.context'

import useMediaScreens from '@adapters/react/hooks/screen/use-media-screens'
import { useService } from '@adapters/react/services/use-service'
import { IConfigurationManager, SConfigurationManager } from 'formular.dev.lib'
import { useState } from 'react'
import { DrawerSlotCenter } from '../../drawer/components/drawer-slot.center'
import { IDebug } from '../debug/debug.types'
import { useVisualDebugContext } from '../debug/visual-debug.context'

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
    const [holdScroll, setHoldScroll] = useState<boolean>(false)
    const { breakpoints, media, windowY, windowX } = useMediaScreens()

    const { options } = useVisualDebugContext()
    const { getService } = useService()
    const configurationManager = getService<IConfigurationManager>(SConfigurationManager)

    const getConfigurationByPath = function <T>(...path: string[]): T | undefined {
        if (configurationManager) {
            const value = configurationManager.getConfigByName(...path) as T
            console.log('getConfigurationByPath', path, value)
            return value
        }
        return undefined
    }

    const contextOutput: IAppContext = {
        breakpoints: breakpoints,
        media: media,
        isMobileDevice: false,
        debug: options,
        holdScroll,
        setHoldScroll: (hold: boolean) => setHoldScroll(hold),
        getConfiguration: getConfigurationByPath
    }

    return (
        <AppContext.Provider value={contextOutput}>
            <div className="z-50 absolute flex flex-1 items-center justify-center top-0 w-full  max-h-[20px] bg-blue-900 text-blue-100 text-sm ">{`${media.media} - ${media.orientation} - x: ${windowX} y:${windowY}`}</div>
            <DrawerSlotCenter id={'center'} slotName={'drawer-slot'} opensToThe="center" />

            <div className="body-container absolute flex flex-col overflow-y-auto p-0 top-[20px] bottom-[25px]  items-stretch justify-stretch w-full  h-auto bg-gray-900">
                {children}
            </div>
            <div className="z-50 absolute flex flex-1 items-center justify-center bottom-0 w-full  h-8 bg-blue-900 text-blue-100 text-sm ">{`${media.media} - ${media.orientation} - x: ${windowX} y:${windowY}`}</div>
        </AppContext.Provider>
    )
}

export { AppContextProvider }
