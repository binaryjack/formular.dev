/**
 * FORMULAR - Router Configuration
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import { AppLayout } from '@components/layout/app-layout'
import { createBrowserRouter } from 'react-router-dom'
import {
    ButtonsPage,
    DemosPage,
    FormsPage,
    HomePage,
    ValidationPage
} from 'src/showcase/pages/index'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/demos',
                element: <DemosPage />
            },
            {
                path: '/validation/',
                element: <ValidationPage />
            },
            {
                path: '/forms',
                element: <FormsPage />
            },
            {
                path: '/buttons',
                element: <ButtonsPage />
            }
        ]
    }
])
