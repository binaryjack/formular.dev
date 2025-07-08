import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from './typography'

const meta: Meta<typeof Typography> = {
    title: 'Components/Typography',
    component: Typography,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A flexible typography component that uses design system text sizes and font weights for consistent styling across the application. Supports all HTML text elements and custom styling.'
            }
        }
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'],
            description: 'Text size variant from the design system'
        },
        weight: {
            control: 'select',
            options: ['light', 'normal', 'medium', 'semibold', 'bold'],
            description: 'Font weight variant from the design system'
        },
        as: {
            control: 'select',
            options: [
                'span',
                'p',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'div',
                'label',
                'small',
                'strong',
                'em'
            ],
            description: 'HTML element to render'
        },
        ellipsis: {
            control: 'boolean',
            description: 'Truncate text with ellipsis if it overflows'
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes'
        },
        children: {
            control: 'text',
            description: 'Text content to display'
        }
    }
}

export default meta
type Story = StoryObj<typeof Typography>

// Default story
export const Default: Story = {
    args: {
        children: 'This is the default typography text',
        size: 'base',
        weight: 'normal'
    }
}

// Size variants showcase
export const Sizes: Story = {
    render: () => (
        <div className="space-y-4">
            <Typography size="xs">Extra Small Text (xs)</Typography>
            <Typography size="sm">Small Text (sm)</Typography>
            <Typography size="base">Base Text (base)</Typography>
            <Typography size="lg">Large Text (lg)</Typography>
            <Typography size="xl">Extra Large Text (xl)</Typography>
            <Typography size="2xl">2XL Text (2xl)</Typography>
            <Typography size="3xl">3XL Text (3xl)</Typography>
            <Typography size="4xl">4XL Text (4xl)</Typography>
            <Typography size="5xl">5XL Text (5xl)</Typography>
            <Typography size="6xl">6XL Text (6xl)</Typography>
            <Typography size="7xl">7XL Text (7xl)</Typography>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Showcase of all available text sizes from the design system.'
            }
        }
    }
}

// Weight variants showcase
export const Weights: Story = {
    render: () => (
        <div className="space-y-4">
            <Typography weight="light" size="lg">
                Light weight text
            </Typography>
            <Typography weight="normal" size="lg">
                Normal weight text
            </Typography>
            <Typography weight="medium" size="lg">
                Medium weight text
            </Typography>
            <Typography weight="semibold" size="lg">
                Semibold weight text
            </Typography>
            <Typography weight="bold" size="lg">
                Bold weight text
            </Typography>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Showcase of all available font weights from the design system.'
            }
        }
    }
}

// HTML element variants
export const Elements: Story = {
    render: () => (
        <div className="space-y-4">
            <Typography as="h1" size="4xl" weight="bold">
                Heading 1
            </Typography>
            <Typography as="h2" size="3xl" weight="semibold">
                Heading 2
            </Typography>
            <Typography as="h3" size="2xl" weight="semibold">
                Heading 3
            </Typography>
            <Typography as="h4" size="xl" weight="medium">
                Heading 4
            </Typography>
            <Typography as="h5" size="lg" weight="medium">
                Heading 5
            </Typography>
            <Typography as="h6" size="base" weight="medium">
                Heading 6
            </Typography>
            <Typography as="p" size="base">
                This is a paragraph with regular text content.
            </Typography>
            <Typography as="small" size="sm" weight="light">
                Small disclaimer text
            </Typography>
            <Typography as="strong" size="base" weight="bold">
                Strong emphasized text
            </Typography>
            <Typography as="em" size="base">
                Emphasized italic text
            </Typography>
            <Typography as="label" size="sm" weight="medium">
                Form label text
            </Typography>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Typography component rendered as different HTML elements with appropriate styling.'
            }
        }
    }
}

// Ellipsis truncation
export const Ellipsis: Story = {
    render: () => (
        <div className="space-y-4 max-w-md">
            <div>
                <Typography as="h4" size="lg" weight="semibold" className="mb-2">
                    Without Ellipsis:
                </Typography>
                <Typography size="base">
                    This is a very long text that will wrap to multiple lines when it exceeds the
                    container width and doesn't get truncated.
                </Typography>
            </div>
            <div>
                <Typography as="h4" size="lg" weight="semibold" className="mb-2">
                    With Ellipsis:
                </Typography>
                <Typography size="base" ellipsis>
                    This is a very long text that will be truncated with an ellipsis when it exceeds
                    the container width.
                </Typography>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstration of text truncation with ellipsis overflow handling.'
            }
        }
    }
}

// Custom styling
export const CustomStyling: Story = {
    render: () => (
        <div className="space-y-4">
            <Typography size="2xl" weight="bold" className="text-blue-600 underline">
                Custom styled text with additional classes
            </Typography>
            <Typography
                size="lg"
                weight="medium"
                className="bg-yellow-100 px-3 py-1 rounded border-l-4 border-yellow-500"
            >
                Text with background and border styling
            </Typography>
            <Typography size="base" className="text-gray-600 italic">
                Subtle muted text with italic styling
            </Typography>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Examples of typography with custom CSS classes for additional styling.'
            }
        }
    }
}

// Design system showcase
export const DesignSystemShowcase: Story = {
    render: () => (
        <div className="space-y-6">
            <div>
                <Typography as="h2" size="3xl" weight="bold" className="mb-4 text-gray-800">
                    Design System Typography
                </Typography>
                <Typography size="lg" className="text-gray-600 mb-6">
                    This component uses design system utilities for consistent text sizing and font
                    weights.
                </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <Typography as="h3" size="xl" weight="semibold" className="text-gray-800">
                        Size Scale
                    </Typography>
                    <div className="space-y-2">
                        <Typography size="xs" className="text-gray-600">
                            text-xs • 12px
                        </Typography>
                        <Typography size="sm" className="text-gray-600">
                            text-sm • 14px
                        </Typography>
                        <Typography size="base" className="text-gray-600">
                            text-base • 16px
                        </Typography>
                        <Typography size="lg" className="text-gray-600">
                            text-lg • 18px
                        </Typography>
                        <Typography size="xl" className="text-gray-600">
                            text-xl • 20px
                        </Typography>
                    </div>
                </div>

                <div className="space-y-3">
                    <Typography as="h3" size="xl" weight="semibold" className="text-gray-800">
                        Weight Scale
                    </Typography>
                    <div className="space-y-2">
                        <Typography weight="light" className="text-gray-600">
                            font-light • 300
                        </Typography>
                        <Typography weight="normal" className="text-gray-600">
                            font-normal • 400
                        </Typography>
                        <Typography weight="medium" className="text-gray-600">
                            font-medium • 500
                        </Typography>
                        <Typography weight="semibold" className="text-gray-600">
                            font-semibold • 600
                        </Typography>
                        <Typography weight="bold" className="text-gray-600">
                            font-bold • 700
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Comprehensive showcase of the typography component with design system integration.'
            }
        }
    }
}

// Interactive playground
export const Playground: Story = {
    args: {
        children: 'Edit this text in the controls panel',
        size: 'lg',
        weight: 'medium',
        as: 'p',
        ellipsis: false,
        className: ''
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to test different typography configurations.'
            }
        }
    }
}
