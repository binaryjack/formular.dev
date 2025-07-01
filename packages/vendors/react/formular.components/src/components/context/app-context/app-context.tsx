// const DropdownButtonPortal = React.lazy(
//     () => import('@components/portals/DropdownButtonPortal')
// )

import { AppContext, IAppContext } from './app-context.context'

import useMediaScreens from '@adapters/react/hooks/screen/use-media-screens'
import {
    IConfigurationManager,
    IServiceManager,
    IServiceManagerSetupOptions,
    SConfigurationManager,
    ServiceIdType,
    ServiceManagerFactory
} from 'formular.dev.lib'
import React, { useMemo, useState } from 'react'
import { DrawerSlotCenter } from '../../drawer/components/drawer-slot.center'
import { IDebug } from '../debug/debug.types'
import { useVisualDebugContext } from '../debug/visual-debug.context'

interface AppContextProps {
    debug?: IDebug
    children: React.ReactNode
    // Service manager options
    serviceManager?: IServiceManager
    setupOptions?: IServiceManagerSetupOptions
    autoDispose?: boolean
}

/**
 * Enhanced AppContextProvider that combines app context with service manager functionality.
 *
 * This replaces the need for both ServiceManagerProvider and AppContextProvider by providing:
 * - Application context (breakpoints, media, debug, scroll state)
 * - Service manager functionality (DI container access)
 * - Proper configuration access via service manager
 *
 * @param {AppContextProps} props - The properties for the AppContextProvider component.
 * @returns {JSX.Element} The enhanced AppContextProvider component.
 */
const AppContextProvider = ({
    debug,
    children,
    serviceManager: externalServiceManager,
    setupOptions,
    autoDispose = true
}: AppContextProps) => {
    const [holdScroll, setHoldScroll] = useState<boolean>(false)
    const { breakpoints, media, windowY, windowX } = useMediaScreens()
    const { options } = useVisualDebugContext()

    // Service manager setup (similar to ServiceManagerProvider)
    const [internalServiceManager] = React.useState(() => {
        if (externalServiceManager) {
            return externalServiceManager
        }

        try {
            const manager = ServiceManagerFactory.create(setupOptions)
            console.log('ServiceManager created successfully with options:', setupOptions)
            return manager
        } catch (error) {
            console.error('Failed to create ServiceManager:', error)
            // Return a minimal mock service manager as fallback
            return {
                dispose: () => {},
                lazy: () => () => null,
                resolve: () => null,
                isRegistered: () => false,
                services: {}
            } as any
        }
    })

    const serviceManager = externalServiceManager || internalServiceManager
    const isInternallyManaged = !externalServiceManager

    // Auto-dispose service manager when component unmounts
    React.useEffect(() => {
        return () => {
            if (isInternallyManaged && autoDispose) {
                serviceManager.dispose()
            }
        }
    }, [serviceManager, isInternallyManaged, autoDispose])

    // Service access methods
    const getService = useMemo(() => {
        return function <T>(identifier: ServiceIdType<T>): T | undefined {
            try {
                const resolver = (serviceManager as any).lazy(identifier)
                if (!resolver) {
                    throw new Error(`Service not found for identifier: ${identifier?.toString()}`)
                }
                return resolver() as T
            } catch (error: any) {
                console.warn(
                    `getService: Error resolving service ${identifier?.toString()}:`,
                    error.message
                )
                return undefined
            }
        }
    }, [serviceManager])

    const getServiceSync = useMemo(() => {
        return function <T>(identifier: ServiceIdType<T>): T {
            try {
                return (serviceManager as any).resolve(identifier) as T
            } catch (error: any) {
                throw new Error(
                    `getServiceSync: Error resolving service ${identifier?.toString()}: ${error.message}`
                )
            }
        }
    }, [serviceManager])

    // Enhanced configuration access using service manager
    const getConfigurationByPath = useMemo(() => {
        return function <T>(...path: string[]): T | undefined {
            try {
                const configurationManager =
                    getService<IConfigurationManager>(SConfigurationManager)
                if (configurationManager) {
                    const value = configurationManager.getConfigByName(...path) as T
                    console.log('getConfiguration', path, value)
                    return value
                }
                console.warn('ConfigurationManager not available')
                return undefined
            } catch (error: any) {
                console.error('Error accessing configuration:', error.message)
                return undefined
            }
        }
    }, [getService])

    const contextOutput: IAppContext = {
        // App context properties
        breakpoints: breakpoints,
        media: media,
        isMobileDevice: false,
        debug: options,
        holdScroll,
        setHoldScroll: (hold: boolean) => setHoldScroll(hold),

        // Service manager functionality
        serviceManager,
        getService,
        getServiceSync,
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
