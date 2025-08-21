/**
 * Test script to verify all component presets are working
 */

// Import from the design system
import { COMPONENT_STYLE_CONFIG, genericStyle } from './packages/design-system/dist/index.esm.js'

// Test all component types
const componentTypes = [
    'button',
    'typography', 
    'input',
    'accordion',
    'card',
    'field',
    'switch',
    'checkbox',
    'radio',
    'drawer',
    'status-icon',
    'validation',
    'layout'
]

console.log('Testing component presets...\n')

// Test that all component configs exist
componentTypes.forEach(type => {
    const config = COMPONENT_STYLE_CONFIG[type]
    if (config) {
        console.log(`✅ ${type}: ${config.prefix} - ${config.defaultVariant} (${config.defaultVisualVariantType})`)
    } else {
        console.log(`❌ ${type}: Configuration missing!`)
    }
})

console.log('\nTesting genericStyle function with new components...\n')

// Test a few new components with genericStyle
const testCases = [
    { componentTypes: ['card'], variant: 'neutral' },
    { componentTypes: ['switch'], variant: 'primary' },
    { componentTypes: ['checkbox'], variant: 'success' },
    { componentTypes: ['radio'], variant: 'warning' },
    { componentTypes: ['field'], variant: 'neutral' },
    { componentTypes: ['validation'], variant: 'danger' },
    { componentTypes: ['drawer'], variant: 'neutral' },
    { componentTypes: ['status-icon'], variant: 'info' },
    { componentTypes: ['layout'], variant: 'neutral' }
]

testCases.forEach(test => {
    try {
        const classes = genericStyle(test)
        console.log(`✅ ${test.componentTypes[0]} (${test.variant}):`, classes.base)
    } catch (error) {
        console.log(`❌ ${test.componentTypes[0]} failed:`, error.message)
    }
})

console.log('\nTest completed!')
