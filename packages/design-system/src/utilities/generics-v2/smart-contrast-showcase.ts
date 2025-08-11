/**
 * Smart Contrast Examples - Real World Usage
 *
 * This file shows practical examples of how the new smart contrast system
 * improves the design system's usability and visual consistency.
 */

import { genericStyle } from './index'

// ===============================================
// BEFORE vs AFTER Examples
// ===============================================

console.log('🔄 BEFORE vs AFTER Smart Contrast Examples\n')

console.log('OLD SYSTEM (Poor contrast):')
console.log('❌ Primary button with primary text: btn btn-primary text-primary (INVISIBLE!)')
console.log('❌ Red button with red text: btn btn-danger text-danger (INVISIBLE!)\n')

console.log('NEW SYSTEM (Perfect contrast):')
console.log(
    '✅ Primary solid:',
    genericStyle({ componentType: 'button', variant: 'primary', visualVariant: 'solid' })
)
console.log(
    '✅ Danger solid:',
    genericStyle({ componentType: 'button', variant: 'danger', visualVariant: 'solid' })
)
console.log(
    '✅ Primary outline:',
    genericStyle({ componentType: 'button', variant: 'primary', visualVariant: 'outline' })
)
console.log(
    '✅ Danger outline:',
    genericStyle({ componentType: 'button', variant: 'danger', visualVariant: 'outline' })
)

// ===============================================
// Complete Button Set Examples
// ===============================================

console.log('\n🎨 COMPLETE BUTTON SET - All Variants with Smart Contrast:')

const variants = [
    'primary',
    'secondary',
    'info',
    'danger',
    'success',
    'warning',
    'neutral'
] as const
const visualVariants = ['solid', 'outline', 'ghost', 'link'] as const

visualVariants.forEach(visualVariant => {
    console.log(`\n📋 ${visualVariant.toUpperCase()} BUTTONS:`)
    variants.forEach(variant => {
        const classes = genericStyle({
            componentType: 'button',
            variant: variant as any,
            visualVariant: visualVariant as any
        })
        console.log(`  ${variant}: ${classes}`)
    })
})

// ===============================================
// Other Components Examples
// ===============================================

console.log('\n🏷️ BADGES (Small text needs high contrast):')
console.log(
    'Primary badge:',
    genericStyle({ componentType: 'badge', variant: 'primary', visualVariant: 'solid' })
)
console.log(
    'Warning badge:',
    genericStyle({ componentType: 'badge', variant: 'warning', visualVariant: 'solid' })
)
console.log(
    'Success outline badge:',
    genericStyle({ componentType: 'badge', variant: 'success', visualVariant: 'outline' })
)

console.log('\n🎯 CHIPS (Interactive elements):')
console.log(
    'Primary chip:',
    genericStyle({ componentType: 'chip', variant: 'primary', visualVariant: 'solid' })
)
console.log(
    'Secondary ghost chip:',
    genericStyle({ componentType: 'chip', variant: 'secondary', visualVariant: 'ghost' })
)

// ===============================================
// Typography Independence
// ===============================================

console.log('\n📝 TYPOGRAPHY INDEPENDENCE (Component != Text):')
console.log('Large primary button with small secondary text:')
const independentStyling = genericStyle({
    componentType: 'button',
    variant: 'primary', // Blue button background
    visualVariant: 'solid',
    size: 'xl', // Large button
    typography: {
        variant: 'secondary', // Gray text (overriding smart default)
        size: 'xs', // Small text
        weight: 'light' // Light text
    }
})
console.log(`  Result: ${independentStyling}`)

export {}
