import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

// Simple click handler for stories
const handleClick = (message: string) => () => {
    console.log(message)
}

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A customizable button component with various variants, sizes, and interactive states. Features ripple effects, loading states, and accessibility support.'
            }
        }
    },
    argTypes: {
        id: {
            control: 'text',
            description: 'Unique identifier for the button'
        },
        title: {
            control: 'text',
            description: 'Button title/label text'
        },
        children: {
            control: 'text',
            description: 'Button content (text or React nodes)'
        },
        onClickCallback: {
            action: 'clicked',
            description: 'Click event handler'
        },
        loading: {
            control: 'boolean',
            description: 'Show loading spinner'
        },
        disabled: {
            control: 'boolean',
            description: 'Disable the button'
        },
        isToggle: {
            control: 'boolean',
            description: 'Enable toggle functionality'
        },
        isPressed: {
            control: 'boolean',
            description: 'Toggle state when isToggle is true'
        },
        tabindex: {
            control: 'number',
            description: 'Tab index for keyboard navigation'
        },
        variantProperties: {
            control: 'object',
            description: 'Visual variant properties for the button'
        }
    },
    tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

// Basic Default Button
export const Default: Story = {
    args: {
        id: 'default-button',
        title: 'Default Button',
        children: 'Click me',
        onClickCallback: handleClick('button-clicked'),
        variantProperties: {
            variant: 'primary',
            size: 'md'
        }
    }
}

// All Button Sizes
export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-4 flex-wrap">
            <Button
                id="size-2xs"
                title="2XS Button"
                children="2XS"
                variantProperties={{ variant: 'primary', size: '2xs' }}
                onClickCallback={handleClick('2xs-clicked')}
            />
            <Button
                id="size-xs"
                title="XS Button"
                children="XS"
                variantProperties={{ variant: 'primary', size: 'xs' }}
                onClickCallback={handleClick('xs-clicked')}
            />
            <Button
                id="size-sm"
                title="SM Button"
                children="SM"
                variantProperties={{ variant: 'primary', size: 'sm' }}
                onClickCallback={handleClick('sm-clicked')}
            />
            <Button
                id="size-md"
                title="MD Button"
                children="MD"
                variantProperties={{ variant: 'primary', size: 'md' }}
                onClickCallback={handleClick('md-clicked')}
            />
            <Button
                id="size-lg"
                title="LG Button"
                children="LG"
                variantProperties={{ variant: 'primary', size: 'lg' }}
                onClickCallback={handleClick('lg-clicked')}
            />
            <Button
                id="size-xl"
                title="XL Button"
                children="XL"
                variantProperties={{ variant: 'primary', size: 'xl' }}
                onClickCallback={handleClick('xl-clicked')}
            />
            <Button
                id="size-2xl"
                title="2XL Button"
                children="2XL"
                variantProperties={{ variant: 'primary', size: '2xl' }}
                onClickCallback={handleClick('2xl-clicked')}
            />
        </div>
    )
}

// All Button Variants
export const Variants: Story = {
    render: () => (
        <div className="flex items-center gap-4 flex-wrap">
            <Button
                id="variant-primary"
                title="Primary Button"
                children="Primary"
                variantProperties={{ variant: 'primary', size: 'md' }}
                onClickCallback={handleClick('primary-clicked')}
            />
            <Button
                id="variant-secondary"
                title="Secondary Button"
                children="Secondary"
                variantProperties={{ variant: 'secondary', size: 'md' }}
                onClickCallback={handleClick('secondary-clicked')}
            />
            <Button
                id="variant-info"
                title="Info Button"
                children="Info"
                variantProperties={{ variant: 'info', size: 'md' }}
                onClickCallback={handleClick('info-clicked')}
            />
            <Button
                id="variant-success"
                title="Success Button"
                children="Success"
                variantProperties={{ variant: 'success', size: 'md' }}
                onClickCallback={handleClick('success-clicked')}
            />
            <Button
                id="variant-warning"
                title="Warning Button"
                children="Warning"
                variantProperties={{ variant: 'warning', size: 'md' }}
                onClickCallback={handleClick('warning-clicked')}
            />
            <Button
                id="variant-danger"
                title="Danger Button"
                children="Danger"
                variantProperties={{ variant: 'danger', size: 'md' }}
                onClickCallback={handleClick('danger-clicked')}
            />
        </div>
    )
}

// Button States
export const States: Story = {
    render: () => (
        <div className="flex items-center gap-4 flex-wrap">
            <Button
                id="state-normal"
                title="Normal Button"
                children="Normal"
                variantProperties={{ variant: 'primary', size: 'md' }}
                onClickCallback={handleClick('normal-clicked')}
            />
            <Button
                id="state-loading"
                title="Loading Button"
                children="Loading"
                variantProperties={{ variant: 'primary', size: 'md' }}
                loading={true}
                onClickCallback={handleClick('loading-clicked')}
            />
            <Button
                id="state-disabled"
                title="Disabled Button"
                children="Disabled"
                variantProperties={{ variant: 'primary', size: 'md' }}
                disabled={true}
                onClickCallback={handleClick('disabled-clicked')}
            />
            <Button
                id="state-toggle-off"
                title="Toggle Off"
                children="Toggle Off"
                variantProperties={{ variant: 'secondary', size: 'md' }}
                isToggle={true}
                isPressed={false}
                onClickCallback={handleClick('toggle-off-clicked')}
            />
            <Button
                id="state-toggle-on"
                title="Toggle On"
                children="Toggle On"
                variantProperties={{ variant: 'primary', size: 'md' }}
                isToggle={true}
                isPressed={true}
                onClickCallback={handleClick('toggle-on-clicked')}
            />
        </div>
    )
}

// Text Cases
export const TextCases: Story = {
    render: () => (
        <div className="flex items-center gap-4 flex-wrap">
            <Button
                id="case-normal"
                title="Normal Case"
                children="Normal Case"
                variantProperties={{
                    variant: 'primary',
                    size: 'md',
                    textCase: 'normal-case'
                }}
                onClickCallback={handleClick('normal-case-clicked')}
            />
            <Button
                id="case-uppercase"
                title="Uppercase"
                children="Uppercase"
                variantProperties={{
                    variant: 'primary',
                    size: 'md',
                    textCase: 'uppercase'
                }}
                onClickCallback={handleClick('uppercase-clicked')}
            />
            <Button
                id="case-lowercase"
                title="Lowercase"
                children="Lowercase"
                variantProperties={{
                    variant: 'primary',
                    size: 'md',
                    textCase: 'lowercase'
                }}
                onClickCallback={handleClick('lowercase-clicked')}
            />
            <Button
                id="case-capitalize"
                title="Capitalize"
                children="Capitalize"
                variantProperties={{
                    variant: 'primary',
                    size: 'md',
                    textCase: 'capitalize'
                }}
                onClickCallback={handleClick('capitalize-clicked')}
            />
        </div>
    )
}

// Interactive Showcase
export const InteractiveShowcase: Story = {
    render: () => (
        <div className="space-y-6 p-6">
            <h3 className="text-lg font-semibold">Interactive Button Demo</h3>

            <div className="space-y-4">
                <div>
                    <h4 className="text-md font-medium mb-2">Primary Actions</h4>
                    <div className="flex gap-2">
                        <Button
                            id="save-btn"
                            title="Save"
                            children="Save"
                            variantProperties={{ variant: 'primary', size: 'md' }}
                            onClickCallback={handleClick('Save button clicked')}
                        />
                        <Button
                            id="cancel-btn"
                            title="Cancel"
                            children="Cancel"
                            variantProperties={{ variant: 'secondary', size: 'md' }}
                            onClickCallback={handleClick('Cancel button clicked')}
                        />
                    </div>
                </div>

                <div>
                    <h4 className="text-md font-medium mb-2">Status Actions</h4>
                    <div className="flex gap-2">
                        <Button
                            id="info-btn"
                            title="Info"
                            children="ℹ️ Info"
                            variantProperties={{ variant: 'info', size: 'sm' }}
                            onClickCallback={handleClick('Info button clicked')}
                        />
                        <Button
                            id="success-btn"
                            title="Success"
                            children="✅ Success"
                            variantProperties={{ variant: 'success', size: 'sm' }}
                            onClickCallback={handleClick('Success button clicked')}
                        />
                        <Button
                            id="warning-btn"
                            title="Warning"
                            children="⚠️ Warning"
                            variantProperties={{ variant: 'warning', size: 'sm' }}
                            onClickCallback={handleClick('Warning button clicked')}
                        />
                        <Button
                            id="danger-btn"
                            title="Danger"
                            children="🚫 Delete"
                            variantProperties={{ variant: 'danger', size: 'sm' }}
                            onClickCallback={handleClick('Danger button clicked')}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
