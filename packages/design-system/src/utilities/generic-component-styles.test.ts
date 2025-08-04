/**
 * Generic Component Styles Test
 *
 * Test file to verify the generic component style generator works correctly
 */

import { createComponentStyleGenerator, generateComponentStyles } from './generic-component-styles'

console.log('=== Generic Component Styles Test ===')

// Test Button Styles
console.log('\n--- Button Styles ---')
console.log(
    'Primary solid button:',
    generateComponentStyles('button', {
        visualVariant: 'solid',
        variant: 'primary',
        size: 'md'
    })
)
// Expected: "btn btn-md btn-primary"

console.log(
    'Secondary outline button:',
    generateComponentStyles('button', {
        visualVariant: 'outline',
        variant: 'secondary',
        size: 'lg'
    })
)
// Expected: "btn btn-lg btn-outline-secondary"

console.log(
    'Ghost danger button (no rounded):',
    generateComponentStyles('button', {
        visualVariant: 'ghost',
        variant: 'danger',
        size: 'sm',
        textCase: 'uppercase',
        className: 'custom-btn',
        rounded: false
    })
)
// Expected: "btn btn-sm btn-ghost-danger uppercase custom-btn rounded-none"

// Test Input Styles
console.log('\n--- Input Styles ---')
console.log(
    'Normal input:',
    generateComponentStyles('input', {
        size: 'md'
    })
)
// Expected: "input input-md"

console.log(
    'Error input:',
    generateComponentStyles('input', {
        size: 'lg',
        state: {
            error: true,
            focused: false,
            hovered: false,
            pressed: false,
            disabled: false,
            loading: false
        }
    })
)
// Expected: "input input-lg input-error"

console.log(
    'Disabled focused input:',
    generateComponentStyles('input', {
        size: 'sm',
        state: {
            disabled: true,
            focused: true,
            error: false,
            hovered: false,
            pressed: false,
            loading: false
        }
    })
)
// Expected: "input input-sm input-disabled input-focused"

// Test Card Styles
console.log('\n--- Card Styles ---')
console.log(
    'Default card:',
    generateComponentStyles('card', {
        visualVariant: 'solid'
    })
)
// Expected: "card"

console.log(
    'Elevated card:',
    generateComponentStyles('card', {
        visualVariant: 'elevated'
    })
)
// Expected: "card card-elevated"

console.log(
    'Outlined card:',
    generateComponentStyles('card', {
        visualVariant: 'outlined',
        className: 'shadow-sm'
    })
)
// Expected: "card card-outlined shadow-sm"

// Test Form Controls
console.log('\n--- Form Control Styles ---')
console.log(
    'Primary checkbox:',
    generateComponentStyles('checkbox', {
        variant: 'primary',
        size: 'md'
    })
)
// Expected: "checkbox checkbox-md checkbox-primary"

console.log(
    'Success switch:',
    generateComponentStyles('switch', {
        variant: 'success',
        size: 'lg'
    })
)
// Expected: "switch switch-lg switch-success"

console.log(
    'Danger radio:',
    generateComponentStyles('radio', {
        variant: 'danger',
        size: 'sm'
    })
)
// Expected: "radio radio-sm radio-danger"

// Test Feedback Components
console.log('\n--- Feedback Component Styles ---')
console.log(
    'Warning badge:',
    generateComponentStyles('badge', {
        visualVariant: 'solid',
        variant: 'warning',
        size: 'sm'
    })
)
// Expected: "badge badge-sm badge-warning"

console.log(
    'Info outline alert:',
    generateComponentStyles('alert', {
        visualVariant: 'outline',
        variant: 'info'
    })
)
// Expected: "alert alert-outline-info"

// Test Custom Generators
console.log('\n--- Custom Generator Test ---')
const generateMyButton = createComponentStyleGenerator('button')
const generateMyInput = createComponentStyleGenerator('input')
const generateMyCard = createComponentStyleGenerator('card')

console.log(
    'Custom button generator:',
    generateMyButton({
        visualVariant: 'outline',
        variant: 'primary',
        size: 'xl'
    })
)
// Expected: "btn btn-xl btn-outline-primary"

console.log(
    'Custom input generator:',
    generateMyInput({
        size: 'md',
        state: {
            focused: true,
            error: false,
            hovered: false,
            pressed: false,
            disabled: false,
            loading: false
        }
    })
)
// Expected: "input input-md input-focused"

console.log(
    'Custom card generator:',
    generateMyCard({
        visualVariant: 'elevated',
        className: 'transition-shadow hover:shadow-lg'
    })
)
// Expected: "card card-elevated transition-shadow hover:shadow-lg"

// Test Edge Cases
console.log('\n--- Edge Cases ---')
console.log('Empty options:', generateComponentStyles('button', {}))
// Expected: "btn btn-md btn-primary"

console.log(
    'Unknown component type:',
    generateComponentStyles('unknown' as any, {
        variant: 'primary'
    })
)
// Expected: "" (empty string with warning)

console.log(
    'Component with all features:',
    generateComponentStyles('button', {
        visualVariant: 'outline',
        variant: 'success',
        size: 'lg',
        textCase: 'uppercase',
        weight: 'bold',
        rounded: false,
        className: 'custom-class',
        state: {
            loading: true,
            disabled: false,
            error: false,
            focused: false,
            hovered: false,
            pressed: false
        }
    })
)
// Expected: "btn btn-lg btn-outline-success state-loading uppercase font-bold rounded-none custom-class"

console.log('\n=== Test Complete ===')
