/**
 * FORMULAR - App Layout Component
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import { SmartNavigation } from '@components/navigation/smart-navigation'
import { Link, Outlet } from 'react-router-dom'

export const AppLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link to="/" className="text-xl font-bold text-gray-900">
                                FORMULAR
                            </Link>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <SmartNavigation />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    )
}
