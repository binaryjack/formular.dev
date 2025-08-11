import { compositeStyle, genericStyle } from './index'

/**
 * Test Smart Text Contrast Implementation
 *
 * These examples show how the new smart contrast system works
 * with both single components and composite components
 */

console.log('🧪 Testing Smart Text Contrast...')

// Test 1: Solid buttons - should use white/contrast text
console.log('\n📋 SOLID BUTTONS (Should use white/contrast text):')
console.log(
    'Primary solid:',
    genericStyle({ componentType: 'button', variant: 'primary', visualVariant: 'solid' })
)
console.log(
    'Danger solid:',
    genericStyle({ componentType: 'button', variant: 'danger', visualVariant: 'solid' })
)

// Test 2: Outline buttons - should use colored text
console.log('\n🖼️ OUTLINE BUTTONS (Should use colored text):')
console.log(
    'Primary outline:',
    genericStyle({ componentType: 'button', variant: 'primary', visualVariant: 'outline' })
)

// Test 3: COMPOSITE BUTTON + TYPOGRAPHY (NEW!)
console.log('\n🎯 COMPOSITE BUTTON + TYPOGRAPHY (Should resolve conflicts):')
const compositeStyles = compositeStyle({
    componentTypes: ['button', 'typography'],
    variant: 'primary',
    visualVariant: 'solid',
    size: 'md',
    typography: { variant: 'neutral', size: 'sm' }
})

console.log('Background Classes (for Button):', compositeStyles.backgroundClasses)
console.log('Foreground Classes (for Typography):', compositeStyles.foregroundClasses)
console.log('Combined:', compositeStyles.combined)

// Test 4: Compare single vs composite
console.log('\n⚖️ SINGLE vs COMPOSITE COMPARISON:')
console.log(
    'Single button:',
    genericStyle({ componentType: 'button', variant: 'primary', visualVariant: 'solid' })
)
console.log('Composite background:', compositeStyles.backgroundClasses)
console.log('Composite foreground:', compositeStyles.foregroundClasses)

export {}
