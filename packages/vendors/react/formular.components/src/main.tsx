/**
 * FORMULAR - React Components Demo App Entry Point
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Main entry point for the development/demo application
 */

import { Accordion } from '@components/__v2/accordion/accordion.ui'
import { Button } from '@components/__v2/button/button.ui'
import { Dropdown } from '@components/__v2/dropdown/dropdown.ui'
import { FlexCell } from '@components/__v2/flex-layout/flex-cell.ui'
import { FlexCol } from '@components/__v2/flex-layout/flex-col.ui'
import { FlexLayout } from '@components/__v2/flex-layout/flex-layout.ui'
import { RadioInput } from '@components/__v2/radio-input/radio-input.ui'
import { Spinner } from '@components/__v2/spinner/spinner.ui'

import { AppContextProvider } from '@components/context/app-context/app-context'
import { VisualDebug } from '@components/context/debug/visual-debug'
import { ScrollContext } from '@components/context/scrolling/scrolling'
import { OptionBuilder, OptionsBuilder } from 'formular.dev.lib'
import ReactDOM from 'react-dom/client'

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

export const mainCheckOptions = new OptionsBuilder()
    .setOptions(
        ...[
            new OptionBuilder('Option 1').setValue('1'),
            new OptionBuilder('Option 2').setValue('2'),
            new OptionBuilder('Option 3').setValue('3'),
            new OptionBuilder('Option 4').setValue('4'),
            new OptionBuilder('Option 5').setValue('5'),
            new OptionBuilder('Option 6').setValue('6'),
            new OptionBuilder('Option 7').setValue('7'),
            new OptionBuilder('Option 8').setValue('8'),
            new OptionBuilder('Option 9').setValue('9'),
            new OptionBuilder('Option 10').setValue('10'),
            new OptionBuilder('Option 11').setValue('11'),
            new OptionBuilder('Option 12').setValue('12'),
            new OptionBuilder('Option 13').setValue('13'),
            new OptionBuilder('Option 14').setValue('14'),
            new OptionBuilder('Option 15').setValue('15'),
            new OptionBuilder('Option 16').setValue('16'),
            new OptionBuilder('Option 17').setValue('17')
        ]
    )
    .build()

document.title = import.meta.env.VITE_APP_NAME ?? 'FORMULAR React Components'
const rootComponent = document.getElementById('root')

if (!rootComponent) {
    throw new Error('Root element not found')
}

const root = ReactDOM.createRoot(rootComponent)

const containerClasses = `flex flex-col gap-1 p-1 bg-slate-500 w-[calc(100vw)] h-full md:h-[calc(40%)] xl:h-[calc(30%)]  overflow-hidden 
                flex-grow-0 flex-shrink-0 flex-wrap`

const columnsClasses = `flex flex-col gap-1 p-1  xs:w-[calc(100%)] md:w-[calc(50%)] xl:w-[calc(20%)]  bg-slate-200`

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
                <FlexLayout id={'flex-laxout-1'}>
                    <FlexCol id={'flex-col-1'}>
                        <FlexCell id={'flex-cell-101'}>
                            <Button
                                id={'btn-danger-outline'}
                                title={'Danger Outline'}
                                children={'Danger Outline'}
                                onClick={() => console.log('Danger outline clicked')}
                                variants={{
                                    visualVariant: 'outline',
                                    variant: 'danger',
                                    aspect: { size: 'sm', rounded: true }
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
                        </FlexCell>
                        <FlexCell id={'flex-cell-103'}>
                            <Accordion
                                id={'accordion-1'}
                                title={'Accordion-1'}
                                initialState={'closed'}
                                variants={{
                                    variant: 'primary',
                                    aspect: { size: 'xl', rounded: false },
                                    typography: { variant: 'primary', size: 'sm' }
                                }}
                            >
                                <p>This is the content of Accordion 1.</p>
                                <p>This is the content of Accordion 1.</p>
                                <p>This is the content of Accordion 1.</p>
                            </Accordion>

                            <Accordion
                                id={'accordion-1'}
                                title={'Accordion-1'}
                                initialState={'closed'}
                                variants={{
                                    variant: 'primary',
                                    aspect: { size: 'xl', rounded: false },
                                    typography: { variant: 'primary', size: 'sm' }
                                }}
                            >
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    <br />
                                    Sed do eiusmod tempor incididunt ut labore et dolore magna
                                    aliqua.
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
                        </FlexCell>
                        <FlexCell id={'flex-cell-101'}>
                            <Button
                                id={'btn-primary-solid'}
                                title={'Primary Solid'}
                                children={'Primary Solid'}
                                onClick={() => console.log('Primary solid clicked')}
                                variants={{
                                    visualVariant: 'solid',
                                    variant: 'primary',
                                    aspect: { size: 'sm', rounded: true }
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
                        </FlexCell>
                    </FlexCol>
                    <FlexCol id={'flex-col-2'}>
                        <FlexCell id={'flex-cell-101'}>
                            <RadioInput
                                id={'radio-input-1'}
                                options={mainOptions}
                                mainLabelVariants={{
                                    variant: 'secondary',
                                    aspect: { size: 'sm', rounded: true },
                                    typography: {
                                        variant: 'secondary',
                                        size: 'sm',
                                        case: 'uppercase'
                                    }
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
                        </FlexCell>
                        <FlexCell id={'flex-cell-101'}>
                            <Spinner size="lg" color="primary" />
                        </FlexCell>
                        <Spinner size="lg" color="primary" />
                    </FlexCol>
                    <FlexCol id={'flex-col-3'}>
                        <FlexCell id={'flex-cell-101'}>
                            <Dropdown
                                id={'dropdown-1'}
                                label={'Dropdown 1'}
                                initialState={'closed'}
                                options={mainOptions}
                            />

                            <Dropdown
                                id={'dropdown-1'}
                                label={'Dropdown 1'}
                                initialState={'closed'}
                                options={mainOptions}
                            />
                        </FlexCell>
                    </FlexCol>
                </FlexLayout>
                {/* <RouterProvider router={router} /> */}
            </AppContextProvider>
        </ScrollContext>
    </VisualDebug>
)
