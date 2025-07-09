import type { Meta, StoryObj } from '@storybook/react'
import { cx } from 'formular.design.system'
import { Typography } from '../typography/typography'
import { Accordion } from './accordion'

const meta: Meta<typeof Accordion> = {
    title: 'Components/Layout/Accordion',
    component: Accordion,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'An accordion component that allows content to be expanded and collapsed. Uses the FORMULAR design system for consistent styling and interaction patterns.'
            }
        }
    },
    argTypes: {
        id: {
            control: 'text',
            description: 'Unique identifier for the accordion'
        },
        title: {
            control: 'text',
            description: 'Title displayed in the accordion header'
        },
        initialState: {
            control: { type: 'radio' },
            options: ['open', 'closed'],
            description: 'Initial expanded/collapsed state'
        },
        children: {
            control: 'text',
            description: 'Content displayed when the accordion is expanded'
        }
    }
}

export default meta
type Story = StoryObj<typeof Accordion>

// Default accordion (closed by default)
export const Default: Story = {
    args: {
        id: 'default-accordion',
        title: 'Default Accordion',
        initialState: 'closed',
        children: (
            <div className={cx('p-4 bg-secondary-50')}>
                <Typography as="p" size="base">
                    This is the content of the accordion. It's visible when the accordion is
                    expanded.
                </Typography>
            </div>
        )
    }
}

// Initially expanded accordion
export const InitiallyExpanded: Story = {
    args: {
        id: 'expanded-accordion',
        title: 'Initially Expanded Accordion',
        initialState: 'open',
        children: (
            <div className={cx('p-4 bg-secondary-50')}>
                <Typography as="p" size="base">
                    This accordion starts in the expanded state.
                </Typography>
            </div>
        )
    }
}

// Multiple accordions example
export const AccordionGroup: Story = {
    render: () => (
        <div className={cx('space-y-2 w-full max-w-lg')}>
            <Accordion id="section-1" title="Section 1" initialState="open">
                <div className={cx('p-4 bg-secondary-50')}>
                    <Typography as="p" size="base" className={cx('mb-2')}>
                        This is the content for Section 1.
                    </Typography>
                    <Typography as="p" size="sm" className={cx('text-secondary-600')}>
                        You can include any content here, including other components, forms, or
                        multimedia content.
                    </Typography>
                </div>
            </Accordion>

            <Accordion id="section-2" title="Section 2">
                <div className={cx('p-4 bg-secondary-50')}>
                    <Typography as="p" size="base">
                        This is the content for Section 2. It starts collapsed.
                    </Typography>
                </div>
            </Accordion>

            <Accordion id="section-3" title="Section 3">
                <div className={cx('p-4 bg-secondary-50')}>
                    <Typography as="p" size="base" className={cx('mb-2')}>
                        This is the content for Section 3.
                    </Typography>
                    <div className={cx('mt-3')}>
                        <button
                            className={cx(
                                'px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600'
                            )}
                        >
                            Example Button
                        </button>
                    </div>
                </div>
            </Accordion>
        </div>
    )
}

// Rich content example
export const RichContent: Story = {
    render: () => (
        <div className={cx('w-full max-w-lg')}>
            <Accordion id="rich-content" title="Accordion with Rich Content" initialState="open">
                <div className={cx('p-4 bg-secondary-50')}>
                    <Typography as="h3" size="lg" weight="semibold" className={cx('mb-3')}>
                        Section Details
                    </Typography>

                    <Typography as="p" size="base" className={cx('mb-4')}>
                        This example demonstrates how an accordion can contain rich, structured
                        content including:
                    </Typography>

                    <ul className={cx('list-disc pl-5 mb-4 space-y-2')}>
                        <li>Lists and formatted text</li>
                        <li>Interactive elements like buttons</li>
                        <li>Images and other media</li>
                        <li>Nested components</li>
                    </ul>

                    <div className={cx('bg-white p-3 rounded border border-secondary-200 mb-4')}>
                        <code className={cx('text-sm font-mono block whitespace-pre')}>
                            {`// Example code block
const handleClick = () => {
  console.log('Button clicked');
};`}
                        </code>
                    </div>

                    <div className={cx('flex justify-end')}>
                        <button
                            className={cx(
                                'px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600'
                            )}
                        >
                            Action Button
                        </button>
                    </div>
                </div>
            </Accordion>
        </div>
    )
}

// Form in accordion
export const FormExample: Story = {
    render: () => (
        <div className={cx('w-full max-w-lg')}>
            <Accordion id="form-example" title="Registration Form" initialState="open">
                <div className={cx('p-4 bg-secondary-50')}>
                    <form className={cx('space-y-4')}>
                        <div>
                            <label
                                htmlFor="fullName"
                                className={cx('block text-sm font-medium text-secondary-700 mb-1')}
                            >
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                className={cx(
                                    'w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500'
                                )}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className={cx('block text-sm font-medium text-secondary-700 mb-1')}
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                className={cx(
                                    'w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500'
                                )}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className={cx('block text-sm font-medium text-secondary-700 mb-1')}
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className={cx(
                                    'w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500'
                                )}
                            />
                        </div>

                        <div className={cx('flex items-center')}>
                            <input
                                id="terms"
                                type="checkbox"
                                className={cx(
                                    'h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded'
                                )}
                            />
                            <label
                                htmlFor="terms"
                                className={cx('ml-2 block text-sm text-secondary-700')}
                            >
                                I agree to the Terms and Conditions
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className={cx(
                                    'w-full px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600'
                                )}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </Accordion>
        </div>
    )
}
