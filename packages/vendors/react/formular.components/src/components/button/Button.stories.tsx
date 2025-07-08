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
                    'A customizable button component that uses the design system for consistent styling. Features ripple effects, loading states, accessibility support, and multiple variants.'
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
            size: 'sm'
        }
    }
}

// Design System Variants
export const Primary: Story = {
    args: {
        id: 'primary-button',
        title: 'Primary Button',
        children: 'Primary',
        onClickCallback: handleClick('primary-clicked'),
        variantProperties: {
            variant: 'primary',
            size: 'sm'
        }
    }
}

export const Secondary: Story = {
    args: {
        id: 'secondary-button',
        title: 'Secondary Button',
        children: 'Secondary',
        onClickCallback: handleClick('secondary-clicked'),
        variantProperties: {
            variant: 'secondary',
            size: 'sm'
        }
    }
}

export const Success: Story = {
    args: {
        id: 'success-button',
        title: 'Success Button',
        children: 'Success',
        onClickCallback: handleClick('success-clicked'),
        variantProperties: {
            variant: 'success',
            size: 'sm'
        }
    }
}

export const Warning: Story = {
    args: {
        id: 'warning-button',
        title: 'Warning Button',
        children: 'Warning',
        onClickCallback: handleClick('warning-clicked'),
        variantProperties: {
            variant: 'warning',
            size: 'sm'
        }
    }
}

export const Danger: Story = {
    args: {
        id: 'danger-button',
        title: 'Danger Button',
        children: 'Danger',
        onClickCallback: handleClick('danger-clicked'),
        variantProperties: {
            variant: 'danger',
            size: 'sm'
        }
    }
}

export const Info: Story = {
    args: {
        id: 'info-button',
        title: 'Info Button',
        children: 'Info',
        onClickCallback: handleClick('info-clicked'),
        variantProperties: {
            variant: 'info',
            size: 'sm'
        }
    }
}

// Design System Sizes
export const ExtraSmall: Story = {
    args: {
        id: 'xs-button',
        title: 'Extra Small Button',
        children: 'XS',
        onClickCallback: handleClick('xs-clicked'),
        variantProperties: {
            variant: 'primary',
            size: 'xs'
        }
    }
}

export const Small: Story = {
    args: {
        id: 'sm-button',
        title: 'Small Button',
        children: 'Small',
        onClickCallback: handleClick('sm-clicked'),
        variantProperties: {
            variant: 'primary',
            size: 'sm'
        }
    }
}

export const Medium: Story = {
    args: {
        id: 'md-button',
        title: 'Medium Button',
        children: 'Medium',
        onClickCallback: handleClick('md-clicked'),
        variantProperties: {
            variant: 'primary',
            size: 'md'
        }
    }
}

export const Large: Story = {
    args: {
        id: 'lg-button',
        title: 'Large Button',
        children: 'Large',
        onClickCallback: handleClick('lg-clicked'),
        variantProperties: {
            variant: 'primary',
            size: 'lg'
        }
    }
}

export const ExtraLarge: Story = {
    args: {
        id: 'xl-button',
        title: 'Extra Large Button',
        children: 'XL',
        onClickCallback: handleClick('xl-clicked'),
        variantProperties: {
            variant: 'primary',
            size: 'xl'
        }
    }
}

// States
export const Loading: Story = {
    args: {
        id: 'loading-button',
        title: 'Loading Button',
        children: 'Loading...',
        loading: true,
        onClickCallback: handleClick('loading-clicked'),
        variantProperties: {
            variant: 'primary',
            size: 'sm'
        }
    }
}

export const Disabled: Story = {
    args: {
        id: 'disabled-button',
        title: 'Disabled Button',
        children: 'Disabled',
        disabled: true,
        onClickCallback: handleClick('disabled-clicked'),
        variantProperties: {
            variant: 'primary',
            size: 'sm'
        }
    }
}

export const Toggle: Story = {
    args: {
        id: 'toggle-button',
        title: 'Toggle Button',
        children: 'Toggle Me',
        isToggle: true,
        isPressed: false,
        onClickCallback: handleClick('toggle-clicked'),
        variantProperties: {
            variant: 'primary',
            size: 'sm'
        }
    }
}

export const TogglePressed: Story = {
    args: {
        id: 'toggle-pressed-button',
        title: 'Toggle Pressed Button',
        children: 'Pressed',
        isToggle: true,
        isPressed: true,
        onClickCallback: handleClick('toggle-pressed-clicked'),
        variantProperties: {
            variant: 'primary',
            size: 'sm'
        }
    }
}

// Showcase Examples
export const VariantShowcase: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Button
                id="showcase-primary"
                title="Primary"
                children="Primary"
                variantProperties={{ variant: 'primary', size: 'sm' }}
                onClickCallback={handleClick('primary-showcase')}
            />
            <Button
                id="showcase-secondary"
                title="Secondary"
                children="Secondary"
                variantProperties={{ variant: 'secondary', size: 'sm' }}
                onClickCallback={handleClick('secondary-showcase')}
            />
            <Button
                id="showcase-success"
                title="Success"
                children="Success"
                variantProperties={{ variant: 'success', size: 'sm' }}
                onClickCallback={handleClick('success-showcase')}
            />
            <Button
                id="showcase-warning"
                title="Warning"
                children="Warning"
                variantProperties={{ variant: 'warning', size: 'sm' }}
                onClickCallback={handleClick('warning-showcase')}
            />
            <Button
                id="showcase-danger"
                title="Danger"
                children="Danger"
                variantProperties={{ variant: 'danger', size: 'sm' }}
                onClickCallback={handleClick('danger-showcase')}
            />
            <Button
                id="showcase-info"
                title="Info"
                children="Info"
                variantProperties={{ variant: 'info', size: 'sm' }}
                onClickCallback={handleClick('info-showcase')}
            />
        </div>
    )
}

export const SizeShowcase: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Button
                id="size-xs"
                title="XS"
                children="XS"
                variantProperties={{ variant: 'primary', size: 'xs' }}
                onClickCallback={handleClick('xs-size')}
            />
            <Button
                id="size-sm"
                title="SM"
                children="SM"
                variantProperties={{ variant: 'primary', size: 'sm' }}
                onClickCallback={handleClick('sm-size')}
            />
            <Button
                id="size-md"
                title="MD"
                children="MD"
                variantProperties={{ variant: 'primary', size: 'md' }}
                onClickCallback={handleClick('md-size')}
            />
            <Button
                id="size-lg"
                title="LG"
                children="LG"
                variantProperties={{ variant: 'primary', size: 'lg' }}
                onClickCallback={handleClick('lg-size')}
            />
            <Button
                id="size-xl"
                title="XL"
                children="XL"
                variantProperties={{ variant: 'primary', size: 'xl' }}
                onClickCallback={handleClick('xl-size')}
            />
        </div>
    )
}

export const StateShowcase: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Button
                id="state-normal"
                title="Normal"
                children="Normal"
                variantProperties={{ variant: 'primary', size: 'sm' }}
                onClickCallback={handleClick('normal-state')}
            />
            <Button
                id="state-loading"
                title="Loading"
                children="Loading"
                loading={true}
                variantProperties={{ variant: 'primary', size: 'sm' }}
                onClickCallback={handleClick('loading-state')}
            />
            <Button
                id="state-disabled"
                title="Disabled"
                children="Disabled"
                disabled={true}
                variantProperties={{ variant: 'primary', size: 'sm' }}
                onClickCallback={handleClick('disabled-state')}
            />
            <Button
                id="state-toggle-off"
                title="Toggle Off"
                children="Toggle Off"
                isToggle={true}
                isPressed={false}
                variantProperties={{ variant: 'primary', size: 'sm' }}
                onClickCallback={handleClick('toggle-off')}
            />
            <Button
                id="state-toggle-on"
                title="Toggle On"
                children="Toggle On"
                isToggle={true}
                isPressed={true}
                variantProperties={{ variant: 'primary', size: 'sm' }}
                onClickCallback={handleClick('toggle-on')}
            />
        </div>
    )
}
