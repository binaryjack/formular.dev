import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from './typography'

const meta: Meta<typeof Typography> = {
    title: 'Components/Typography',
    component: Typography,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A flexible typography component that can render different HTML elements with consistent styling. Supports ellipsis text overflow and multiple sizes.'
            }
        }
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'Size variant of the typography'
        },
        ellipsis: {
            control: 'boolean',
            description: 'Whether to truncate text with ellipsis'
        },
        as: {
            control: 'select',
            options: ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'label'],
            description: 'HTML element to render'
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes'
        },
        children: {
            control: 'text',
            description: 'Content to display'
        }
    },
    tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

// Default typography
export const Default: Story = {
    args: {
        children: 'This is default typography text'
    }
}

// Size variations
export const Small: Story = {
    args: {
        size: 'small',
        children: 'This is small typography text'
    }
}

export const Medium: Story = {
    args: {
        size: 'medium',
        children: 'This is medium typography text'
    }
}

export const Large: Story = {
    args: {
        size: 'large',
        children: 'This is large typography text'
    }
}

// HTML element variations
export const AsHeading1: Story = {
    args: {
        as: 'h1',
        size: 'large',
        children: 'This is a Heading 1'
    }
}

export const AsHeading2: Story = {
    args: {
        as: 'h2',
        size: 'large',
        children: 'This is a Heading 2'
    }
}

export const AsHeading3: Story = {
    args: {
        as: 'h3',
        size: 'medium',
        children: 'This is a Heading 3'
    }
}

export const AsParagraph: Story = {
    args: {
        as: 'p',
        size: 'medium',
        children:
            'This is a paragraph with some longer text content to demonstrate how the typography component works with paragraph elements.'
    }
}

export const AsLabel: Story = {
    args: {
        as: 'label',
        size: 'small',
        children: 'Form Label'
    }
}

// Ellipsis examples
export const WithEllipsis: Story = {
    args: {
        ellipsis: true,
        children:
            'This is a very long text that should be truncated with ellipsis when it exceeds the container width',
        className: 'max-w-xs'
    }
}

export const EllipsisComparison: Story = {
    render: () => (
        <div className="space-y-4 max-w-md">
            <div>
                <h4 className="mb-2 font-semibold">Without Ellipsis:</h4>
                <Typography ellipsis={false} className="border p-2">
                    This is a very long text that will wrap to multiple lines when it exceeds the
                    container width
                </Typography>
            </div>
            <div>
                <h4 className="mb-2 font-semibold">With Ellipsis:</h4>
                <Typography ellipsis={true} className="border p-2">
                    This is a very long text that will be truncated with ellipsis when it exceeds
                    the container width
                </Typography>
            </div>
        </div>
    )
}

// All sizes showcase
export const SizeShowcase: Story = {
    render: () => (
        <div className="space-y-4">
            <Typography size="small">
                Small size typography - perfect for captions, labels, and secondary text
            </Typography>
            <Typography size="medium">
                Medium size typography - ideal for body text and general content
            </Typography>
            <Typography size="large">
                Large size typography - great for headings and emphasized text
            </Typography>
        </div>
    )
}

// Different HTML elements showcase
export const ElementShowcase: Story = {
    render: () => (
        <div className="space-y-4">
            <Typography as="h1" size="large">
                Heading 1 Element
            </Typography>
            <Typography as="h2" size="large">
                Heading 2 Element
            </Typography>
            <Typography as="h3" size="medium">
                Heading 3 Element
            </Typography>
            <Typography as="p" size="medium">
                This is a paragraph element with medium size typography. It demonstrates how the
                component can render different HTML elements while maintaining consistent styling.
            </Typography>
            <Typography as="span" size="small">
                Inline span element
            </Typography>
            <Typography as="label" size="small">
                Label element
            </Typography>
            <Typography as="div" size="medium">
                Div element container
            </Typography>
        </div>
    )
}

// Custom styling example
export const CustomStyling: Story = {
    render: () => (
        <div className="space-y-4">
            <Typography size="large" className="text-blue-600 font-bold">
                Custom styled large text in blue
            </Typography>
            <Typography size="medium" className="text-green-500 italic">
                Custom styled medium text in green and italic
            </Typography>
            <Typography size="small" className="text-gray-400 uppercase tracking-wide">
                Custom styled small text with uppercase and letter spacing
            </Typography>
        </div>
    )
}

// Real-world usage examples
export const RealWorldExamples: Story = {
    render: () => (
        <div className="space-y-6 max-w-lg">
            <div className="border rounded-lg p-4">
                <Typography as="h3" size="large" className="mb-2 font-semibold">
                    Card Title
                </Typography>
                <Typography as="p" size="medium" className="mb-3 text-gray-600">
                    This is a card description that explains what this card is about and provides
                    some context.
                </Typography>
                <Typography as="span" size="small" className="text-gray-400">
                    Last updated: 2 hours ago
                </Typography>
            </div>

            <div className="space-y-2">
                <Typography as="label" size="small" className="block font-medium text-gray-700">
                    Email Address
                </Typography>
                <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                />
                <Typography size="small" className="text-gray-500">
                    We'll never share your email with anyone else.
                </Typography>
            </div>
        </div>
    )
}
