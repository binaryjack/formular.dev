import type { Meta, StoryObj } from '@storybook/react'
import Spinner from './spinner'

const meta: Meta<typeof Spinner> = {
    title: 'Components/Spinner',
    component: Spinner,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A customizable loading spinner component with SVG animation. Uses design system colors and sizes for consistency across the application.'
            }
        }
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Size variant from the design system'
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
            description: 'Color variant from the design system'
        },
        width: {
            control: { type: 'range', min: 16, max: 200, step: 4 },
            description: 'Custom width in pixels (overrides size)'
        },
        height: {
            control: { type: 'range', min: 16, max: 200, step: 4 },
            description: 'Custom height in pixels (overrides size)'
        },
        strokeWidth: {
            control: { type: 'range', min: 1, max: 10, step: 0.5 },
            description: 'Custom stroke width (overrides size)'
        },
        strokeOpacity: {
            control: { type: 'range', min: 0, max: 1, step: 0.05 },
            description: 'Opacity of the background circle stroke'
        },
        strokeColor: {
            control: 'color',
            description: 'Custom color for the background circle'
        },
        activeColor: {
            control: 'color',
            description: 'Custom color for the active spinning segment'
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes'
        }
    },
    tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

// Default spinner
export const Default: Story = {
    args: {}
}

// Size variations
export const ExtraSmall: Story = {
    args: {
        size: 'xs'
    }
}

export const Small: Story = {
    args: {
        size: 'sm'
    }
}

export const Medium: Story = {
    args: {
        size: 'md'
    }
}

export const Large: Story = {
    args: {
        size: 'lg'
    }
}

export const ExtraLarge: Story = {
    args: {
        size: 'xl'
    }
}

// Color variations
export const Primary: Story = {
    args: {
        color: 'primary',
        size: 'lg'
    }
}

export const Secondary: Story = {
    args: {
        color: 'secondary',
        size: 'lg'
    }
}

export const Success: Story = {
    args: {
        color: 'success',
        size: 'lg'
    }
}

export const Warning: Story = {
    args: {
        color: 'warning',
        size: 'lg'
    }
}

export const Danger: Story = {
    args: {
        color: 'danger',
        size: 'lg'
    }
}

export const Info: Story = {
    args: {
        color: 'info',
        size: 'lg'
    }
}

// Size showcase
export const SizeShowcase: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <div className="text-center">
                <Spinner size="xs" />
                <p className="mt-2 text-xs">XS</p>
            </div>
            <div className="text-center">
                <Spinner size="sm" />
                <p className="mt-2 text-xs">SM</p>
            </div>
            <div className="text-center">
                <Spinner size="md" />
                <p className="mt-2 text-xs">MD</p>
            </div>
            <div className="text-center">
                <Spinner size="lg" />
                <p className="mt-2 text-xs">LG</p>
            </div>
            <div className="text-center">
                <Spinner size="xl" />
                <p className="mt-2 text-xs">XL</p>
            </div>
        </div>
    )
}

// Color showcase
export const ColorShowcase: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <div className="text-center">
                <Spinner color="primary" size="lg" />
                <p className="mt-2 text-xs">Primary</p>
            </div>
            <div className="text-center">
                <Spinner color="secondary" size="lg" />
                <p className="mt-2 text-xs">Secondary</p>
            </div>
            <div className="text-center">
                <Spinner color="success" size="lg" />
                <p className="mt-2 text-xs">Success</p>
            </div>
            <div className="text-center">
                <Spinner color="warning" size="lg" />
                <p className="mt-2 text-xs">Warning</p>
            </div>
            <div className="text-center">
                <Spinner color="danger" size="lg" />
                <p className="mt-2 text-xs">Danger</p>
            </div>
            <div className="text-center">
                <Spinner color="info" size="lg" />
                <p className="mt-2 text-xs">Info</p>
            </div>
        </div>
    )
}

// Custom styling
export const CustomStyling: Story = {
    args: {
        width: 48,
        height: 48,
        strokeWidth: 4,
        strokeOpacity: 0.1,
        strokeColor: '#e5e7eb',
        activeColor: '#3b82f6',
        className: 'drop-shadow-lg'
    }
}

// In context examples
export const InButton: Story = {
    render: () => (
        <button
            className="btn-base btn-primary btn-size-md inline-flex items-center gap-2"
            disabled
        >
            <Spinner size="sm" color="secondary" />
            Loading...
        </button>
    )
}

export const InCard: Story = {
    render: () => (
        <div className="card-base p-6 w-64 text-center">
            <Spinner size="lg" color="primary" className="mx-auto mb-4" />
            <p className="text-gray-600">Loading content...</p>
        </div>
    )
}
