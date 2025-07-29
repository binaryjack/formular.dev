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
import { StatusIcon } from '@components/__v2/status-icon/status-icon.ui'
import { AppContextProvider } from '@components/context/app-context/app-context'
import { VisualDebug } from '@components/context/debug/visual-debug'
import { ScrollContext } from '@components/context/scrolling/scrolling'
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
    <VisualDebug>
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

                    <StatusIcon id={'status-icon-1'} isLoading={false} icon={<MdReadMore />} />
                </div>
                {/* <RouterProvider router={router} /> */}
            </AppContextProvider>
        </ScrollContext>
    </VisualDebug>
)
