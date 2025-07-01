import type { Meta, StoryObj } from '@storybook/react'

const SimpleTest = () => {
    return <div>Hello Storybook!</div>
}

const meta: Meta<typeof SimpleTest> = {
    title: 'Test/SimpleTest',
    component: SimpleTest
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
