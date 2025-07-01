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
                    'A customizable loading spinner component with SVG animation. Used throughout the application for loading states.'
            }
        }
    },
    argTypes: {
        width: {
            control: { type: 'range', min: 16, max: 200, step: 4 },
            description: 'Width of the spinner in pixels'
        },
        height: {
            control: { type: 'range', min: 16, max: 200, step: 4 },
            description: 'Height of the spinner in pixels'
        },
        strokeWidth: {
            control: { type: 'range', min: 1, max: 10, step: 0.5 },
            description: 'Width of the spinner stroke'
        },
        strokeOppacity: {
            control: { type: 'range', min: 0, max: 1, step: 0.05 },
            description: 'Opacity of the background circle stroke'
        },
        strokeColor: {
            control: 'color',
            description: 'Color of the background circle'
        },
        activeColor: {
            control: 'color',
            description: 'Color of the active spinning segment'
        },
        frameWidth: {
            control: { type: 'range', min: 20, max: 100, step: 2 },
            description: 'SVG viewBox frame width'
        },
        frameHeight: {
            control: { type: 'range', min: 20, max: 100, step: 2 },
            description: 'SVG viewBox frame height'
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

// Small spinner
export const Small: Story = {
    args: {
        width: 24,
        height: 24,
        strokeWidth: 2
    }
}

// Medium spinner
export const Medium: Story = {
    args: {
        width: 40,
        height: 40,
        strokeWidth: 3
    }
}

// Large spinner
export const Large: Story = {
    args: {
        width: 64,
        height: 64,
        strokeWidth: 4
    }
}

// Extra large spinner
export const ExtraLarge: Story = {
    args: {
        width: 100,
        height: 100,
        strokeWidth: 5
    }
}

// Custom colors
export const CustomColors: Story = {
    args: {
        width: 48,
        height: 48,
        strokeWidth: 3,
        strokeColor: '#e2e8f0',
        activeColor: '#3b82f6'
    }
}

// High contrast
export const HighContrast: Story = {
    args: {
        width: 48,
        height: 48,
        strokeWidth: 4,
        strokeColor: '#000000',
        activeColor: '#ffffff',
        strokeOppacity: 0.1
    }
}

// Subtle spinner
export const Subtle: Story = {
    args: {
        width: 32,
        height: 32,
        strokeWidth: 2,
        strokeColor: '#f1f5f9',
        activeColor: '#64748b',
        strokeOppacity: 0.3
    }
}

// Success theme
export const Success: Story = {
    args: {
        width: 40,
        height: 40,
        strokeWidth: 3,
        strokeColor: '#dcfce7',
        activeColor: '#22c55e'
    }
}

// Warning theme
export const Warning: Story = {
    args: {
        width: 40,
        height: 40,
        strokeWidth: 3,
        strokeColor: '#fef3c7',
        activeColor: '#f59e0b'
    }
}

// Danger theme
export const Danger: Story = {
    args: {
        width: 40,
        height: 40,
        strokeWidth: 3,
        strokeColor: '#fee2e2',
        activeColor: '#ef4444'
    }
}

// Different sizes showcase
export const SizeShowcase: Story = {
    render: () => (
        <div className="flex items-center gap-6">
            <div className="text-center">
                <Spinner width={16} height={16} strokeWidth={2} />
                <p className="mt-2 text-sm">16px</p>
            </div>
            <div className="text-center">
                <Spinner width={24} height={24} strokeWidth={2} />
                <p className="mt-2 text-sm">24px</p>
            </div>
            <div className="text-center">
                <Spinner width={32} height={32} strokeWidth={3} />
                <p className="mt-2 text-sm">32px</p>
            </div>
            <div className="text-center">
                <Spinner width={48} height={48} strokeWidth={3} />
                <p className="mt-2 text-sm">48px</p>
            </div>
            <div className="text-center">
                <Spinner width={64} height={64} strokeWidth={4} />
                <p className="mt-2 text-sm">64px</p>
            </div>
        </div>
    )
}

// Color variations showcase
export const ColorShowcase: Story = {
    render: () => (
        <div className="flex items-center gap-6">
            <div className="text-center">
                <Spinner
                    width={40}
                    height={40}
                    strokeWidth={3}
                    strokeColor="#fee2e2"
                    activeColor="#ef4444"
                />
                <p className="mt-2 text-sm">Red</p>
            </div>
            <div className="text-center">
                <Spinner
                    width={40}
                    height={40}
                    strokeWidth={3}
                    strokeColor="#fef3c7"
                    activeColor="#f59e0b"
                />
                <p className="mt-2 text-sm">Orange</p>
            </div>
            <div className="text-center">
                <Spinner
                    width={40}
                    height={40}
                    strokeWidth={3}
                    strokeColor="#dcfce7"
                    activeColor="#22c55e"
                />
                <p className="mt-2 text-sm">Green</p>
            </div>
            <div className="text-center">
                <Spinner
                    width={40}
                    height={40}
                    strokeWidth={3}
                    strokeColor="#dbeafe"
                    activeColor="#3b82f6"
                />
                <p className="mt-2 text-sm">Blue</p>
            </div>
            <div className="text-center">
                <Spinner
                    width={40}
                    height={40}
                    strokeWidth={3}
                    strokeColor="#e9d5ff"
                    activeColor="#8b5cf6"
                />
                <p className="mt-2 text-sm">Purple</p>
            </div>
        </div>
    )
}
