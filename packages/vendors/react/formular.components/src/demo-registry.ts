/**
 * FORMULAR - Demo Registry
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 *
 * Central registry for all component demos - comment/uncomment to focus on specific components
 */

import { AccordionDemo } from './components/__v2/accordion/accordion.demo'
import { ButtonDemo } from './components/__v2/button/button.demo'
import { SpinnerDemo } from './components/__v2/spinner/spinner.demo'
// import { CheckboxInputDemo } from './components/__v2/checkbox-input/checkbox-input.demo'
import { CheckGroupInputDemo } from './components/__v2/check-group-input/check-group-input.demo'
import { DropdownDemo } from './components/__v2/dropdown/dropdown.demo'
import { RadioInputDemo } from './components/__v2/radio-input/radio-input.demo'
// import { FieldSetDemo } from './components/__v2/field-set/field-set.demo'
import { FormLayoutDemo } from './components/__v2/form-layout/form-layout.demo'
import { LabelDemo } from './components/__v2/label/label.demo'
import { SmartLayoutDemo } from './components/__v2/smart-layout/smart-layout.demo'
import { StatusIconDemo } from './components/__v2/status-icon/status-icon.demo'
import { ToggleableDemo } from './components/__v2/toggleable/toggleable.demo'
import { TypographyDemo } from './components/__v2/typography/typography.demo'

export interface IDemoEntry {
    name: string
    component: React.ComponentType
    description?: string
    category?: 'input' | 'display' | 'layout' | 'feedback' | 'navigation' | 'utility'
}

/**
 * Component Demos Registry
 *
 * To focus on a specific component:
 * 1. Comment out all other entries
 * 2. Keep only the component you're working on
 * 3. The main.tsx will render only the active demos
 */
export const componentDemos: IDemoEntry[] = [
    // Layout & Structure Components
    {
        name: 'Smart Layout',
        component: SmartLayoutDemo,
        description: 'Flexible responsive layout system',
        category: 'layout'
    },
    {
        name: 'Form Layout',
        component: FormLayoutDemo,
        description: 'Form layout component with responsive grid',
        category: 'layout'
    },

    // Input Components
    // {
    //     name: 'Checkbox Input',
    //     component: CheckboxInputDemo,
    //     description: 'Single checkbox input with label',
    //     category: 'input'
    // },
    {
        name: 'Check Group Input',
        component: CheckGroupInputDemo,
        description: 'Multiple checkbox selection group',
        category: 'input'
    },
    {
        name: 'Radio Input',
        component: RadioInputDemo,
        description: 'Single selection radio button group',
        category: 'input'
    },
    // {
    //     name: 'Field Set',
    //     component: FieldSetDemo,
    //     description: 'Form field container with label and buttons',
    //     category: 'input'
    // },

    // Interactive Components
    {
        name: 'Button',
        component: ButtonDemo,
        description: 'Interactive button with variants and states',
        category: 'input'
    },
    {
        name: 'Accordion',
        component: AccordionDemo,
        description: 'Expandable content sections',
        category: 'display'
    },
    {
        name: 'Dropdown',
        component: DropdownDemo,
        description: 'Dropdown selection menu',
        category: 'input'
    },

    // Display Components
    {
        name: 'Spinner',
        component: SpinnerDemo,
        description: 'Loading and progress indicators',
        category: 'feedback'
    },
    {
        name: 'Status Icon',
        component: StatusIconDemo,
        description: 'Status and state indicator icons',
        category: 'display'
    },

    // Typography & Text
    {
        name: 'Label',
        component: LabelDemo,
        description: 'Text labels with typography variants',
        category: 'display'
    },
    {
        name: 'Typography',
        component: TypographyDemo,
        description: 'Text styling and typography system',
        category: 'display'
    },

    // Utility Components
    {
        name: 'Toggleable',
        component: ToggleableDemo,
        description: 'Toggle state management utility',
        category: 'utility'
    }
] as const

/**
 * Get demos by category
 */
export const getDemosByCategory = (category: IDemoEntry['category']) => {
    return componentDemos.filter((demo) => demo.category === category)
}

/**
 * Get all available demo names
 */
export const getAvailableDemoNames = () => {
    return componentDemos.map((demo) => demo.name)
}

/**
 * Get demo by name
 */
export const getDemoByName = (name: string) => {
    return componentDemos.find((demo) => demo.name === name)
}
