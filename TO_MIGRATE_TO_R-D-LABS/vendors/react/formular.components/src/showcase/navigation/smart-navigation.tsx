/**
 * FORMULAR - Smart Navigation Component
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import { SmartTabsVerticalContainer } from '@components/smart-tab/components/smart-tabs-vertical-container'
import { newTab } from '@components/smart-tab/helpers/new-tab'
import { ITab } from '@components/smart-tab/types/i-tab'
import { createTabManager } from '@components/smart-tab/types/i-tab-manager-mock'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export interface ISmartNavigationProps {
    className?: string
}

export const SmartNavigation = ({ className }: ISmartNavigationProps) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [selectedTabId, setSelectedTabId] = useState<string>('')

    // Define navigation tabs
    const navigationTabs: ITab[] = [
        newTab('home', 'Home', '🏠'),
        newTab('demos', 'Demos', '🎭'),
        newTab('validation', 'Validation', '✅'),
        newTab('forms', 'Forms', '📝'),
        newTab('buttons', 'Buttons', '🔘')
    ]

    // Update selected tab based on current route
    useEffect(() => {
        const currentPath = location.pathname
        let activeTabId: string

        if (currentPath === '/') {
            activeTabId = 'home'
        } else if (currentPath.startsWith('/demos')) {
            activeTabId = 'demos'
        } else if (currentPath.startsWith('/validation')) {
            activeTabId = 'validation'
        } else if (currentPath.startsWith('/forms')) {
            activeTabId = 'forms'
        } else if (currentPath.startsWith('/buttons')) {
            activeTabId = 'buttons'
        } else {
            activeTabId = 'home'
        }

        setSelectedTabId(activeTabId)
    }, [location.pathname])

    // Create tab manager with updated selected state
    const tabManager = createTabManager(
        navigationTabs.map((tab) => ({
            ...tab,
            selected: tab.id === selectedTabId
        }))
    )

    const handleTabSelected = (e: React.MouseEvent, tabId: string) => {
        const routeMap: Record<string, string> = {
            home: '/',
            demos: '/demos',
            validation: '/validation',
            forms: '/forms',
            buttons: '/buttons'
        }

        const route = routeMap[tabId]
        if (route) {
            navigate(route)
        }
    }

    return (
        <div className={className}>
            <SmartTabsVerticalContainer manager={tabManager} />
        </div>
    )
}
