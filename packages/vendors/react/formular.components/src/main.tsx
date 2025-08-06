/**
 * FORMULAR - React Components Demo App Entry Point
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Main entry point for the development/demo application
 */

import { BaseInput } from '@components/__v2/base-input/base-input.ui'
import { Button } from '@components/__v2/button/button.ui'
import { CheckboxInput } from '@components/__v2/checkbox-input/checkbox-input.ui'

import { Accordion } from '@components/__v2/accordion/accordion.ui'
import { Dropdown } from '@components/__v2/dropdown/dropdown.ui'
import { Label } from '@components/__v2/label/label.ui'
import { RadioInput } from '@components/__v2/radio-input/radio-input.ui'
import { StatusIcon } from '@components/__v2/status-icon/status-icon.ui'
import { AppContextProvider } from '@components/context/app-context/app-context'
import { VisualDebug } from '@components/context/debug/visual-debug'
import { ScrollContext } from '@components/context/scrolling/scrolling'
import Spinner from '@components/spinner/spinner'
import { OptionBuilder, OptionsBuilder } from 'formular.dev.lib'
import ReactDOM from 'react-dom/client'
import { MdReadMore } from 'react-icons/md'

export const mainOptions = new OptionsBuilder()
    .setOptions(
        ...[
            new OptionBuilder('Option 1').setValue('1'),
            new OptionBuilder('Option 2').setValue('2'),
            new OptionBuilder('Option 3').setValue('3'),
            new OptionBuilder('Option 4').setValue('4')
        ]
    )
    .build()

document.title = import.meta.env.VITE_APP_NAME ?? 'FORMULAR React Components'
const rootComponent = document.getElementById('root')

if (!rootComponent) {
    throw new Error('Root element not found')
}

const root = ReactDOM.createRoot(rootComponent)
root.render(
    <VisualDebug options={{ enabled: false, color: 'bg-blue-100' }}>
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
                    <div className="flex flex-row w-100 items-center justify-between bg-violet-400">
                        <Label
                            id={'text-1'}
                            text={'Base Text 1'}
                            htmlFor="text-input-1"
                            className={'bg-slate-50'}
                            variants={{ size: '2xl' }}
                        />
                        <BaseInput
                            id={'text-input-1'}
                            variants={{
                                variant: 'secondary',
                                size: 'xs',
                                weight: 'bold',
                                rounded: true,
                                width: '10%',
                                height: '10px'
                            }}
                        />
                        <Button
                            id={'button-1'}
                            title={'Button 1'}
                            children={'Button 1'}
                            variants={{
                                type: 'solid',
                                color: 'danger',
                                size: 'sm',
                                rounded: true,
                                weight: 'bold'
                            }}
                            onClick={function (
                                e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                            ): void {
                                console.log('Button 1 clicked', e)
                            }}
                        />
                    </div>
                    <Spinner size="lg" color="primary" />
                    <StatusIcon id={'status-icon-1'} isLoading={true} icon={<MdReadMore />} />

                    <Dropdown
                        id={'dropdown-1'}
                        label={'Dropdown 1'}
                        initialState={'closed'}
                        options={mainOptions}
                    />

                    <CheckboxInput
                        id={'checkbox-1'}
                        label={'Checkbox 1'}
                        tabIndex={0}
                        size={1}
                        className={'bg-blue-100'}
                        autoComplete="off"
                        initialState={undefined}
                    />

                    <RadioInput id={'radio-input-1'} options={mainOptions} />

                    <Accordion id={'accordion-1'} title={'Accordion-1'} initialState={'closed'}>
                        <p>This is the content of Accordion 1.</p>
                        <p>This is the content of Accordion 1.</p>
                        <p>This is the content of Accordion 1.</p>
                    </Accordion>
                    <Accordion id={'accordion-1'} title={'Accordion-1'} initialState={'closed'}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            <br />
                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            <br />
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                            <br />
                            Laboris nisi ut aliquip ex ea commodo consequat.
                            <br />
                            Duis aute irure dolor in reprehenderit in voluptate velit.
                            <br />
                            Esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                    </Accordion>
                    <h2 className="text-2xl font-bold">Formular Components</h2>
                </div>
                {/* <RouterProvider router={router} /> */}
            </AppContextProvider>
        </ScrollContext>
    </VisualDebug>
)
