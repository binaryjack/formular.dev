/**
 * FORMULAR - Router Configuration
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import {
    ApiReferencePage,
    ArchitecturePage,
    ButtonsPage,
    CheckboxesPage,
    ColorsPage,
    ComponentsLibraryPage,
    ComponentsPage,
    ContributingPage,
    DatePickerPage,
    DemosPage,
    DesignSystemPage,
    FeaturesPage,
    FormInputsPage,
    FormsPage,
    FormularPage,
    GettingStartedPage,
    HomePage,
    IconsPage,
    NavigationPage,
    NumericInputsPage,
    OverviewPage,
    PatternsPage,
    RadiosPage,
    RoadmapPage,
    SelectsPage,
    SlidersPage,
    SmartTabsPage,
    SpacingPage,
    SwitchesPage,
    TableOfContentPage,
    TextInputsPage,
    TogglesPage,
    TypographyPage,
    ValidationPage,
    VisionPage
} from '@showcase/pages/index'
import { createBrowserRouter } from 'react-router-dom'
import { MasterPage } from './master-page'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MasterPage />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/table-of-content',
                element: <TableOfContentPage />
            },
            {
                path: '/vision',
                element: <VisionPage />
            },
            {
                path: '/features',
                element: <FeaturesPage />
            },
            {
                path: '/patterns',
                element: <PatternsPage />
            },
            {
                path: '/architecture',
                element: <ArchitecturePage />
            },
            {
                path: '/roadmap',
                element: <RoadmapPage />
            },
            {
                path: '/contributing',
                element: <ContributingPage />
            },
            {
                path: '/design-system',
                element: <DesignSystemPage />
            },
            {
                path: '/design-system/colors',
                element: <ColorsPage />
            },
            {
                path: '/design-system/typography',
                element: <TypographyPage />
            },
            {
                path: '/design-system/spacing',
                element: <SpacingPage />
            },
            {
                path: '/design-system/icons',
                element: <IconsPage />
            },
            {
                path: '/design-system/components',
                element: <ComponentsPage />
            },
            {
                path: '/formular',
                element: <FormularPage />
            },
            {
                path: '/formular/overview',
                element: <OverviewPage />
            },
            {
                path: '/formular/getting-started',
                element: <GettingStartedPage />
            },
            {
                path: '/formular/api',
                element: <ApiReferencePage />
            },
            {
                path: '/components-library',
                element: <ComponentsLibraryPage />
            },
            {
                path: '/components-library/buttons',
                element: <ButtonsPage />
            },
            {
                path: '/components-library/navigation',
                element: <NavigationPage />
            },
            {
                path: '/components-library/navigation/smart-tabs',
                element: <SmartTabsPage />
            },
            {
                path: '/components-library/form-inputs',
                element: <FormInputsPage />
            },
            {
                path: '/components-library/form-inputs/text-inputs',
                element: <TextInputsPage />
            },
            {
                path: '/components-library/form-inputs/numeric-inputs',
                element: <NumericInputsPage />
            },
            {
                path: '/components-library/form-inputs/date-picker',
                element: <DatePickerPage />
            },
            {
                path: '/components-library/form-inputs/selects',
                element: <SelectsPage />
            },
            {
                path: '/components-library/form-inputs/checkboxes',
                element: <CheckboxesPage />
            },
            {
                path: '/components-library/form-inputs/radios',
                element: <RadiosPage />
            },
            {
                path: '/components-library/form-inputs/toggles',
                element: <TogglesPage />
            },
            {
                path: '/components-library/form-inputs/switches',
                element: <SwitchesPage />
            },
            {
                path: '/components-library/form-inputs/sliders',
                element: <SlidersPage />
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
