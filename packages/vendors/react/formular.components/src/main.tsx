/**
 * FORMULAR - React Components Demo App Entry Point
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Main entry point for the development/demo application
 */

import { BaseInput } from '@components/__v2/base-input/base-input.ui'
import { BaseText } from '@components/__v2/base-text/base-text.ui'
import { Button } from '@components/__v2/button/button.ui'
import { ChevronToggle } from '@components/__v2/chevron-toggle/chevron-toggle.ui'
import { Drawer } from '@components/__v2/drawer/drawer.ui'
import { StatusIcon } from '@components/__v2/status-icon/status-icon.ui'
import { Toggleable } from '@components/__v2/toggleable/toggleable'
import { AppContextProvider } from '@components/context/app-context/app-context'
import { VisualDebug } from '@components/context/debug/visual-debug'
import { ScrollContext } from '@components/context/scrolling/scrolling'
import Spinner from '@components/spinner/spinner'
import ReactDOM from 'react-dom/client'
import { MdReadMore } from 'react-icons/md'
import './index.css'

document.title = import.meta.env.VITE_APP_NAME ?? 'FORMULAR React Components'
const rootComponent = document.getElementById('root')

if (!rootComponent) {
    throw new Error('Root element not found')
}

const root = ReactDOM.createRoot(rootComponent)
root.render(
    <VisualDebug options={{ enabled: true, color: 'bg-blue-100' }}>
        <ScrollContext>
            <AppContextProvider
                setupOptions={{
                    includeCoreManagers: true,
                    includeFormularManager: true,
                    includeInputEngine: true,
                    includeBaseConfigurations: true
                }}
            >
                <div className="flex flex-col  w-screen items-center justify-center h-screen">
                    <Button
                        id={'button-1'}
                        title={'Button 1'}
                        children={'Button 1'}
                        onClick={function (
                            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                        ): void {
                            console.log('Button 1 clicked', e)
                        }}
                    />
                    <BaseText
                        id={'text-1'}
                        text={'Base Text 1'}
                        htmlFor="text-input-1"
                        className={'bg-slate-50 text-2xl'}
                    />
                    <BaseInput id={'text-input-1'} dataClass={'base-input'} />
                    <Spinner size="lg" color="primary" />
                    <StatusIcon id={'status-icon-1'} isLoading={true} icon={<MdReadMore />} />

                    <Toggleable
                        id={'toggleable-1'}
                        initialState={'idle'}
                        style={{
                            position: 'absolute',
                            width: 'auto',
                            height: 'auto',
                            left: '50px',
                            top: '50px'
                        }}
                    >
                        <div className="bg-red-100 flex flex-row p-4 rounded-md shadow-md">
                            <Drawer
                                owner={<BaseInput id={'text-input-2'} dataClass={'base-input'} />}
                                id={'drawer-1'}
                                toggleContextId={'toggleable-1'}
                                position={'center'}
                            >
                                <div className="p-4">
                                    <h2 className="text-lg font-bold">Drawer Content</h2>
                                    <p>This is a drawer component.</p>
                                </div>
                            </Drawer>
                            <ChevronToggle
                                id={'chevron-toggle-1'}
                                toggleContextId={'toggleable-1'}
                                initialToggleState={'idle'}
                            />
                        </div>
                    </Toggleable>
                </div>
                {/* <RouterProvider router={router} /> */}
            </AppContextProvider>
        </ScrollContext>
    </VisualDebug>
)
