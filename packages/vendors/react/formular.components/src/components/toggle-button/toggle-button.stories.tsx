import type { Meta, StoryObj } from '@storybook/react'
import { MdDarkMode, MdLightMode, MdToggleOff } from 'react-icons/md'
import { ToggleButton } from './toggle-button'

const meta: Meta<typeof ToggleButton> = {
    title: 'Components/Form/ToggleButton',
    component: ToggleButton,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A customizable toggle button component that uses design system styling. Provides visual feedback for on/off states with smooth transitions and supports different variants and sizes.'
            }
        }
    },
    argTypes: {
        id: {
            control: 'text',
            description: 'Unique identifier for the toggle button'
        },
        name: {
            control: 'text',
            description: 'Name/label for the toggle button'
        },
        toggle: {
            control: 'boolean',
            description: 'Current toggle state'
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the toggle button is disabled'
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Size variant from the design system'
        },
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
            description: 'Color variant from the design system'
        },
        width: {
            control: 'text',
            description: 'Custom width (CSS value)'
        },
        height: {
            control: 'text',
            description: 'Custom height (CSS value)'
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes'
        },
        children: {
            control: 'text',
            description: 'Content to display inside the toggle button'
        },
        onToggle: {
            action: 'toggled',
            description: 'Callback fired when the button is toggled'
        }
    }
}

export default meta
type Story = StoryObj<typeof ToggleButton>

// Simple toggle handler for stories
const handleToggle = (id: string, newState: boolean) => {
    console.log(`Toggle ${id}:`, newState)
}

// Default story
export const Default: Story = {
    args: {
        id: 'default-toggle',
        name: 'Default Toggle',
        toggle: false,
        disabled: false,
        size: 'md',
        variant: 'primary',
        children: 'Toggle Me',
        onToggle: handleToggle
    }
}

// Size variants showcase
export const Sizes: Story = {
    render: () => (
        <div className="space-y-4">
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">XS Size</span>
                <ToggleButton
                    id="toggle-xs"
                    name="Extra Small Toggle"
                    toggle={false}
                    size="xs"
                    variant="primary"
                    onToggle={handleToggle}
                >
                    XS
                </ToggleButton>
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">SM Size</span>
                <ToggleButton
                    id="toggle-sm"
                    name="Small Toggle"
                    toggle={false}
                    size="sm"
                    variant="primary"
                    onToggle={handleToggle}
                >
                    Small
                </ToggleButton>
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">MD Size (Default)</span>
                <ToggleButton
                    id="toggle-md"
                    name="Medium Toggle"
                    toggle={false}
                    size="md"
                    variant="primary"
                    onToggle={handleToggle}
                >
                    Medium
                </ToggleButton>
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">LG Size</span>
                <ToggleButton
                    id="toggle-lg"
                    name="Large Toggle"
                    toggle={false}
                    size="lg"
                    variant="primary"
                    onToggle={handleToggle}
                >
                    Large
                </ToggleButton>
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">XL Size</span>
                <ToggleButton
                    id="toggle-xl"
                    name="Extra Large Toggle"
                    toggle={false}
                    size="xl"
                    variant="primary"
                    onToggle={handleToggle}
                >
                    Extra Large
                </ToggleButton>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Showcase of all available toggle button sizes from the design system.'
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
                <ToggleButton
                    id="toggle-primary"
                    name="Primary Toggle"
                    toggle={false}
                    size="md"
                    variant="primary"
                    onToggle={handleToggle}
                >
                    Primary
                </ToggleButton>
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Secondary</span>
                <ToggleButton
                    id="toggle-secondary"
                    name="Secondary Toggle"
                    toggle={false}
                    size="md"
                    variant="secondary"
                    onToggle={handleToggle}
                >
                    Secondary
                </ToggleButton>
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Success</span>
                <ToggleButton
                    id="toggle-success"
                    name="Success Toggle"
                    toggle={false}
                    size="md"
                    variant="success"
                    onToggle={handleToggle}
                >
                    Success
                </ToggleButton>
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Warning</span>
                <ToggleButton
                    id="toggle-warning"
                    name="Warning Toggle"
                    toggle={false}
                    size="md"
                    variant="warning"
                    onToggle={handleToggle}
                >
                    Warning
                </ToggleButton>
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Danger</span>
                <ToggleButton
                    id="toggle-danger"
                    name="Danger Toggle"
                    toggle={false}
                    size="md"
                    variant="danger"
                    onToggle={handleToggle}
                >
                    Danger
                </ToggleButton>
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Info</span>
                <ToggleButton
                    id="toggle-info"
                    name="Info Toggle"
                    toggle={false}
                    size="md"
                    variant="info"
                    onToggle={handleToggle}
                >
                    Info
                </ToggleButton>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Showcase of all available toggle button color variants from the design system.'
            }
        }
    }
}

// States showcase
export const States: Story = {
    render: () => (
        <div className="space-y-4">
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Off State</span>
                <ToggleButton
                    id="toggle-off"
                    name="Off State Toggle"
                    toggle={false}
                    size="md"
                    variant="primary"
                    onToggle={handleToggle}
                >
                    Off
                </ToggleButton>
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">On State</span>
                <ToggleButton
                    id="toggle-on"
                    name="On State Toggle"
                    toggle={true}
                    size="md"
                    variant="primary"
                    onToggle={handleToggle}
                >
                    On
                </ToggleButton>
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Disabled (Off)</span>
                <ToggleButton
                    id="toggle-disabled-off"
                    name="Disabled Off Toggle"
                    toggle={false}
                    disabled={true}
                    size="md"
                    variant="primary"
                    onToggle={handleToggle}
                >
                    Disabled
                </ToggleButton>
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Disabled (On)</span>
                <ToggleButton
                    id="toggle-disabled-on"
                    name="Disabled On Toggle"
                    toggle={true}
                    disabled={true}
                    size="md"
                    variant="primary"
                    onToggle={handleToggle}
                >
                    Disabled
                </ToggleButton>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstration of toggle button states (on/off/disabled) with proper styling.'
            }
        }
    }
}

// With icons showcase
export const WithIcons: Story = {
    render: () => (
        <div className="space-y-4">
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Toggle Icons</span>
                <ToggleButton
                    id="toggle-icons"
                    name="Toggle with Icons"
                    toggle={false}
                    size="md"
                    variant="primary"
                    onToggle={handleToggle}
                >
                    <MdToggleOff className="mr-2" />
                    Toggle
                </ToggleButton>
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Theme Toggle</span>
                <ToggleButton
                    id="theme-toggle"
                    name="Theme Toggle"
                    toggle={true}
                    size="md"
                    variant="secondary"
                    onToggle={handleToggle}
                >
                    <MdDarkMode className="mr-2" />
                    Dark Mode
                </ToggleButton>
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Light Mode</span>
                <ToggleButton
                    id="light-toggle"
                    name="Light Toggle"
                    toggle={false}
                    size="md"
                    variant="warning"
                    onToggle={handleToggle}
                >
                    <MdLightMode className="mr-2" />
                    Light Mode
                </ToggleButton>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Examples of toggle buttons with icons and meaningful content.'
            }
        }
    }
}

// Custom sizing showcase
export const CustomSizing: Story = {
    render: () => (
        <div className="space-y-4">
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Custom Width & Height</span>
                <ToggleButton
                    id="custom-size-1"
                    name="Custom Size Toggle"
                    toggle={false}
                    size="md"
                    variant="primary"
                    width="120px"
                    height="60px"
                    onToggle={handleToggle}
                >
                    Custom Size
                </ToggleButton>
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Square Toggle</span>
                <ToggleButton
                    id="square-toggle"
                    name="Square Toggle"
                    toggle={false}
                    size="md"
                    variant="info"
                    width="80px"
                    height="80px"
                    onToggle={handleToggle}
                >
                    □
                </ToggleButton>
            </div>
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-700">Wide Toggle</span>
                <ToggleButton
                    id="wide-toggle"
                    name="Wide Toggle"
                    toggle={true}
                    size="md"
                    variant="success"
                    width="200px"
                    height="40px"
                    onToggle={handleToggle}
                >
                    Wide Toggle Button
                </ToggleButton>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Examples of toggle buttons with custom width and height dimensions.'
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
                    Design System Toggle Buttons
                </h2>
                <p className="text-gray-600 mb-6">
                    Toggle button components using design system tokens for consistent styling and
                    behavior.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Active States</h3>
                    <div className="space-y-3">
                        {['primary', 'secondary', 'success'].map((variant) => (
                            <div key={variant} className="flex items-center space-x-3">
                                <ToggleButton
                                    id={`showcase-active-${variant}`}
                                    name={`Active ${variant} toggle`}
                                    toggle={true}
                                    size="md"
                                    variant={variant as any}
                                    onToggle={handleToggle}
                                >
                                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                                </ToggleButton>
                                <span className="text-sm text-gray-600 capitalize">
                                    {variant} (Active)
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Inactive States</h3>
                    <div className="space-y-3">
                        {['warning', 'danger', 'info'].map((variant) => (
                            <div key={variant} className="flex items-center space-x-3">
                                <ToggleButton
                                    id={`showcase-inactive-${variant}`}
                                    name={`Inactive ${variant} toggle`}
                                    toggle={false}
                                    size="md"
                                    variant={variant as any}
                                    onToggle={handleToggle}
                                >
                                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                                </ToggleButton>
                                <span className="text-sm text-gray-600 capitalize">
                                    {variant} (Inactive)
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Comprehensive showcase of the toggle button component with design system integration.'
            }
        }
    }
}

// Interactive playground
export const Playground: Story = {
    args: {
        id: 'playground-toggle',
        name: 'Playground Toggle',
        toggle: false,
        disabled: false,
        size: 'md',
        variant: 'primary',
        width: '34px',
        height: '34px',
        className: '',
        children: 'Toggle',
        onToggle: handleToggle
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to test different toggle button configurations.'
            }
        }
    }
}
