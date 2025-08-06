/**
 * Generic Style System V2 - Test Examples
 *
 * This file contains examples to test the new unified style system.
 * Run these examples to validate the V2 implementation.
 */

import { genericStyle } from './index'

console.log('🧪 Testing Generic Style System V2\n')

// ===============================================
// BUTTON TESTS
// ===============================================

console.log('🔘 BUTTON TESTS:')

// Simple button with defaults
const simpleButton = genericStyle({ componentType: 'button' })
console.log('Simple button:', simpleButton)
// Expected: "btn btn-primary btn-md text-md text-primary"

// Complex button with independent typography
const complexButton = genericStyle({
    componentType: 'button',
    visualVariant: 'outline',
    variant: 'primary',
    size: '2xl',
    typography: {
        size: '2xs',
        variant: 'secondary',
        case: 'uppercase',
        weight: 'bold'
    },
    rounded: false
})
console.log('Complex button:', complexButton)
// Expected: "btn btn-outline btn-primary btn-2xl text-2xs text-secondary uppercase font-bold rounded-none"

// Button with state
const disabledButton = genericStyle({
    componentType: 'button',
    variant: 'danger',
    state: {
        disabled: true,
        loading: false,
        error: false,
        focused: false,
        hovered: false,
        pressed: false
    }
})
console.log('Disabled button:', disabledButton)
// Expected: "btn btn-danger btn-md text-md text-danger state-disabled"

// ===============================================
// TYPOGRAPHY TESTS
// ===============================================

console.log('\n📝 TYPOGRAPHY TESTS:')

// Pure typography with defaults
const simpleTypography = genericStyle({
    componentType: 'typography',
    typography: { size: 'xl', variant: 'secondary' }
})
console.log('Simple typography:', simpleTypography)
// Expected: "text-xl text-secondary"

// Typography with all options
const complexTypography = genericStyle({
    componentType: 'typography',
    typography: {
        size: '2xl',
        variant: 'primary',
        case: 'uppercase',
        weight: 'bold'
    }
})
console.log('Complex typography:', complexTypography)
// Expected: "text-2xl text-primary uppercase font-bold"

// ===============================================
// INPUT TESTS
// ===============================================

console.log('\n📥 INPUT TESTS:')

// Simple input
const simpleInput = genericStyle({ componentType: 'input' })
console.log('Simple input:', simpleInput)
// Expected: "input input-md text-md text-primary"

// Input with error state and custom typography
const errorInput = genericStyle({
    componentType: 'input',
    size: 'lg',
    typography: { size: 'sm', variant: 'neutral' },
    state: {
        error: true,
        focused: false,
        disabled: false,
        hovered: false,
        pressed: false,
        loading: false
    }
})
console.log('Error input:', errorInput)
// Expected: "input input-lg text-sm text-neutral input-error"

// ===============================================
// EDGE CASES & VALIDATION
// ===============================================

console.log('\n⚠️ EDGE CASE TESTS:')

// Unusual size combination (should warn in dev mode)
const weirdCombination = genericStyle({
    componentType: 'button',
    size: '2xl',
    typography: { size: '2xs' }
})
console.log('Weird combination:', weirdCombination)
// Expected: Warning + "btn btn-primary btn-2xl text-2xs text-primary"

// Typography component with unsupported properties (should warn)
const invalidTypography = genericStyle({
    componentType: 'typography',
    visualVariant: 'outline', // This should be ignored/warned
    typography: { size: 'md' }
})
console.log('Invalid typography:', invalidTypography)
// Expected: Warning + "text-md text-primary"

console.log('\n✅ V2 Tests Complete!')
