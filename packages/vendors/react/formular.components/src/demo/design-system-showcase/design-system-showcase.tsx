import { Button } from '@components/button/button'
import { SwitchButton } from '@components/switch-button/switch-button'
import {
    colors,
    cx,
    generateButtonStyles,
    generateInputStyles,
    generateValidationStyles,
    spacing
} from 'formular.design.system'
import React from 'react'

/**
 * Design System Showcase Component
 *
 * Demonstrates the integration and usage of the design system with formular.components.
 * Shows how to use design tokens, utility functions, and pre-built CSS classes.
 */
export const DesignSystemShowcase: React.FC = () => {
    const handleButtonClick = (action: string) => (e: React.MouseEvent) => {
        console.log(`Design System Demo: ${action}`, e)
    }

    return (
        <div className="design-system-showcase p-8 space-y-8">
            <header className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    🎨 Design System Integration Showcase
                </h1>
                <p className="text-gray-600">
                    Demonstrating formular.components integration with the design system
                </p>
            </header>

            {/* Button Showcase */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Button Components</h2>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-600">All Variants</h3>
                    <div className="flex flex-wrap gap-4">
                        {(
                            [
                                'primary',
                                'secondary',
                                'danger',
                                'success',
                                'warning',
                                'info'
                            ] as const
                        ).map((variant) => (
                            <Button
                                key={variant}
                                id={`btn-${variant}`}
                                title={`${variant} button`}
                                children={variant.charAt(0).toUpperCase() + variant.slice(1)}
                                variantProperties={{ variant, size: 'md' }}
                                onClickCallback={handleButtonClick(`${variant}-clicked`)}
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-600">All Sizes</h3>
                    <div className="flex flex-wrap items-center gap-4">
                        {(['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
                            <Button
                                key={size}
                                id={`btn-size-${size}`}
                                title={`${size} button`}
                                children={size.toUpperCase()}
                                variantProperties={{ variant: 'primary', size }}
                                onClickCallback={handleButtonClick(`size-${size}-clicked`)}
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-600">States</h3>
                    <div className="flex flex-wrap gap-4">
                        <Button
                            id="btn-normal"
                            title="Normal button"
                            children="Normal"
                            variantProperties={{ variant: 'primary', size: 'md' }}
                            onClickCallback={handleButtonClick('normal-clicked')}
                        />
                        <Button
                            id="btn-loading"
                            title="Loading button"
                            children="Loading"
                            variantProperties={{ variant: 'primary', size: 'md' }}
                            loading={true}
                            onClickCallback={handleButtonClick('loading-clicked')}
                        />
                        <Button
                            id="btn-disabled"
                            title="Disabled button"
                            children="Disabled"
                            variantProperties={{ variant: 'primary', size: 'md' }}
                            disabled={true}
                            onClickCallback={handleButtonClick('disabled-clicked')}
                        />
                    </div>
                </div>
            </section>

            {/* Switch Button Showcase */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Switch Components</h2>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-600">Switch Variants</h3>
                    <div className="flex flex-wrap gap-6">
                        {(
                            [
                                'primary',
                                'secondary',
                                'danger',
                                'success',
                                'warning',
                                'info'
                            ] as const
                        ).map((variant) => (
                            <div key={variant} className="flex items-center gap-2">
                                <SwitchButton
                                    fieldName={`switch-${variant}`}
                                    options={{ orientation: 'horizontal', size: 'md', variant }}
                                    onToggle={(value) => console.log(`${variant} switch:`, value)}
                                    isToggle={true}
                                />
                                <span className="text-sm text-gray-600 capitalize">{variant}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-600">Switch Sizes</h3>
                    <div className="flex flex-wrap items-center gap-6">
                        {(['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
                            <div key={size} className="flex items-center gap-2">
                                <SwitchButton
                                    fieldName={`switch-size-${size}`}
                                    options={{
                                        orientation: 'horizontal',
                                        size,
                                        variant: 'primary'
                                    }}
                                    onToggle={(value) => console.log(`${size} switch:`, value)}
                                    isToggle={true}
                                />
                                <span className="text-sm text-gray-600">{size.toUpperCase()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Design System Utilities Demo */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Design System Utilities</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Style Generators */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-600">Style Generators</h3>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                            <p className="text-sm text-gray-700">
                                <strong>Button:</strong>{' '}
                                <code className="bg-white px-2 py-1 rounded text-xs">
                                    {generateButtonStyles('solid', 'primary', 'md')}
                                </code>
                            </p>
                            <p className="text-sm text-gray-700">
                                <strong>Input:</strong>{' '}
                                <code className="bg-white px-2 py-1 rounded text-xs">
                                    {generateInputStyles('md', {
                                        focused: true,
                                        error: false,
                                        disabled: false,
                                        hovered: false,
                                        pressed: false,
                                        loading: false
                                    })}
                                </code>
                            </p>
                            <p className="text-sm text-gray-700">
                                <strong>Validation:</strong>{' '}
                                <code className="bg-white px-2 py-1 rounded text-xs">
                                    {generateValidationStyles('error')}
                                </code>
                            </p>
                        </div>
                    </div>

                    {/* Design Tokens */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-600">Design Tokens</h3>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-4 h-4 rounded"
                                    style={{ backgroundColor: colors.primary[500] }}
                                />
                                <span className="text-sm text-gray-700">
                                    Primary: {colors.primary[500]}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-4 h-4 rounded"
                                    style={{ backgroundColor: colors.danger[500] }}
                                />
                                <span className="text-sm text-gray-700">
                                    Danger: {colors.danger[500]}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-4 h-4 rounded"
                                    style={{ backgroundColor: colors.success[500] }}
                                />
                                <span className="text-sm text-gray-700">
                                    Success: {colors.success[500]}
                                </span>
                            </div>
                            <p className="text-sm text-gray-700">
                                <strong>Spacing:</strong> {spacing[4]}px (md)
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CSS Classes Demo */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">CSS Classes Demo</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-lg font-medium text-gray-600">Buttons</h3>
                        <button className="btn-base btn-primary btn-size-md">
                            CSS Class Button
                        </button>
                        <button className="btn-base btn-outline-secondary btn-size-sm">
                            Outline Button
                        </button>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-medium text-gray-600">Input Fields</h3>
                        <input
                            className="input-base input-default input-size-md"
                            placeholder="Default input"
                        />
                        <input
                            className="input-base input-error input-size-md"
                            placeholder="Error input"
                        />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-medium text-gray-600">Validation</h3>
                        <div className="validation-success field-success-text">
                            ✅ Validation success message
                        </div>
                        <div className="validation-error field-error-text">
                            ❌ Validation error message
                        </div>
                    </div>
                </div>
            </section>

            {/* Utility Functions Demo */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Utility Functions</h2>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-600 mb-3">
                        Class Name Utility (cx)
                    </h3>
                    <div className="space-y-2">
                        <div
                            className={cx('p-3 rounded border', 'bg-blue-50', {
                                'border-blue-300': true,
                                'text-blue-700': true,
                                'font-semibold': true
                            })}
                        >
                            This box uses the cx utility for conditional classes
                        </div>

                        <code className="block bg-white p-2 rounded text-sm text-gray-700">
                            {`cx('p-3 rounded border', 'bg-blue-50', { 'border-blue-300': true, 'text-blue-700': true })`}
                        </code>
                    </div>
                </div>
            </section>

            <footer className="text-center text-gray-500 text-sm pt-8 border-t">
                <p>
                    🎨 This showcase demonstrates the complete integration between{' '}
                    <strong>formular.components</strong> and the <strong>design system</strong>
                </p>
            </footer>
        </div>
    )
}

export default DesignSystemShowcase
