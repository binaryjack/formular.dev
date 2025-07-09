import type { Meta, StoryObj } from '@storybook/react'
import { ToggleableStateType } from 'formular.dev.lib'
import { useEffect, useState } from 'react'
import { Button } from '../button/button'
import { toggleableContext } from '../toggleable/toggleable.context'
import { Typography } from '../typography/typography'
import { Drawer } from './drawer'

// Wrapper to provide toggleable context
const DrawerWrapper = ({
    position = 'bottom',
    width = '300px',
    height = '200px',
    content = 'Drawer content goes here'
}: {
    position?: 'top' | 'bottom' | 'center'
    width?: string
    height?: string
    content?: string
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    // Custom wrapper with controlled toggle state
    return (
        <div className="flex flex-col items-center justify-center p-4 min-h-[300px]">
            <Button
                id="toggle-drawer-btn"
                title="Toggle Drawer"
                onClickCallback={handleToggle}
                variantProperties={{
                    variant: 'primary',
                    size: 'md'
                }}
            >
                {isOpen ? 'Close Drawer' : 'Open Drawer'}
            </Button>

            <ToggleableWithState isOpen={isOpen}>
                <Drawer id="demo-drawer" position={position} width={width} height={height}>
                    <div className="p-4">
                        <Typography as="h3" size="lg" weight="semibold" className="mb-3">
                            Drawer Example
                        </Typography>
                        <Typography as="p" className="mb-4">
                            {content}
                        </Typography>
                        <Button
                            id="close-drawer-btn"
                            title="Close Drawer"
                            onClickCallback={handleToggle}
                            variantProperties={{
                                variant: 'secondary',
                                size: 'sm'
                            }}
                        >
                            Close
                        </Button>
                    </div>
                </Drawer>
            </ToggleableWithState>

            <div className="mt-8">
                <Typography as="p" size="sm" className="text-secondary-600">
                    Click the button above to toggle the drawer
                </Typography>
                <Typography as="p" size="sm" className="text-secondary-600">
                    Position: <strong>{position}</strong>
                </Typography>
            </div>
        </div>
    )
}

// Helper component to control Toggleable state
const ToggleableWithState = ({
    children,
    isOpen
}: {
    children: React.ReactNode
    isOpen: boolean
}) => {
    const [toggleState, setToggleState] = useState<ToggleableStateType>(isOpen ? 'open' : 'closed')

    // Update toggle state when isOpen changes
    useEffect(() => {
        setToggleState(isOpen ? 'open' : 'closed')
    }, [isOpen])

    return (
        <toggleableContext.Provider value={{ toggleState, setToggleState }}>
            {children}
        </toggleableContext.Provider>
    )
}

const meta: Meta<typeof DrawerWrapper> = {
    title: 'Components/Layout/Drawer',
    component: DrawerWrapper,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'The Drawer component provides a sliding panel that can appear from different screen positions. It supports top, bottom, and center positions, with customizable dimensions and content.'
            }
        }
    },
    argTypes: {
        position: {
            control: 'select',
            options: ['top', 'bottom', 'center'],
            description: 'The position from which the drawer appears'
        },
        width: {
            control: 'text',
            description: 'The width of the drawer'
        },
        height: {
            control: 'text',
            description: 'The height of the drawer'
        },
        content: {
            control: 'text',
            description: 'Content to display inside the drawer'
        }
    },
    decorators: [
        (Story: React.ComponentType) => (
            <div className="p-6 bg-white rounded-lg shadow-md">
                <Story />
            </div>
        )
    ]
}

export default meta
type Story = StoryObj<typeof DrawerWrapper>

// Bottom drawer (default)
export const BottomDrawer: Story = {
    args: {
        position: 'bottom',
        width: '300px',
        height: '200px',
        content: 'This drawer slides up from the bottom of the screen.'
    }
}

// Top drawer
export const TopDrawer: Story = {
    args: {
        position: 'top',
        width: '300px',
        height: '200px',
        content: 'This drawer slides down from the top of the screen.'
    }
}

// Center drawer
export const CenterDrawer: Story = {
    args: {
        position: 'center',
        width: '400px',
        height: '300px',
        content: 'This drawer appears in the center of the screen with a backdrop overlay.'
    }
}

// All positions in one view
export const AllPositions: Story = {
    render: () => (
        <div className="space-y-12">
            <div>
                <Typography as="h3" size="xl" weight="semibold" className="mb-4">
                    Bottom Drawer
                </Typography>
                <DrawerWrapper
                    position="bottom"
                    content="This drawer slides up from the bottom of the screen."
                />
            </div>

            <div>
                <Typography as="h3" size="xl" weight="semibold" className="mb-4">
                    Top Drawer
                </Typography>
                <DrawerWrapper
                    position="top"
                    content="This drawer slides down from the top of the screen."
                />
            </div>

            <div>
                <Typography as="h3" size="xl" weight="semibold" className="mb-4">
                    Center Drawer
                </Typography>
                <DrawerWrapper
                    position="center"
                    width="400px"
                    height="300px"
                    content="This drawer appears in the center of the screen with a backdrop overlay."
                />
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded'
    }
}
