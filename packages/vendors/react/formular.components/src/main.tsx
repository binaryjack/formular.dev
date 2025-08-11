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
                    {/* 🎨 SMART CONTRAST TEST BUTTONS */}
                    <div className="flex flex-col gap-2 p-4 bg-gray-100 rounded">
                        <h3 className="text-sm font-bold">Smart Contrast Demo:</h3>
                        <div className="flex gap-2 flex-wrap">
                            <Button
                                id={'btn-primary-solid'}
                                title={'Primary Solid'}
                                children={'Primary Solid'}
                                onClick={() => console.log('Primary solid clicked')}
                                variants={{
                                    visualVariant: 'solid',
                                    variant: 'primary',
                                    aspect: { size: 'sm' }
                                }}
                            />
                            <Button
                                id={'btn-danger-solid'}
                                title={'Danger Solid'}
                                children={'Danger Solid'}
                                onClick={() => console.log('Danger solid clicked')}
                                variants={{
                                    visualVariant: 'solid',
                                    variant: 'danger',
                                    aspect: { size: 'sm' }
                                }}
                            />
                            <Button
                                id={'btn-warning-solid'}
                                title={'Warning Solid'}
                                children={'Warning Solid'}
                                onClick={() => console.log('Warning solid clicked')}
                                variants={{
                                    visualVariant: 'solid',
                                    variant: 'warning',
                                    aspect: { size: 'sm' }
                                }}
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <Button
                                id={'btn-primary-outline'}
                                title={'Primary Outline'}
                                children={'Primary Outline'}
                                onClick={() => console.log('Primary outline clicked')}
                                variants={{
                                    visualVariant: 'outline',
                                    variant: 'primary',
                                    aspect: { size: 'sm' }
                                }}
                            />
                            <Button
                                id={'btn-danger-outline'}
                                title={'Danger Outline'}
                                children={'Danger Outline'}
                                onClick={() => console.log('Danger outline clicked')}
                                variants={{
                                    visualVariant: 'outline',
                                    variant: 'danger',
                                    aspect: { size: 'sm' }
                                }}
                            />
                            <Button
                                id={'btn-success-ghost'}
                                title={'Success Ghost'}
                                children={'Success Ghost'}
                                onClick={() => console.log('Success ghost clicked')}
                                variants={{
                                    visualVariant: 'ghost',
                                    variant: 'success',
                                    aspect: { size: 'sm' }
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row w-100 items-center justify-between bg-violet-400">
                        <Label
                            id={'text-1'}
                            text={'Base Text 1'}
                            htmlFor="text-input-1"
                            variants={{
                                variant: 'secondary',
                                aspect: {
                                    size: 'xl',
                                    rounded: true
                                },
                                typography: {
                                    size: '2xl',
                                    variant: 'primary',
                                    case: 'uppercase',
                                    weight: 'bold'
                                }
                            }}
                        />
                        <BaseInput
                            id={'text-input-1'}
                            variants={{
                                variant: 'secondary',
                                aspect: {
                                    size: 'xs',
                                    rounded: false
                                },
                                typography: {
                                    weight: 'bold'
                                }
                            }}
                        />
                        <Button
                            id={'button-1'}
                            title={'Button 1'}
                            children={'Button 1'}
                            variants={{
                                visualVariant: 'solid',
                                variant: 'primary',
                                aspect: {
                                    size: 'sm',
                                    rounded: false
                                },
                                typography: { variant: 'neutral', size: 'sm' }
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

                    <Accordion
                        id={'accordion-1'}
                        title={'Accordion-1'}
                        initialState={'closed'}
                        variants={{
                            variant: 'primary',
                            aspect: { size: 'xl', rounded: false },
                            typography: { variant: 'neutral', size: 'sm' }
                        }}
                    >
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
