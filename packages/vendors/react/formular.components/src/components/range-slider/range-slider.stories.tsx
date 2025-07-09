import type { Meta, StoryObj } from '@storybook/react'
import { cx } from 'formular.design.system'
import { useState } from 'react'
import { RangeSliderRaw } from './components/range-slider.raw'

// Create a simple wrapper for demonstration purposes
const RangeSliderDemo = ({
    id,
    min = 0,
    max = 100,
    step = 1,
    initialValue = 50,
    behavior = 'snap',
    rangeFillColor = '#3b82f6', // primary-500
    handleFillColor = '#2563eb', // primary-600
    handleStyle = 'circle',
    debug = false
}: {
    id: string
    min?: number
    max?: number
    step?: number
    initialValue?: number
    behavior?: 'snap' | 'slide'
    rangeFillColor?: string
    handleFillColor?: string
    handleStyle?: 'circle' | 'thin'
    debug?: boolean
}) => {
    const [value, setValue] = useState(initialValue)

    return (
        <div className={cx('w-full')}>
            <div className={cx('mb-4')}>
                <div className={cx('flex justify-between items-center mb-2')}>
                    <span className={cx('text-sm font-medium text-secondary-700')}>
                        Value: {value}
                    </span>
                    <span className={cx('text-xs text-secondary-500')}>
                        Range: {min} - {max}
                    </span>
                </div>
                <div className={cx('h-8')}>
                    <RangeSliderRaw
                        id={id}
                        value={value}
                        min={min}
                        max={max}
                        step={step}
                        onChange={setValue}
                        behavior={behavior}
                        rangeFillColor={rangeFillColor}
                        handleFillColor={handleFillColor}
                        handleStyle={handleStyle}
                        debug={debug}
                    />
                </div>
            </div>
        </div>
    )
}

const meta: Meta<typeof RangeSliderDemo> = {
    title: 'Components/Form/RangeSlider',
    component: RangeSliderDemo,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A range slider component that allows users to select a value from a range by dragging a handle. The component supports different behavior modes and customizable styling.'
            }
        }
    },
    argTypes: {
        id: { control: 'text' },
        min: { control: 'number' },
        max: { control: 'number' },
        step: { control: 'number' },
        initialValue: { control: 'number' },
        behavior: {
            control: 'select',
            options: ['snap', 'slide']
        },
        rangeFillColor: { control: 'color' },
        handleFillColor: { control: 'color' },
        handleStyle: {
            control: 'select',
            options: ['circle', 'thin']
        },
        debug: { control: 'boolean' }
    },
    decorators: [
        (Story) => (
            <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
                <Story />
            </div>
        )
    ]
}

export default meta
type Story = StoryObj<typeof RangeSliderDemo>

// Default slider with snap behavior
export const Default: Story = {
    args: {
        id: 'default-slider',
        min: 0,
        max: 100,
        step: 1,
        initialValue: 50,
        behavior: 'snap',
        rangeFillColor: '#3b82f6',
        handleFillColor: '#2563eb',
        handleStyle: 'circle',
        debug: false
    }
}

// Slider with slide behavior
export const SlideBehavior: Story = {
    args: {
        id: 'slide-slider',
        min: 0,
        max: 100,
        step: 1,
        initialValue: 30,
        behavior: 'slide',
        rangeFillColor: '#3b82f6',
        handleFillColor: '#2563eb',
        handleStyle: 'circle',
        debug: false
    }
}

// Slider with custom steps
export const CustomSteps: Story = {
    args: {
        id: 'steps-slider',
        min: 0,
        max: 100,
        step: 10,
        initialValue: 40,
        behavior: 'snap',
        rangeFillColor: '#3b82f6',
        handleFillColor: '#2563eb',
        handleStyle: 'circle',
        debug: false
    }
}

// Slider with thin handle style
export const ThinHandleStyle: Story = {
    args: {
        id: 'thin-slider',
        min: 0,
        max: 100,
        step: 1,
        initialValue: 70,
        behavior: 'snap',
        rangeFillColor: '#3b82f6',
        handleFillColor: '#2563eb',
        handleStyle: 'thin',
        debug: false
    }
}

// Slider with custom colors
export const CustomColors: Story = {
    args: {
        id: 'custom-color-slider',
        min: 0,
        max: 100,
        step: 1,
        initialValue: 60,
        behavior: 'snap',
        rangeFillColor: '#10b981', // emerald-500
        handleFillColor: '#059669', // emerald-600
        handleStyle: 'circle',
        debug: false
    }
}

// Slider with debug mode enabled
export const DebugMode: Story = {
    args: {
        id: 'debug-slider',
        min: 0,
        max: 100,
        step: 5,
        initialValue: 25,
        behavior: 'snap',
        rangeFillColor: '#3b82f6',
        handleFillColor: '#2563eb',
        handleStyle: 'circle',
        debug: true
    }
}

// All variants in one view
export const SliderVariants: Story = {
    render: () => (
        <div className={cx('space-y-8')}>
            <div>
                <h3 className={cx('text-lg font-semibold mb-3')}>Default Slider (Snap Behavior)</h3>
                <RangeSliderDemo
                    id="default-slider-demo"
                    min={0}
                    max={100}
                    step={1}
                    initialValue={50}
                    behavior="snap"
                />
            </div>

            <div>
                <h3 className={cx('text-lg font-semibold mb-3')}>Slider with Slide Behavior</h3>
                <RangeSliderDemo
                    id="slide-slider-demo"
                    min={0}
                    max={100}
                    step={1}
                    initialValue={30}
                    behavior="slide"
                />
            </div>

            <div>
                <h3 className={cx('text-lg font-semibold mb-3')}>Slider with Custom Steps (10)</h3>
                <RangeSliderDemo
                    id="steps-slider-demo"
                    min={0}
                    max={100}
                    step={10}
                    initialValue={40}
                    behavior="snap"
                />
            </div>

            <div>
                <h3 className={cx('text-lg font-semibold mb-3')}>Slider with Thin Handle Style</h3>
                <RangeSliderDemo
                    id="thin-slider-demo"
                    min={0}
                    max={100}
                    step={1}
                    initialValue={70}
                    behavior="snap"
                    handleStyle="thin"
                />
            </div>

            <div>
                <h3 className={cx('text-lg font-semibold mb-3')}>Slider with Custom Colors</h3>
                <RangeSliderDemo
                    id="custom-color-slider-demo"
                    min={0}
                    max={100}
                    step={1}
                    initialValue={60}
                    behavior="snap"
                    rangeFillColor="#10b981"
                    handleFillColor="#059669"
                />
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded'
    }
}
