import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../components/button/button'
import Spinner from '../components/spinner/spinner'
import { SwitchButton } from '../components/switch-button/switch-button'
import { ToggleButton } from '../components/toggle-button/toggle-button'
import { Typography } from '../components/typography/typography'

const meta: Meta = {
    title: 'Design System/Overview',
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Overview of all components using the FORMULAR design system. This showcase demonstrates consistent styling, colors, sizes, and typography across all components.'
            }
        }
    },
    tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

const handleClick = (message: string) => () => {
    console.log(message)
}

const handleToggle = (value: boolean) => {
    console.log('Switch toggled:', value)
}

const handleToggleButton = (id: string, newState: boolean) => {
    console.log(`Toggle ${id}:`, newState)
}

export const AllComponents: Story = {
    render: () => (
        <div className="space-y-12">
            {/* Typography Section */}
            <section>
                <Typography as="h1" size="4xl" weight="bold" className="mb-6">
                    Typography Scale
                </Typography>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Typography as="h2" size="3xl" weight="semibold">
                                Headings
                            </Typography>
                            <div className="space-y-2 mt-4">
                                <Typography as="h1" size="4xl" weight="bold">
                                    H1 - 4xl Bold
                                </Typography>
                                <Typography as="h2" size="3xl" weight="semibold">
                                    H2 - 3xl Semibold
                                </Typography>
                                <Typography as="h3" size="2xl" weight="medium">
                                    H3 - 2xl Medium
                                </Typography>
                                <Typography as="h4" size="xl" weight="medium">
                                    H4 - xl Medium
                                </Typography>
                                <Typography as="h5" size="lg" weight="medium">
                                    H5 - lg Medium
                                </Typography>
                                <Typography as="h6" size="base" weight="medium">
                                    H6 - base Medium
                                </Typography>
                            </div>
                        </div>
                        <div>
                            <Typography as="h2" size="3xl" weight="semibold">
                                Body Text
                            </Typography>
                            <div className="space-y-2 mt-4">
                                <Typography size="lg">Large text - text-lg</Typography>
                                <Typography size="base">Base text - text-base (default)</Typography>
                                <Typography size="sm">Small text - text-sm</Typography>
                                <Typography size="xs">Extra small text - text-xs</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Button Variants Section */}
            <section>
                <Typography as="h2" size="3xl" weight="semibold" className="mb-6">
                    Button Components
                </Typography>
                <div className="space-y-6">
                    <div>
                        <Typography as="h3" size="xl" weight="medium" className="mb-4">
                            Color Variants
                        </Typography>
                        <div className="flex flex-wrap gap-4">
                            <Button
                                id="primary-btn"
                                title="Primary"
                                children="Primary"
                                variantProperties={{ variant: 'primary', size: 'sm' }}
                                onClickCallback={handleClick('primary')}
                            />
                            <Button
                                id="secondary-btn"
                                title="Secondary"
                                children="Secondary"
                                variantProperties={{ variant: 'secondary', size: 'sm' }}
                                onClickCallback={handleClick('secondary')}
                            />
                            <Button
                                id="success-btn"
                                title="Success"
                                children="Success"
                                variantProperties={{ variant: 'success', size: 'sm' }}
                                onClickCallback={handleClick('success')}
                            />
                            <Button
                                id="warning-btn"
                                title="Warning"
                                children="Warning"
                                variantProperties={{ variant: 'warning', size: 'sm' }}
                                onClickCallback={handleClick('warning')}
                            />
                            <Button
                                id="danger-btn"
                                title="Danger"
                                children="Danger"
                                variantProperties={{ variant: 'danger', size: 'sm' }}
                                onClickCallback={handleClick('danger')}
                            />
                            <Button
                                id="info-btn"
                                title="Info"
                                children="Info"
                                variantProperties={{ variant: 'info', size: 'sm' }}
                                onClickCallback={handleClick('info')}
                            />
                        </div>
                    </div>

                    <div>
                        <Typography as="h3" size="xl" weight="medium" className="mb-4">
                            Size Variants
                        </Typography>
                        <div className="flex flex-wrap gap-4">
                            <Button
                                id="xs-btn"
                                title="XS"
                                children="XS"
                                variantProperties={{ variant: 'primary', size: 'xs' }}
                                onClickCallback={handleClick('xs')}
                            />
                            <Button
                                id="sm-btn"
                                title="SM"
                                children="SM"
                                variantProperties={{ variant: 'primary', size: 'sm' }}
                                onClickCallback={handleClick('sm')}
                            />
                            <Button
                                id="md-btn"
                                title="MD"
                                children="MD"
                                variantProperties={{ variant: 'primary', size: 'md' }}
                                onClickCallback={handleClick('md')}
                            />
                            <Button
                                id="lg-btn"
                                title="LG"
                                children="LG"
                                variantProperties={{ variant: 'primary', size: 'lg' }}
                                onClickCallback={handleClick('lg')}
                            />
                            <Button
                                id="xl-btn"
                                title="XL"
                                children="XL"
                                variantProperties={{ variant: 'primary', size: 'xl' }}
                                onClickCallback={handleClick('xl')}
                            />
                        </div>
                    </div>

                    <div>
                        <Typography as="h3" size="xl" weight="medium" className="mb-4">
                            Button States
                        </Typography>
                        <div className="flex flex-wrap gap-4">
                            <Button
                                id="normal-btn"
                                title="Normal"
                                children="Normal"
                                variantProperties={{ variant: 'primary', size: 'sm' }}
                                onClickCallback={handleClick('normal')}
                            />
                            <Button
                                id="loading-btn"
                                title="Loading"
                                children="Loading"
                                loading={true}
                                variantProperties={{ variant: 'primary', size: 'sm' }}
                                onClickCallback={handleClick('loading')}
                            />
                            <Button
                                id="disabled-btn"
                                title="Disabled"
                                children="Disabled"
                                disabled={true}
                                variantProperties={{ variant: 'primary', size: 'sm' }}
                                onClickCallback={handleClick('disabled')}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Spinner Section */}
            <section>
                <Typography as="h2" size="3xl" weight="semibold" className="mb-6">
                    Spinner Components
                </Typography>
                <div className="space-y-6">
                    <div>
                        <Typography as="h3" size="xl" weight="medium" className="mb-4">
                            Size Variants
                        </Typography>
                        <div className="flex items-center gap-8">
                            <div className="text-center">
                                <Spinner size="xs" />
                                <Typography size="xs" className="mt-2">
                                    XS
                                </Typography>
                            </div>
                            <div className="text-center">
                                <Spinner size="sm" />
                                <Typography size="xs" className="mt-2">
                                    SM
                                </Typography>
                            </div>
                            <div className="text-center">
                                <Spinner size="md" />
                                <Typography size="xs" className="mt-2">
                                    MD
                                </Typography>
                            </div>
                            <div className="text-center">
                                <Spinner size="lg" />
                                <Typography size="xs" className="mt-2">
                                    LG
                                </Typography>
                            </div>
                            <div className="text-center">
                                <Spinner size="xl" />
                                <Typography size="xs" className="mt-2">
                                    XL
                                </Typography>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Typography as="h3" size="xl" weight="medium" className="mb-4">
                            Color Variants
                        </Typography>
                        <div className="flex items-center gap-8">
                            <div className="text-center">
                                <Spinner color="primary" size="md" />
                                <Typography size="xs" className="mt-2">
                                    Primary
                                </Typography>
                            </div>
                            <div className="text-center">
                                <Spinner color="secondary" size="md" />
                                <Typography size="xs" className="mt-2">
                                    Secondary
                                </Typography>
                            </div>
                            <div className="text-center">
                                <Spinner color="success" size="md" />
                                <Typography size="xs" className="mt-2">
                                    Success
                                </Typography>
                            </div>
                            <div className="text-center">
                                <Spinner color="warning" size="md" />
                                <Typography size="xs" className="mt-2">
                                    Warning
                                </Typography>
                            </div>
                            <div className="text-center">
                                <Spinner color="danger" size="md" />
                                <Typography size="xs" className="mt-2">
                                    Danger
                                </Typography>
                            </div>
                            <div className="text-center">
                                <Spinner color="info" size="md" />
                                <Typography size="xs" className="mt-2">
                                    Info
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Switch Button Section */}
            <section>
                <Typography as="h2" size="3xl" weight="semibold" className="mb-6">
                    Switch Components
                </Typography>
                <div className="space-y-6">
                    <div>
                        <Typography as="h3" size="xl" weight="medium" className="mb-4">
                            Switch Button Variants
                        </Typography>
                        <div className="flex flex-wrap gap-6">
                            {['primary', 'secondary', 'success', 'warning', 'danger', 'info'].map(
                                (variant) => (
                                    <div key={variant} className="text-center">
                                        <SwitchButton
                                            fieldName={`switch-${variant}`}
                                            options={{
                                                orientation: 'horizontal',
                                                size: 'md',
                                                variant: variant as any
                                            }}
                                            isToggle={true}
                                            onToggle={handleToggle}
                                        />
                                        <Typography size="xs" className="mt-2 capitalize">
                                            {variant}
                                        </Typography>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    <div>
                        <Typography as="h3" size="xl" weight="medium" className="mb-4">
                            Switch Sizes
                        </Typography>
                        <div className="flex items-center gap-6">
                            {['xs', 'md', 'lg', 'xl'].map((size) => (
                                <div key={size} className="text-center">
                                    <SwitchButton
                                        fieldName={`switch-size-${size}`}
                                        options={{
                                            orientation: 'horizontal',
                                            size: size as any,
                                            variant: 'primary'
                                        }}
                                        isToggle={true}
                                        onToggle={handleToggle}
                                    />
                                    <Typography size="xs" className="mt-2">
                                        {size.toUpperCase()}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Toggle Button Section */}
            <section>
                <Typography as="h2" size="3xl" weight="semibold" className="mb-6">
                    Toggle Button Components
                </Typography>
                <div className="space-y-6">
                    <div>
                        <Typography as="h3" size="xl" weight="medium" className="mb-4">
                            Toggle Button Variants
                        </Typography>
                        <div className="flex flex-wrap gap-4">
                            {['primary', 'secondary', 'success', 'warning', 'danger', 'info'].map(
                                (variant) => (
                                    <ToggleButton
                                        key={variant}
                                        id={`toggle-${variant}`}
                                        name={`${variant} toggle`}
                                        toggle={false}
                                        size="md"
                                        variant={variant as any}
                                        onToggle={handleToggleButton}
                                    >
                                        {variant.charAt(0).toUpperCase() + variant.slice(1)}
                                    </ToggleButton>
                                )
                            )}
                        </div>
                    </div>

                    <div>
                        <Typography as="h3" size="xl" weight="medium" className="mb-4">
                            Toggle Button States
                        </Typography>
                        <div className="flex flex-wrap gap-4">
                            <ToggleButton
                                id="toggle-off"
                                name="Off state"
                                toggle={false}
                                size="md"
                                variant="primary"
                                onToggle={handleToggleButton}
                            >
                                Off
                            </ToggleButton>
                            <ToggleButton
                                id="toggle-on"
                                name="On state"
                                toggle={true}
                                size="md"
                                variant="primary"
                                onToggle={handleToggleButton}
                            >
                                On
                            </ToggleButton>
                            <ToggleButton
                                id="toggle-disabled"
                                name="Disabled"
                                toggle={false}
                                disabled={true}
                                size="md"
                                variant="primary"
                                onToggle={handleToggleButton}
                            >
                                Disabled
                            </ToggleButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* Design System Benefits Section */}
            <section>
                <Typography as="h2" size="3xl" weight="semibold" className="mb-6">
                    Design System Benefits
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <Typography as="h3" size="xl" weight="semibold" className="mb-4">
                            Consistency
                        </Typography>
                        <Typography size="base" className="mb-4">
                            Design system provides standardized sizes and scales that work
                            harmoniously together across different components.
                        </Typography>
                        <div className="flex items-center gap-2">
                            <Button
                                id="example-2"
                                title="Small"
                                children="SM"
                                variantProperties={{ variant: 'secondary', size: 'sm' }}
                                onClickCallback={handleClick('example-2')}
                            />
                            <Button
                                id="example-3"
                                title="Large"
                                children="LG"
                                variantProperties={{ variant: 'secondary', size: 'lg' }}
                                onClickCallback={handleClick('example-3')}
                            />
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                        <Typography as="h3" size="xl" weight="semibold" className="mb-4">
                            Maintainability
                        </Typography>
                        <Typography size="base" className="mb-4">
                            Changes to design tokens automatically reflect across all components,
                            making it easy to maintain and update the design system.
                        </Typography>
                        <Button
                            id="example-4"
                            title="Maintainable"
                            children="Easy Updates"
                            variantProperties={{ variant: 'success', size: 'sm' }}
                            onClickCallback={handleClick('example-4')}
                        />
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                        <Typography as="h3" size="xl" weight="semibold" className="mb-4">
                            Accessibility
                        </Typography>
                        <Typography size="base" className="mb-4">
                            Design system ensures consistent accessibility features like focus
                            states, color contrast, and keyboard navigation.
                        </Typography>
                        <Button
                            id="example-5"
                            title="Accessible"
                            children="A11y Ready"
                            variantProperties={{ variant: 'info', size: 'sm' }}
                            onClickCallback={handleClick('example-5')}
                        />
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                        <Typography as="h3" size="xl" weight="semibold" className="mb-4">
                            Scalability
                        </Typography>
                        <Typography size="base" className="mb-4">
                            Design system components can be easily extended and customized for new
                            features while maintaining consistency.
                        </Typography>
                        <div className="flex items-center gap-2">
                            <ToggleButton
                                id="scalability-toggle"
                                name="Scalability toggle"
                                toggle={true}
                                size="sm"
                                variant="primary"
                                onToggle={handleToggleButton}
                            >
                                Scalable
                            </ToggleButton>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
