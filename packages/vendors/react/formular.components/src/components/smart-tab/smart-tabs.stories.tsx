import type { Meta, StoryObj } from '@storybook/react'
import { cx } from 'formular.design.system'
import { useState } from 'react'
import { SmartTabsHorizontalContainer } from './components/smart-tabs-horizontal-container'
import { SmartTabsVerticalContainer } from './components/smart-tabs-vertical-container'
import { SmartTabsModeEnum } from './enum/smart-tabs-mode-enum'
import { ITab } from './types/i-tab'
import { createTabManager } from './types/i-tab-manager-mock'

// Sample tabs data
const sampleTabs: ITab[] = [
    {
        id: 'tab1',
        label: 'Dashboard',
        icon: '📊',
        selected: true
    },
    {
        id: 'tab2',
        label: 'Users',
        icon: '👤'
    },
    {
        id: 'tab3',
        label: 'Settings',
        icon: '⚙️'
    },
    {
        id: 'tab4',
        label: 'Reports',
        icon: '📈',
        disabled: true // Example of a disabled tab
    }
]

// Demo wrapper component
interface TabsDemoProps {
    tabs?: ITab[]
    tabMode?: SmartTabsModeEnum
}

const TabsDemo = ({ tabs = sampleTabs, tabMode = SmartTabsModeEnum.HORIZONTAL }: TabsDemoProps) => {
    const [selectedTabId, setSelectedTabId] = useState<string>(
        tabs.find((tab) => tab.selected)?.id ?? tabs[0]?.id ?? ''
    )
    // Create a new tab manager with the provided tabs and mode
    const tabManager = createTabManager([...tabs], tabMode)

    const handleTabSelected = (id: string) => {
        setSelectedTabId(id)
        tabManager.selectTab(id)
    }

    return (
        <div className={cx('w-full')}>
            <div className={cx('mb-4')}>
                {tabMode === SmartTabsModeEnum.HORIZONTAL && (
                    <SmartTabsHorizontalContainer
                        manager={tabManager}
                        onSelect={handleTabSelected}
                    />
                )}

                {tabMode === SmartTabsModeEnum.VERTICAL && (
                    <SmartTabsVerticalContainer manager={tabManager} onSelect={handleTabSelected} />
                )}
            </div>

            <div className={cx('p-4 border border-secondary-200 rounded-md bg-white')}>
                {selectedTabId ? (
                    <div>
                        <h3 className={cx('text-lg font-medium mb-2')}>
                            {tabs.find((tab) => tab.id === selectedTabId)?.label}
                        </h3>
                        <p className={cx('text-secondary-700')}>
                            Content for {tabs.find((tab) => tab.id === selectedTabId)?.label}
                        </p>
                    </div>
                ) : (
                    <div className={cx('text-secondary-500')}>No tab selected</div>
                )}
            </div>
        </div>
    )
}

const meta: Meta<typeof TabsDemo> = {
    title: 'Components/Navigation/SmartTabs',
    component: TabsDemo,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A responsive tab navigation component that adapts to different screen sizes by changing layout from horizontal to vertical or dropdown mode.'
            }
        }
    },
    argTypes: {
        tabs: { control: 'object' },
        tabMode: {
            control: 'select',
            options: Object.values(SmartTabsModeEnum)
        }
    },
    decorators: [
        (Story) => (
            <div className={cx('p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto')}>
                <Story />
            </div>
        )
    ]
}

export default meta
type Story = StoryObj<typeof TabsDemo>

// Default horizontal tabs
export const Default: Story = {
    args: {
        tabs: sampleTabs,
        tabMode: SmartTabsModeEnum.HORIZONTAL
    }
}

// Vertical tabs layout
export const VerticalTabs: Story = {
    args: {
        tabs: sampleTabs,
        tabMode: SmartTabsModeEnum.VERTICAL
    }
}

// Tabs with fewer options
export const FewerTabs: Story = {
    args: {
        tabs: sampleTabs.slice(0, 2),
        tabMode: SmartTabsModeEnum.HORIZONTAL
    }
}

// All variants in one view
export const TabVariants: Story = {
    render: () => (
        <div className={cx('space-y-10')}>
            <div>
                <h3 className={cx('text-lg font-semibold mb-3')}>Horizontal Tabs</h3>
                <TabsDemo tabs={sampleTabs} tabMode={SmartTabsModeEnum.HORIZONTAL} />
            </div>

            <div>
                <h3 className={cx('text-lg font-semibold mb-3')}>Vertical Tabs</h3>
                <TabsDemo tabs={sampleTabs} tabMode={SmartTabsModeEnum.VERTICAL} />
            </div>
        </div>
    ),
    parameters: {
        layout: 'padded'
    }
}
