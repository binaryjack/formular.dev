import type { Meta, StoryObj } from '@storybook/react'
import { SwitchButton } from './switch-button'

const meta: Meta<typeof SwitchButton> = {
    title: 'Components/Form/SwitchButton',
    component: SwitchButton,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A switch button component with smooth toggle animations. Uses design system colors and sizes for consistent styling. Supports multiple variants, sizes, and orientations for different use cases.'
            }
        }
    },
    argTypes: {
        fieldName: {
            control: 'text',
            description: 'Unique identifier for the switch'
        },
        options: {
            control: 'object',
            description: 'Configuration options for the switch (orientation, size, variant)'
        },
        isToggle: {
            control: 'boolean',
            description: 'Current toggle state of the switch'
        },
        onToggle: {
            action: 'toggled',
            description: 'Callback fired when the switch is toggled'
        }
    }
}

export default meta
type Story = StoryObj<typeof SwitchButton>

// Simple click handler for stories
const handleToggle = (value: boolean) => {
    console.log('Switch toggled:', value)
}

// Default story
export const Default: Story = {
    args: {
        fieldName: 'default-switch',
        options: {
            orientation: 'horizontal',
            size: 'md',
            variant: 'primary'
        },
        isToggle: false,
        onToggle: handleToggle
    }
}

// Size variants showcase
export const Sizes: Story = {
    render: () => (
        <div className="space-y-4">
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">2XS Size</span>
                <SwitchButton
                    fieldName="switch-2xs"
                    options={{ orientation: 'horizontal', size: '2xs', variant: 'primary' }}
                    isToggle={true}
                    onToggle={handleToggle}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">XS Size</span>
                <SwitchButton
                    fieldName="switch-xs"
                    options={{ orientation: 'horizontal', size: 'xs', variant: 'primary' }}
                    isToggle={true}
                    onToggle={handleToggle}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">MD Size (Default)</span>
                <SwitchButton
                    fieldName="switch-md"
                    options={{ orientation: 'horizontal', size: 'md', variant: 'primary' }}
                    isToggle={true}
                    onToggle={handleToggle}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">LG Size</span>
                <SwitchButton
                    fieldName="switch-lg"
                    options={{ orientation: 'horizontal', size: 'lg', variant: 'primary' }}
                    isToggle={true}
                    onToggle={handleToggle}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">XL Size</span>
                <SwitchButton
                    fieldName="switch-xl"
                    options={{ orientation: 'horizontal', size: 'xl', variant: 'primary' }}
                    isToggle={true}
                    onToggle={handleToggle}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">2XL Size</span>
                <SwitchButton
                    fieldName="switch-2xl"
                    options={{ orientation: 'horizontal', size: '2xl', variant: 'primary' }}
                    isToggle={true}
                    onToggle={handleToggle}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Showcase of all available switch sizes from the design system.'
            }
        }
    }
}

// Variant colors showcase
export const Variants: Story = {
    render: () => (
        <div className="space-y-4">
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Primary</span>
                <SwitchButton
                    fieldName="switch-primary"
                    options={{ orientation: 'horizontal', size: 'md', variant: 'primary' }}
                    isToggle={true}
                    onToggle={handleToggle}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Secondary</span>
                <SwitchButton
                    fieldName="switch-secondary"
                    options={{ orientation: 'horizontal', size: 'md', variant: 'secondary' }}
                    isToggle={true}
                    onToggle={handleToggle}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Success</span>
                <SwitchButton
                    fieldName="switch-success"
                    options={{ orientation: 'horizontal', size: 'md', variant: 'success' }}
                    isToggle={true}
                    onToggle={handleToggle}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Warning</span>
                <SwitchButton
                    fieldName="switch-warning"
                    options={{ orientation: 'horizontal', size: 'md', variant: 'warning' }}
                    isToggle={true}
                    onToggle={handleToggle}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Danger</span>
                <SwitchButton
                    fieldName="switch-danger"
                    options={{ orientation: 'horizontal', size: 'md', variant: 'danger' }}
                    isToggle={true}
                    onToggle={handleToggle}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Info</span>
                <SwitchButton
                    fieldName="switch-info"
                    options={{ orientation: 'horizontal', size: 'md', variant: 'info' }}
                    isToggle={true}
                    onToggle={handleToggle}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Showcase of all available switch color variants from the design system.'
            }
        }
    }
}

// Orientation showcase
export const Orientations: Story = {
    render: () => (
        <div className="space-y-6">
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Horizontal (Default)</span>
                <SwitchButton
                    fieldName="switch-horizontal"
                    options={{ orientation: 'horizontal', size: 'lg', variant: 'primary' }}
                    isToggle={true}
                    onToggle={handleToggle}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Vertical</span>
                <SwitchButton
                    fieldName="switch-vertical"
                    options={{ orientation: 'vertical', size: 'lg', variant: 'primary' }}
                    isToggle={true}
                    onToggle={handleToggle}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstration of horizontal and vertical switch orientations.'
            }
        }
    }
}

// States showcase
export const States: Story = {
    render: () => (
        <div className="space-y-4">
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">On State</span>
                <SwitchButton
                    fieldName="switch-on"
                    options={{ orientation: 'horizontal', size: 'md', variant: 'primary' }}
                    isToggle={true}
                    onToggle={handleToggle}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Off State</span>
                <SwitchButton
                    fieldName="switch-off"
                    options={{ orientation: 'horizontal', size: 'md', variant: 'primary' }}
                    isToggle={false}
                    onToggle={handleToggle}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstration of switch on/off states with proper styling.'
            }
        }
    }
}

// Design system showcase
export const DesignSystemShowcase: Story = {
    render: () => (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Design System Switch Components
                </h2>
                <p className="text-gray-600 mb-6">
                    Switch components using design system tokens for consistent styling and
                    behavior.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Size Scale</h3>
                    <div className="space-y-3">
                        {['2xs', 'xs', 'md', 'lg', 'xl', '2xl'].map((size) => (
                            <div key={size} className="flex items-center space-x-3">
                                <SwitchButton
                                    fieldName={`showcase-${size}`}
                                    options={{
                                        orientation: 'horizontal',
                                        size: size as any,
                                        variant: 'primary'
                                    }}
                                    isToggle={true}
                                    onToggle={handleToggle}
                                />
                                <span className="text-sm text-gray-600">{size}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Color Variants</h3>
                    <div className="space-y-3">
                        {['primary', 'secondary', 'success', 'warning', 'danger', 'info'].map(
                            (variant) => (
                                <div key={variant} className="flex items-center space-x-3">
                                    <SwitchButton
                                        fieldName={`showcase-${variant}`}
                                        options={{
                                            orientation: 'horizontal',
                                            size: 'md',
                                            variant: variant as any
                                        }}
                                        isToggle={true}
                                        onToggle={handleToggle}
                                    />
                                    <span className="text-sm text-gray-600 capitalize">
                                        {variant}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Comprehensive showcase of the switch component with design system integration.'
            }
        }
    }
}

// Interactive playground
export const Playground: Story = {
    args: {
        fieldName: 'playground-switch',
        options: {
            orientation: 'horizontal',
            size: 'md',
            variant: 'primary'
        },
        isToggle: true,
        onToggle: handleToggle
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to test different switch configurations.'
            }
        }
    }
}
