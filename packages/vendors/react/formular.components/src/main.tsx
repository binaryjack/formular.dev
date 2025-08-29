/**
 * FORMULAR - React Components Demo App Entry Point
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Main entry point for the development/demo application
 */

import { Accordion } from '@components/__v2/accordion/accordion'
import { AccordionContent } from '@components/__v2/accordion/accordion-content'
import { Button } from '@components/__v2/button/button.ui'
import { CheckGroupInput } from '@components/__v2/check-group-input/check-group-input.ui'
import { CheckboxInput } from '@components/__v2/checkbox-input/checkbox-input.ui'
import { Dropdown } from '@components/__v2/dropdown/dropdown'
import { FieldSet } from '@components/__v2/field-set/field-set.ui'
import { Label } from '@components/__v2/label/label.ui'
import { RadioInput } from '@components/__v2/radio-input/radio-input.ui'
import { SmartCell } from '@components/__v2/smart-layout/smart-cell.ui'
import { SmartCol } from '@components/__v2/smart-layout/smart-col.ui'
import { SmartLayout } from '@components/__v2/smart-layout/smart-layout.ui'
import { Spinner } from '@components/__v2/spinner/spinner.ui'

import { AppContextProvider } from '@components/context/app-context/app-context'
import { VisualDebug } from '@components/context/debug/visual-debug'
import { ScrollContext } from '@components/context/scrolling/scrolling'
import { clx } from 'formular.design.system'

import { OptionBuilder, OptionsBuilder } from 'formular.dev.lib'
import ReactDOM from 'react-dom/client'

export const onlyOneOption = new OptionBuilder('I Accept').setValue('1').setSequenceId(0).build()

export const mainOptions = new OptionsBuilder()
    .setOptions(
        ...[
            new OptionBuilder('Option 1').setValue('1').setSequenceId(0),
            new OptionBuilder('Option 2').setValue('2').setSequenceId(1),
            new OptionBuilder('Option 3').setValue('3').setSequenceId(2),
            new OptionBuilder('Option 4').setValue('4').setSequenceId(3)
        ]
    )
    .build()

export const mainCheckOptions = new OptionsBuilder()
    .setOptions(
        ...[
            new OptionBuilder('Option 1').setValue('1').setSequenceId(0),
            new OptionBuilder('Option 2').setValue('2').setSequenceId(1),
            new OptionBuilder('Option 3').setValue('3').setSequenceId(2),
            new OptionBuilder('Option 4').setValue('4').setSequenceId(3),
            new OptionBuilder('Option 5').setValue('5').setSequenceId(4),
            new OptionBuilder('Option 6').setValue('6').setSequenceId(5),
            new OptionBuilder('Option 7').setValue('7').setSequenceId(6),
            new OptionBuilder('Option 8').setValue('8').setSequenceId(7),
            new OptionBuilder('Option 9').setValue('9').setSequenceId(8),
            new OptionBuilder('Option 10').setValue('10').setSequenceId(9),
            new OptionBuilder('Option 11').setValue('11').setSequenceId(10),
            new OptionBuilder('Option 12').setValue('12').setSequenceId(11),
            new OptionBuilder('Option 13').setValue('13').setSequenceId(12),
            new OptionBuilder('Option 14').setValue('14').setSequenceId(13),
            new OptionBuilder('Option 15').setValue('15').setSequenceId(14),
            new OptionBuilder('Option 16').setValue('16').setSequenceId(15),
            new OptionBuilder('Option 17').setValue('17').setSequenceId(16)
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

const html = document.documentElement

const currentTheme = html.getAttribute('data-theme')

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
                <SmartLayout id={'flex-laxout-1'} name={'SECTION 1'}>
                    <SmartCol id={'col1'}>
                        <SmartCell id={'flex-cell-101'}>
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
                        </SmartCell>
                        <SmartCell id={'flex-cell-102'}>
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
                        </SmartCell>
                    </SmartCol>
                    <SmartCol id={`col2`}>
                        <SmartCell id={'flex-cell-103'}>
                            <Accordion
                                id={'accordion-1'}
                                title={'Short Accordion'}
                                initialState={'closed'}
                                headerPreset="light-impact"
                                variants={{
                                    variant: 'primary',
                                    aspect: { size: 'xl', rounded: false },
                                    typography: { variant: 'primary', size: 'sm' }
                                }}
                            >
                                <AccordionContent as={'p'}>
                                    This is a short accordion with minimal content.
                                </AccordionContent>
                            </Accordion>

                            <Accordion
                                id={'accordion-2'}
                                title={'Medium Accordion'}
                                initialState={'closed'}
                                headerPreset="dark-impact"
                                variants={{
                                    variant: 'secondary',
                                    aspect: { size: 'xl', rounded: false },
                                    typography: { variant: 'secondary', size: 'sm' }
                                }}
                            >
                                <AccordionContent as={'p'}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    <br />
                                    Sed do eiusmod tempor incididunt ut labore et dolore magna
                                    aliqua.
                                    <br />
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                                    <br />
                                    Laboris nisi ut aliquip ex ea commodo consequat.
                                </AccordionContent>
                            </Accordion>

                            <Accordion
                                id={'accordion-3'}
                                title={'Long Accordion'}
                                initialState={'closed'}
                                variants={{
                                    variant: 'success',
                                    aspect: { size: 'xl', rounded: false },
                                    typography: { variant: 'success', size: 'sm' }
                                }}
                            >
                                <AccordionContent as={'div'}>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                        do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                    <p>
                                        Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt mollit anim id est laborum.
                                    </p>
                                    <p>
                                        Sed ut perspiciatis unde omnis iste natus error sit
                                        voluptatem accusantium doloremque laudantium, totam rem
                                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                                        quasi architecto beatae vitae dicta sunt explicabo.
                                    </p>
                                    <p>
                                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                                        odit aut fugit, sed quia consequuntur magni dolores eos qui
                                        ratione voluptatem sequi nesciunt.
                                    </p>
                                    <ul>
                                        <li>Item 1</li>
                                        <li>Item 2</li>
                                        <li>Item 3</li>
                                        <li>Item 4</li>
                                        <li>Item 5</li>
                                    </ul>
                                </AccordionContent>
                            </Accordion>
                        </SmartCell>
                    </SmartCol>
                </SmartLayout>
                <SmartLayout id={'flex-laxout-2'} name={'SECTION 2'}>
                    <SmartCol id={'col2'}>
                        <SmartCell id={'flex-cell-101'}>
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
                        </SmartCell>
                        <SmartCell id={'flex-cell-102'}>
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
                        </SmartCell>
                    </SmartCol>

                    <SmartCol id={'col2'}>
                        <SmartCell id={'flex-cell-101'}>
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
                        </SmartCell>
                        <SmartCell id={'flex-cell-101'}>
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
                        </SmartCell>
                    </SmartCol>
                </SmartLayout>
                <SmartLayout id={'flex-laxout-1'} name={'SECTION  3'}>
                    <SmartCol id={'ewf'}>
                        <SmartCell id={'flex-cell-101'}>
                            <Spinner size="lg" color="primary" />

                            <CheckGroupInput
                                id={'check-group-input-1'}
                                options={mainCheckOptions}
                                mainLabelVariants={{
                                    variant: 'secondary',
                                    aspect: { size: 'xs' },
                                    typography: {
                                        variant: 'secondary',
                                        size: 'xl',
                                        case: 'uppercase'
                                    }
                                }}
                                variants={{
                                    variant: 'success',
                                    aspect: { size: '2xl' },
                                    typography: {
                                        variant: 'success',
                                        size: '2xl',
                                        case: 'uppercase'
                                    }
                                }}
                            />
                        </SmartCell>

                        <SmartCell id={'flex-cell-101'}>
                            <FieldSet
                                label={
                                    <Label
                                        id={`ml-2 checkbox-label-2`}
                                        htmlFor={`ml-2 checkbox-label-2`}
                                        text={'CHECKBOX'}
                                        variants={{ typography: { variant: 'warning' } }}
                                        className={clx('cursor-pointer', 'select-none')}
                                    />
                                }
                                input={
                                    <CheckboxInput
                                        option={onlyOneOption}
                                        tabIndex={0}
                                        size={1}
                                        autoComplete="off"
                                        initialState={undefined}
                                    />
                                }
                                buttons={undefined}
                            />
                        </SmartCell>
                        <SmartCell id={'flex-cell-101'}>
                            <Dropdown
                                id={'dropdown-1'}
                                label={'Dropdown 1'}
                                initialState={'closed'}
                                options={mainOptions}
                            />
                        </SmartCell>
                        <SmartCell id={'flex-cell-101'}>
                            <Dropdown
                                id={'dropdown-1'}
                                label={'Dropdown 1'}
                                initialState={'closed'}
                                options={mainOptions}
                            />
                        </SmartCell>
                    </SmartCol>
                </SmartLayout>

                <SmartLayout id={'accordion-demo-section'} name={'ACCORDION VARIANTS DEMO'}>
                    <SmartCol id={'accordion-variants-col-1'}>
                        <SmartCell id={'accordion-primary-demo'}>
                            <h3
                                style={{
                                    color: 'var(--color-text-primary)',
                                    fontSize: '1.2rem',
                                    marginBottom: '1rem'
                                }}
                            >
                                Primary & Secondary Variants
                            </h3>
                            <Accordion
                                id={'accordion-demo-primary'}
                                title={'Primary Accordion with Contrast Background'}
                                initialState={'open'}
                                variants={{
                                    variant: 'primary',
                                    aspect: { size: 'lg', rounded: true },
                                    typography: { variant: 'primary', size: 'md' }
                                }}
                            >
                                <AccordionContent as={'div'}>
                                    <p>
                                        This accordion demonstrates the{' '}
                                        <strong>primary variant</strong> with proper contrast
                                        background.
                                    </p>
                                    <p>
                                        The header has a distinct background color that provides
                                        clear visual separation from the content area.
                                    </p>
                                    <ul>
                                        <li>✅ High contrast ratios for accessibility</li>
                                        <li>✅ Automatic light/dark mode support</li>
                                        <li>✅ Semantic token-based styling</li>
                                        <li>✅ Hover and focus states</li>
                                    </ul>
                                </AccordionContent>
                            </Accordion>

                            <Accordion
                                id={'accordion-demo-secondary'}
                                title={'Secondary Accordion'}
                                initialState={'closed'}
                                variants={{
                                    variant: 'secondary',
                                    aspect: { size: 'lg', rounded: true },
                                    typography: { variant: 'secondary', size: 'md' }
                                }}
                            >
                                <AccordionContent as={'div'}>
                                    <p>
                                        This secondary variant shows different semantic colors while
                                        maintaining the same contrast principles.
                                    </p>
                                    <p>
                                        Each variant automatically adapts to light and dark modes.
                                    </p>
                                </AccordionContent>
                            </Accordion>
                        </SmartCell>
                    </SmartCol>

                    <SmartCol id={'accordion-variants-col-2'}>
                        <SmartCell id={'accordion-status-demo'}>
                            <h3
                                style={{
                                    color: 'var(--color-text-primary)',
                                    fontSize: '1.2rem',
                                    marginBottom: '1rem'
                                }}
                            >
                                Status & Feedback Variants
                            </h3>
                            <Accordion
                                id={'accordion-demo-success'}
                                title={'✅ Success State Accordion'}
                                initialState={'closed'}
                                variants={{
                                    variant: 'success',
                                    aspect: { size: 'md', rounded: true },
                                    typography: { variant: 'success', size: 'sm' }
                                }}
                            >
                                <AccordionContent as={'div'}>
                                    <p>
                                        Perfect for showing successful operations or positive
                                        feedback.
                                    </p>
                                    <p>
                                        Green semantic tokens with proper contrast in both light and
                                        dark modes.
                                    </p>
                                </AccordionContent>
                            </Accordion>

                            <Accordion
                                id={'accordion-demo-warning'}
                                title={'⚠️ Warning State Accordion'}
                                initialState={'closed'}
                                headerStyle={{
                                    disableGenericText: true,
                                    forceBackgroundClasses: ['bg-slate-900', 'dark:bg-slate-100'],
                                    forceTextClasses: ['dark:text-black', 'font-medium']
                                }}
                                variants={{
                                    variant: 'warning',
                                    aspect: { size: 'md', rounded: true },
                                    typography: { variant: 'warning', size: 'sm' }
                                }}
                            >
                                <AccordionContent as={'div'}>
                                    <p>Ideal for cautionary information or important notices.</p>
                                    <p>Orange/yellow semantic tokens with clear visibility.</p>
                                </AccordionContent>
                            </Accordion>

                            <Accordion
                                id={'accordion-demo-danger'}
                                title={'❌ Danger State Accordion'}
                                initialState={'closed'}
                                headerStyle={{
                                    disableGenericText: true,
                                    forceBackgroundClasses: ['bg-slate-900', 'dark:bg-slate-100'],
                                    forceTextClasses: ['dark:text-black', 'font-medium']
                                }}
                                variants={{
                                    variant: 'danger',
                                    aspect: { size: 'md', rounded: true },
                                    typography: { variant: 'danger', size: 'sm' }
                                }}
                            >
                                <AccordionContent as={'div'}>
                                    <p>
                                        For error states, destructive actions, or critical alerts.
                                    </p>
                                    <p>
                                        Red semantic tokens with high contrast for immediate
                                        attention.
                                    </p>
                                </AccordionContent>
                            </Accordion>
                        </SmartCell>

                        <SmartCell id={'accordion-utility-demo'}>
                            <h3
                                style={{
                                    color: 'var(--color-text-primary)',
                                    fontSize: '1.2rem',
                                    marginBottom: '1rem'
                                }}
                            >
                                Utility & Info Variants
                            </h3>
                            <Accordion
                                id={'accordion-demo-info'}
                                title={'ℹ️ Information Accordion'}
                                initialState={'open'}
                                headerStyle={{
                                    disableGenericText: true,
                                    forceBackgroundClasses: ['bg-slate-900', 'dark:bg-slate-100'],
                                    forceTextClasses: ['text-black', 'font-medium']
                                }}
                                variants={{
                                    variant: 'info',
                                    aspect: { size: 'md', rounded: true },
                                    typography: { variant: 'info', size: 'sm' }
                                }}
                            >
                                <AccordionContent as={'div'}>
                                    <p>
                                        Perfect for informational content, help text, or
                                        documentation.
                                    </p>
                                    <p>Blue semantic tokens providing calm, informative styling.</p>
                                    <div
                                        style={{
                                            marginTop: '1rem',
                                            padding: '0.5rem',
                                            backgroundColor: 'var(--color-surface-secondary)',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        <small>
                                            <strong>Tip:</strong> Try switching between light and
                                            dark modes to see automatic contrast adaptation!
                                        </small>
                                    </div>
                                </AccordionContent>
                            </Accordion>

                            <Accordion
                                id={'accordion-demo-neutral'}
                                title={'🔧 Neutral Accordion'}
                                initialState={'closed'}
                                variants={{
                                    variant: 'neutral',
                                    aspect: { size: 'md', rounded: true },
                                    typography: { variant: 'neutral', size: 'sm' }
                                }}
                            >
                                <AccordionContent as={'div'}>
                                    <p>
                                        Default styling for general content without specific
                                        semantic meaning.
                                    </p>
                                    <p>Uses surface tokens for subtle, clean appearance.</p>
                                </AccordionContent>
                            </Accordion>

                            <div
                                style={{
                                    marginTop: '1.5rem',
                                    padding: '1rem',
                                    backgroundColor: 'var(--color-surface-secondary)',
                                    borderRadius: '8px',
                                    border: '1px solid var(--color-border-muted)'
                                }}
                            >
                                <h4
                                    style={{
                                        color: 'var(--color-text-primary)',
                                        fontSize: '1rem',
                                        marginBottom: '0.5rem'
                                    }}
                                >
                                    🎨 Theme Toggle Demo
                                </h4>
                                <p
                                    style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--color-text-secondary)',
                                        marginBottom: '1rem'
                                    }}
                                >
                                    Click the button below to toggle between light and dark modes
                                    and see the automatic contrast adaptation:
                                </p>
                                <Button
                                    id={'theme-toggle-btn'}
                                    title={'Toggle Theme'}
                                    children={`Switch to ${currentTheme === 'light' ? 'Dark' : 'Light'} Mode`}
                                    onClick={() => {
                                        const html = document.documentElement
                                        const newTheme =
                                            html.getAttribute('data-theme') === 'light'
                                                ? 'dark'
                                                : 'light'
                                        html.setAttribute('data-theme', newTheme)
                                        // Force re-render to update button text
                                        // setTimeout(() => window.location.reload(), 100)
                                    }}
                                    variants={{
                                        visualVariant: 'outline',
                                        variant: 'primary',
                                        aspect: { size: 'sm', rounded: true }
                                    }}
                                />
                            </div>
                        </SmartCell>
                    </SmartCol>
                </SmartLayout>

                {/* NEW: Header Preset Demo Section */}
                <SmartLayout
                    id={'accordion-header-presets-demo'}
                    name={'🎨 ACCORDION HEADER PRESETS'}
                >
                    <SmartCol id={'header-presets-col-1'}>
                        <SmartCell id={'built-in-presets-demo'}>
                            <h3
                                style={{
                                    color: 'var(--color-text-primary)',
                                    fontSize: '1.2rem',
                                    marginBottom: '1rem'
                                }}
                            >
                                Built-in Header Presets
                            </h3>

                            <Accordion
                                id={'preset-branded'}
                                title={'Branded Preset (Default)'}
                                headerPreset="branded"
                                headerStyle={{
                                    disableGenericText: true,
                                    forceBackgroundClasses: ['bg-slate-900', 'dark:bg-slate-100'],
                                    forceTextClasses: ['text-black', 'font-medium']
                                }}
                                initialState={'open'}
                                variants={{ variant: 'primary' }}
                            >
                                <AccordionContent as={'div'}>
                                    <p>
                                        Uses the <strong>branded</strong> preset with variant colors
                                        and high contrast.
                                    </p>
                                    <p>Perfect for main content areas and primary interactions.</p>
                                </AccordionContent>
                            </Accordion>

                            <Accordion
                                id={'preset-dark-impact'}
                                title={'Dark Impact Preset'}
                                headerPreset="dark-impact"
                                headerStyle={{
                                    disableGenericText: true,
                                    forceBackgroundClasses: ['bg-slate-900', 'dark:bg-slate-100'],
                                    forceTextClasses: ['dark:text-black', 'font-medium']
                                }}
                                initialState={'closed'}
                                variants={{ variant: 'secondary' }}
                            >
                                <AccordionContent as={'div'}>
                                    <p>
                                        This header stays <strong>dark</strong> regardless of
                                        light/dark mode for visual impact.
                                    </p>
                                    <p>Great for creating visual hierarchy and emphasis.</p>
                                </AccordionContent>
                            </Accordion>

                            <Accordion
                                id={'preset-light-impact'}
                                title={'Light Impact Preset'}
                                headerPreset="light-impact"
                                headerStyle={{
                                    disableGenericText: true,
                                    forceBackgroundClasses: ['bg-slate-900', 'dark:bg-slate-100'],
                                    forceTextClasses: ['dark:text-black', 'font-medium']
                                }}
                                initialState={'closed'}
                                variants={{ variant: 'success' }}
                            >
                                <AccordionContent as={'div'}>
                                    <p>
                                        This header stays <strong>light</strong> regardless of theme
                                        mode.
                                    </p>
                                    <p>Perfect for subtle emphasis and clean designs.</p>
                                </AccordionContent>
                            </Accordion>

                            <Accordion
                                id={'preset-subtle'}
                                title={'Subtle Preset'}
                                headerPreset="subtle"
                                headerStyle={{
                                    disableGenericText: true,
                                    forceBackgroundClasses: ['bg-slate-900', 'dark:bg-slate-100'],
                                    forceTextClasses: ['dark:text-black', 'font-medium']
                                }}
                                initialState={'closed'}
                                variants={{ variant: 'warning' }}
                            >
                                <AccordionContent as={'div'}>
                                    <p>
                                        Minimal contrast that <strong>blends</strong> with the
                                        container.
                                    </p>
                                    <p>
                                        Best for content-focused layouts where headers shouldn't
                                        dominate.
                                    </p>
                                </AccordionContent>
                            </Accordion>
                        </SmartCell>
                    </SmartCol>

                    <SmartCol id={'header-presets-col-2'}>
                        <SmartCell id={'custom-presets-demo'}>
                            <h3
                                style={{
                                    color: 'var(--color-text-primary)',
                                    fontSize: '1.2rem',
                                    marginBottom: '1rem'
                                }}
                            >
                                Custom & Component-Specific Presets
                            </h3>

                            <Accordion
                                id={'preset-contrast'}
                                title={'Component-Specific: Contrast'}
                                headerPreset="custom"
                                headerStyle={{
                                    disableGenericText: true,
                                    forceBackgroundClasses: ['bg-slate-900', 'dark:bg-slate-100'],
                                    forceTextClasses: ['dark:text-black', 'font-medium']
                                }}
                                initialState={'closed'}
                                variants={{ variant: 'primary' }}
                            >
                                <AccordionContent as={'div'}>
                                    <p>
                                        Component-specific preset with{' '}
                                        <strong>maximum contrast</strong> for accessibility.
                                    </p>
                                    <p>
                                        Defined in COMPONENT_STYLE_CONFIG for accordions
                                        specifically.
                                    </p>
                                </AccordionContent>
                            </Accordion>

                            <Accordion
                                id={'fine-tuned-example'}
                                title={'Fine-tuned with Custom Classes'}
                                headerPreset="branded"
                                headerStyle={{
                                    disableGenericText: true,
                                    forceBackgroundClasses: ['bg-slate-900', 'dark:bg-slate-100'],
                                    forceTextClasses: ['dark:text-black', 'font-medium']
                                }}
                                initialState={'closed'}
                                variants={{ variant: 'warning' }}
                            >
                                <AccordionContent as={'div'}>
                                    <p>
                                        Branded preset enhanced with{' '}
                                        <strong>shadow and left border</strong>.
                                    </p>
                                    <p>
                                        Shows how to fine-tune presets with additional custom
                                        classes.
                                    </p>
                                </AccordionContent>
                            </Accordion>

                            <Accordion
                                id={'extreme-custom'}
                                title={'Extreme Custom Control'}
                                headerPreset="custom"
                                headerStyle={{
                                    disableGenericText: true,
                                    forceBackgroundClasses: ['bg-slate-800', 'dark:bg-slate-900'],
                                    forceTextClasses: ['font-bold'],
                                    customClasses: ['shadow-xl', 'border-l-8', 'border-accent-400']
                                }}
                                initialState={'closed'}
                                variants={{ variant: 'danger' }}
                            >
                                <AccordionContent as={'div'}>
                                    <p>
                                        Full manual control with{' '}
                                        <strong>custom background, text, and border</strong>.
                                    </p>
                                    <p>
                                        Uses the "custom" preset with complete headerStyle override.
                                    </p>
                                </AccordionContent>
                            </Accordion>
                        </SmartCell>
                    </SmartCol>
                </SmartLayout>

                {/* Spinner Demo */}
                <SmartLayout id={'spinner-demo-section'} name={'SPINNER DEMO'}>
                    <SmartCol id={'spinner-col-1'}>
                        <SmartCell id={'spinner-primary-demo'}>
                            <h3
                                style={{
                                    color: 'var(--color-text-primary)',
                                    fontSize: '1.2rem',
                                    marginBottom: '1rem'
                                }}
                            >
                                Spinner Variants
                            </h3>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <Spinner size="sm" />
                                <Spinner size="md" />
                                <Spinner size="lg" />
                            </div>
                        </SmartCell>
                    </SmartCol>
                </SmartLayout>
                {/* <RouterProvider router={router} /> */}
            </AppContextProvider>
        </ScrollContext>
    </VisualDebug>
)
