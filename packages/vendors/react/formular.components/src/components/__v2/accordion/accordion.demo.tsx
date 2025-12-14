/**
 * FORMULAR - Accordion Component Demo
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import { Button } from '../button/button.ui'
import { Accordion } from './accordion'
import { AccordionContent } from './accordion-content'

export const AccordionDemo = () => {
    const html = document.documentElement
    const currentTheme = html.dataset.theme

    return (
        <div className="accordion-demo p-4 space-y-8">
            <h2 className="text-2xl font-bold text-primary">🪗 Accordion Component Demo</h2>

            {/* Basic Accordions Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Basic Usage</h3>
                <div className="space-y-4">
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
                        <AccordionContent>
                            <p>
                                This is a short content example for basic accordion functionality.
                            </p>
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
                        <AccordionContent>
                            <p>
                                This is a medium-length content example that demonstrates how the
                                accordion handles more content. It can include multiple paragraphs
                                and elements.
                            </p>
                            <p>
                                The accordion smoothly expands and contracts to accommodate
                                different content sizes.
                            </p>
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
                        <AccordionContent>
                            <div>
                                <h4>Long Content Example</h4>
                                <p>
                                    This accordion contains extensive content to test how the
                                    component handles larger amounts of text and complex layouts.
                                </p>
                                <ul>
                                    <li>Item 1: Feature demonstration</li>
                                    <li>Item 2: Performance testing</li>
                                    <li>Item 3: Layout validation</li>
                                    <li>Item 4: Accessibility checks</li>
                                </ul>
                                <p>
                                    The accordion should smoothly animate and handle all this
                                    content gracefully, maintaining proper spacing and readability
                                    throughout the transition.
                                </p>
                                <p>
                                    Additional content can be added here to further test the
                                    accordion's capabilities with extensive text blocks.
                                </p>
                            </div>
                        </AccordionContent>
                    </Accordion>
                </div>
            </section>

            {/* All Variants Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">All Variants</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Primary & Secondary Variants */}
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">
                            Primary & Secondary Variants
                        </h4>
                        <div className="space-y-4">
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
                                <AccordionContent>
                                    <div
                                        style={{
                                            padding: '1rem',
                                            backgroundColor: 'var(--color-surface-contrast)',
                                            borderRadius: '8px',
                                            color: 'var(--color-text-contrast)'
                                        }}
                                    >
                                        <h4>Primary Content with Contrast Background</h4>
                                        <p>
                                            This content demonstrates the primary variant with high
                                            contrast styling. The background automatically adapts to
                                            provide optimal readability.
                                        </p>
                                        <button
                                            style={{
                                                padding: '0.5rem 1rem',
                                                marginTop: '0.5rem',
                                                backgroundColor: 'var(--color-primary-500)',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            Interactive Element
                                        </button>
                                    </div>
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
                                <AccordionContent>
                                    <p>
                                        Secondary variant provides a more subtle appearance while
                                        maintaining excellent usability and visual hierarchy.
                                    </p>
                                </AccordionContent>
                            </Accordion>
                        </div>
                    </div>

                    {/* Status & Feedback Variants */}
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">
                            Status & Feedback Variants
                        </h4>
                        <div className="space-y-4">
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
                                <AccordionContent>
                                    <div style={{ color: 'var(--color-success-700)' }}>
                                        <p>
                                            <strong>Operation completed successfully!</strong>
                                        </p>
                                        <p>
                                            All validation checks passed and the data has been
                                            processed correctly.
                                        </p>
                                    </div>
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
                                <AccordionContent>
                                    <p style={{ color: 'var(--color-warning-700)' }}>
                                        <strong>
                                            Please review the following items before proceeding.
                                        </strong>
                                    </p>
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
                                <AccordionContent>
                                    <div style={{ color: 'var(--color-danger-700)' }}>
                                        <p>
                                            <strong>Critical Error Detected!</strong>
                                        </p>
                                        <p>
                                            This action cannot be undone. Please review carefully
                                            before proceeding.
                                        </p>
                                        <p>Contact support if you continue to experience issues.</p>
                                    </div>
                                </AccordionContent>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </section>

            {/* Header Presets Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">🎨 Header Presets</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Built-in Presets */}
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">
                            Built-in Header Presets
                        </h4>
                        <div className="space-y-4">
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
                                <AccordionContent>
                                    <p>
                                        The branded preset provides consistent styling that aligns
                                        with your brand identity and design system.
                                    </p>
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
                                <AccordionContent>
                                    <p>
                                        Dark impact preset creates a bold, high-contrast appearance
                                        perfect for important sections.
                                    </p>
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
                                <AccordionContent>
                                    <p>
                                        Light impact preset offers a subtle, elegant appearance
                                        suitable for secondary content sections.
                                    </p>
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
                                <AccordionContent>
                                    <p>
                                        The subtle preset minimizes visual impact while maintaining
                                        functionality, perfect for dense information layouts.
                                    </p>
                                </AccordionContent>
                            </Accordion>
                        </div>
                    </div>

                    {/* Custom Presets */}
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">
                            Custom & Component-Specific Presets
                        </h4>
                        <div className="space-y-4">
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
                                <AccordionContent>
                                    <p>
                                        Custom preset allows complete control over the header
                                        appearance, enabling unique styling for specific use cases.
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
                                <AccordionContent>
                                    <p>
                                        This example demonstrates how to fine-tune existing presets
                                        with additional custom styling while maintaining base
                                        functionality.
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
                                <AccordionContent>
                                    <p>
                                        Extreme customization example showing complete control over
                                        styling with custom classes, shadows, and border treatments.
                                    </p>
                                </AccordionContent>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </section>

            {/* Utility & Info Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">
                    Utility & Info Variants
                </h3>
                <div className="space-y-4">
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
                        <AccordionContent>
                            <div
                                style={{
                                    backgroundColor: 'var(--color-info-50)',
                                    padding: '1rem',
                                    borderRadius: '6px',
                                    border: '1px solid var(--color-info-200)'
                                }}
                            >
                                <p style={{ color: 'var(--color-info-800)', margin: 0 }}>
                                    <strong>💡 Did you know?</strong> This accordion component
                                    supports advanced features like custom animations, accessibility
                                    compliance, and theme integration out of the box.
                                </p>
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
                        <AccordionContent>
                            <p>
                                Neutral variant provides a balanced appearance that works well in
                                any context without competing for attention.
                            </p>
                        </AccordionContent>
                    </Accordion>
                </div>

                {/* Theme Controls */}
                <div
                    style={{
                        marginTop: '2rem',
                        padding: '1rem',
                        backgroundColor: 'var(--color-surface-secondary)',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border-muted)'
                    }}
                >
                    <h4
                        style={{
                            color: 'var(--color-text-primary)',
                            marginBottom: '0.5rem'
                        }}
                    >
                        🎨 Theme Controls
                    </h4>
                    <p
                        style={{
                            color: 'var(--color-text-secondary)',
                            marginBottom: '1rem'
                        }}
                    >
                        Test accordion behavior across different themes
                    </p>
                    <Button
                        id={'theme-toggle-btn'}
                        title={'Toggle Theme'}
                        children={`Switch to ${currentTheme === 'light' ? 'Dark' : 'Light'} Mode`}
                        onClick={() => {
                            const newTheme = currentTheme === 'light' ? 'dark' : 'light'
                            html.dataset.theme = newTheme
                            // Force a re-render by updating a data attribute
                            html.dataset.themeUpdated = Date.now().toString()
                        }}
                        variants={{
                            visualVariant: 'outline',
                            variant: 'primary',
                            aspect: { size: 'sm', rounded: true }
                        }}
                    />
                </div>
            </section>
        </div>
    )
}
