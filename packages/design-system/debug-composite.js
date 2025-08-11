// Debug the composite vs single button generation
import { compositeStyle, genericStyle } from './dist/index.esm.js'

console.log('🔍 Debug: Composite vs Single Button Generation...')

// Test single button
console.log('\n📋 SINGLE BUTTON (should have smart contrast):')
const singleButton = genericStyle({
    componentType: 'button',
    variant: 'danger',
    visualVariant: 'solid',
    size: 'sm'
})
console.log('Single button classes:', singleButton)

// Test single typography
console.log('\n📋 SINGLE TYPOGRAPHY:')
const singleTypography = genericStyle({
    componentType: 'typography',
    variant: 'danger',
    size: 'sm'
})
console.log('Single typography classes:', singleTypography)

// Test composite without explicit typography settings
console.log('\n📋 COMPOSITE WITHOUT TYPOGRAPHY SETTINGS:')
const compositeNoTypo = compositeStyle({
    componentTypes: ['button', 'typography'],
    variant: 'danger',
    visualVariant: 'solid',
    size: 'sm'
    // No explicit typography settings
})
console.log('Composite background:', compositeNoTypo.backgroundClasses)
console.log('Composite foreground:', compositeNoTypo.foregroundClasses)
console.log('Composite combined:', compositeNoTypo.combined)

export {}
