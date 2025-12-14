/**
 * FORMULAR - Button Component Demo
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import { Button } from './button.ui'

export const ButtonDemo = () => {
    return (
        <div className="button-demo p-4 space-y-8">
            <h2 className="text-2xl font-bold text-primary">🔘 Button Component Demo</h2>

            {/* Basic Usage Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Basic Usage</h3>
                <div className="flex flex-wrap gap-4">
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
                </div>
            </section>

            {/* Visual Variants Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Visual Variants</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Solid Buttons */}
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Solid Variants</h4>
                        <div className="space-y-3">
                            <Button
                                id={'btn-primary-solid-demo'}
                                title={'Primary Solid'}
                                children={'Primary'}
                                onClick={() => console.log('Primary solid clicked')}
                                variants={{
                                    visualVariant: 'solid',
                                    variant: 'primary',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                            <Button
                                id={'btn-secondary-solid-demo'}
                                title={'Secondary Solid'}
                                children={'Secondary'}
                                onClick={() => console.log('Secondary solid clicked')}
                                variants={{
                                    visualVariant: 'solid',
                                    variant: 'secondary',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                            <Button
                                id={'btn-success-solid-demo'}
                                title={'Success Solid'}
                                children={'Success'}
                                onClick={() => console.log('Success solid clicked')}
                                variants={{
                                    visualVariant: 'solid',
                                    variant: 'success',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                            <Button
                                id={'btn-danger-solid-demo'}
                                title={'Danger Solid'}
                                children={'Danger'}
                                onClick={() => console.log('Danger solid clicked')}
                                variants={{
                                    visualVariant: 'solid',
                                    variant: 'danger',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                        </div>
                    </div>

                    {/* Outline Buttons */}
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Outline Variants</h4>
                        <div className="space-y-3">
                            <Button
                                id={'btn-primary-outline-demo'}
                                title={'Primary Outline'}
                                children={'Primary'}
                                onClick={() => console.log('Primary outline clicked')}
                                variants={{
                                    visualVariant: 'outline',
                                    variant: 'primary',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                            <Button
                                id={'btn-secondary-outline-demo'}
                                title={'Secondary Outline'}
                                children={'Secondary'}
                                onClick={() => console.log('Secondary outline clicked')}
                                variants={{
                                    visualVariant: 'outline',
                                    variant: 'secondary',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                            <Button
                                id={'btn-success-outline-demo'}
                                title={'Success Outline'}
                                children={'Success'}
                                onClick={() => console.log('Success outline clicked')}
                                variants={{
                                    visualVariant: 'outline',
                                    variant: 'success',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                            <Button
                                id={'btn-danger-outline-demo'}
                                title={'Danger Outline'}
                                children={'Danger'}
                                onClick={() => console.log('Danger outline clicked')}
                                variants={{
                                    visualVariant: 'outline',
                                    variant: 'danger',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                        </div>
                    </div>

                    {/* Ghost Buttons */}
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Ghost Variants</h4>
                        <div className="space-y-3">
                            <Button
                                id={'btn-primary-ghost-demo'}
                                title={'Primary Ghost'}
                                children={'Primary'}
                                onClick={() => console.log('Primary ghost clicked')}
                                variants={{
                                    visualVariant: 'ghost',
                                    variant: 'primary',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                            <Button
                                id={'btn-secondary-ghost-demo'}
                                title={'Secondary Ghost'}
                                children={'Secondary'}
                                onClick={() => console.log('Secondary ghost clicked')}
                                variants={{
                                    visualVariant: 'ghost',
                                    variant: 'secondary',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                            <Button
                                id={'btn-success-ghost-demo'}
                                title={'Success Ghost'}
                                children={'Success'}
                                onClick={() => console.log('Success ghost clicked')}
                                variants={{
                                    visualVariant: 'ghost',
                                    variant: 'success',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                            <Button
                                id={'btn-danger-ghost-demo'}
                                title={'Danger Ghost'}
                                children={'Danger'}
                                onClick={() => console.log('Danger ghost clicked')}
                                variants={{
                                    visualVariant: 'ghost',
                                    variant: 'danger',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Size Variants Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Size Variants</h3>
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                        <Button
                            id={'btn-xs'}
                            title={'Extra Small Button'}
                            children={'XS'}
                            onClick={() => console.log('XS button clicked')}
                            variants={{
                                visualVariant: 'solid',
                                variant: 'primary',
                                aspect: { size: 'xs', rounded: true }
                            }}
                        />
                        <Button
                            id={'btn-sm'}
                            title={'Small Button'}
                            children={'Small'}
                            onClick={() => console.log('Small button clicked')}
                            variants={{
                                visualVariant: 'solid',
                                variant: 'primary',
                                aspect: { size: 'sm', rounded: true }
                            }}
                        />
                        <Button
                            id={'btn-md'}
                            title={'Medium Button'}
                            children={'Medium'}
                            onClick={() => console.log('Medium button clicked')}
                            variants={{
                                visualVariant: 'solid',
                                variant: 'primary',
                                aspect: { size: 'md', rounded: true }
                            }}
                        />
                        <Button
                            id={'btn-lg'}
                            title={'Large Button'}
                            children={'Large'}
                            onClick={() => console.log('Large button clicked')}
                            variants={{
                                visualVariant: 'solid',
                                variant: 'primary',
                                aspect: { size: 'lg', rounded: true }
                            }}
                        />
                        <Button
                            id={'btn-xl'}
                            title={'Extra Large Button'}
                            children={'Extra Large'}
                            onClick={() => console.log('XL button clicked')}
                            variants={{
                                visualVariant: 'solid',
                                variant: 'primary',
                                aspect: { size: 'xl', rounded: true }
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Rounded vs Square Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">
                    Border Radius Variants
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Rounded Buttons</h4>
                        <div className="space-y-3">
                            <Button
                                id={'btn-rounded-primary'}
                                title={'Rounded Primary'}
                                children={'Rounded Primary'}
                                onClick={() => console.log('Rounded primary clicked')}
                                variants={{
                                    visualVariant: 'solid',
                                    variant: 'primary',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                            <Button
                                id={'btn-rounded-outline'}
                                title={'Rounded Outline'}
                                children={'Rounded Outline'}
                                onClick={() => console.log('Rounded outline clicked')}
                                variants={{
                                    visualVariant: 'outline',
                                    variant: 'secondary',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Square Buttons</h4>
                        <div className="space-y-3">
                            <Button
                                id={'btn-square-primary'}
                                title={'Square Primary'}
                                children={'Square Primary'}
                                onClick={() => console.log('Square primary clicked')}
                                variants={{
                                    visualVariant: 'solid',
                                    variant: 'primary',
                                    aspect: { size: 'md', rounded: false }
                                }}
                            />
                            <Button
                                id={'btn-square-outline'}
                                title={'Square Outline'}
                                children={'Square Outline'}
                                onClick={() => console.log('Square outline clicked')}
                                variants={{
                                    visualVariant: 'outline',
                                    variant: 'secondary',
                                    aspect: { size: 'md', rounded: false }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive States Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Interactive States</h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">
                            Hover & Focus States
                        </h4>
                        <p className="text-sm text-secondary mb-3">
                            Hover over or focus these buttons to see the interactive states:
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button
                                id={'btn-hover-test-solid'}
                                title={'Hover me - Solid'}
                                children={'Hover me (Solid)'}
                                onClick={() => console.log('Hover test solid clicked')}
                                variants={{
                                    visualVariant: 'solid',
                                    variant: 'primary',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                            <Button
                                id={'btn-hover-test-outline'}
                                title={'Hover me - Outline'}
                                children={'Hover me (Outline)'}
                                onClick={() => console.log('Hover test outline clicked')}
                                variants={{
                                    visualVariant: 'outline',
                                    variant: 'success',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                            <Button
                                id={'btn-hover-test-ghost'}
                                title={'Hover me - Ghost'}
                                children={'Hover me (Ghost)'}
                                onClick={() => console.log('Hover test ghost clicked')}
                                variants={{
                                    visualVariant: 'ghost',
                                    variant: 'warning',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Click Feedback</h4>
                        <p className="text-sm text-secondary mb-3">
                            These buttons demonstrate click feedback and ripple effects:
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button
                                id={'btn-click-feedback-1'}
                                title={'Click for feedback'}
                                children={'Click me!'}
                                onClick={() => {
                                    console.log('Button clicked with feedback')
                                    alert('Button clicked! Check console for details.')
                                }}
                                variants={{
                                    visualVariant: 'solid',
                                    variant: 'success',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                            <Button
                                id={'btn-click-feedback-2'}
                                title={'Another click test'}
                                children={'Click me too!'}
                                onClick={() => {
                                    console.log('Second button clicked')
                                    const timestamp = new Date().toLocaleTimeString()
                                    alert(`Clicked at ${timestamp}`)
                                }}
                                variants={{
                                    visualVariant: 'outline',
                                    variant: 'info',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Real-world Examples Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Real-world Examples</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Form Actions</h4>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="text-sm text-secondary mb-4">
                                Typical form action buttons:
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    id={'btn-save'}
                                    title={'Save changes'}
                                    children={'Save'}
                                    onClick={() => console.log('Save clicked')}
                                    variants={{
                                        visualVariant: 'solid',
                                        variant: 'primary',
                                        aspect: { size: 'md', rounded: true }
                                    }}
                                />
                                <Button
                                    id={'btn-cancel'}
                                    title={'Cancel changes'}
                                    children={'Cancel'}
                                    onClick={() => console.log('Cancel clicked')}
                                    variants={{
                                        visualVariant: 'outline',
                                        variant: 'secondary',
                                        aspect: { size: 'md', rounded: true }
                                    }}
                                />
                                <Button
                                    id={'btn-delete'}
                                    title={'Delete item'}
                                    children={'Delete'}
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete this item?')) {
                                            console.log('Delete confirmed')
                                        }
                                    }}
                                    variants={{
                                        visualVariant: 'outline',
                                        variant: 'danger',
                                        aspect: { size: 'md', rounded: true }
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">
                            Navigation Actions
                        </h4>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="text-sm text-secondary mb-4">
                                Common navigation buttons:
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    id={'btn-back'}
                                    title={'Go back'}
                                    children={'← Back'}
                                    onClick={() => console.log('Back clicked')}
                                    variants={{
                                        visualVariant: 'ghost',
                                        variant: 'secondary',
                                        aspect: { size: 'md', rounded: true }
                                    }}
                                />
                                <Button
                                    id={'btn-next'}
                                    title={'Go to next step'}
                                    children={'Next →'}
                                    onClick={() => console.log('Next clicked')}
                                    variants={{
                                        visualVariant: 'solid',
                                        variant: 'primary',
                                        aspect: { size: 'md', rounded: true }
                                    }}
                                />
                                <Button
                                    id={'btn-finish'}
                                    title={'Finish process'}
                                    children={'Finish'}
                                    onClick={() => console.log('Finish clicked')}
                                    variants={{
                                        visualVariant: 'solid',
                                        variant: 'success',
                                        aspect: { size: 'md', rounded: true }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Edge Cases Section */}
            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">
                    Edge Cases & Special Scenarios
                </h3>
                <div className="space-y-4">
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Long Text Content</h4>
                        <div className="space-y-3">
                            <Button
                                id={'btn-long-text'}
                                title={'Button with very long text content'}
                                children={
                                    'This is a button with very long text content to test how it handles overflow'
                                }
                                onClick={() => console.log('Long text button clicked')}
                                variants={{
                                    visualVariant: 'solid',
                                    variant: 'primary',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                            <Button
                                id={'btn-multiline'}
                                title={'Multiline button text'}
                                children={
                                    <span>
                                        Multi-line
                                        <br />
                                        Button Text
                                    </span>
                                }
                                onClick={() => console.log('Multiline button clicked')}
                                variants={{
                                    visualVariant: 'outline',
                                    variant: 'secondary',
                                    aspect: { size: 'lg', rounded: true }
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">
                            Minimum Width Examples
                        </h4>
                        <div className="space-y-3">
                            <Button
                                id={'btn-short'}
                                title={'Short button'}
                                children={'OK'}
                                onClick={() => console.log('Short button clicked')}
                                variants={{
                                    visualVariant: 'solid',
                                    variant: 'primary',
                                    aspect: { size: 'sm', rounded: true }
                                }}
                            />
                            <Button
                                id={'btn-single-char'}
                                title={'Single character button'}
                                children={'✓'}
                                onClick={() => console.log('Single char button clicked')}
                                variants={{
                                    visualVariant: 'solid',
                                    variant: 'success',
                                    aspect: { size: 'md', rounded: true }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
