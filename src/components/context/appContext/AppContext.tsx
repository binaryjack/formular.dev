// const DropdownButtonPortal = React.lazy(
//     () => import('@components/portals/DropdownButtonPortal')
// )

import { useState } from 'react'

import useIsomorphicLayoutEffect from '../../../core/hooks/useIsomorphicLayout'
import { AppContext, IAppContext } from './AppContext.context'

interface AppContextProps {
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
const AppContextProvider = ({ children }: AppContextProps) => {
    const [currentY, setCurrentY] = useState<number>(0)

    const updateY = (e: Event) => {
        e.stopPropagation()
        setCurrentY(window.scrollY)
    }

    useIsomorphicLayoutEffect(() => {
        window.addEventListener('scroll', updateY, { passive: true })

        return () => {
            window.removeEventListener('scroll', updateY)
        }
    }, [])

    const contextOutput: IAppContext = {
        currentY: currentY
    }

    return <AppContext.Provider value={contextOutput}>{children}</AppContext.Provider>
}

export { AppContextProvider }
