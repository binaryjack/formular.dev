import { genericStyling } from './packages/design-system/dist/index.esm.js'

console.log('🧪 Testing Background Color Class Generation')
console.log('='.repeat(60))

// Test success variant
console.log('\n📘 Success Variant Test:')
const successTest = genericStyling('button', {
    variant: 'success',
    visualVariant: 'solid',
    contrast: 'medium'
})

console.log('Generated success classes:')
console.log('- backgroundColor:', successTest?.backgroundColor)
console.log('- textColor:', successTest?.textColor)
console.log('- borderColor:', successTest?.borderColor)

// Test warning variant
console.log('\n📘 Warning Variant Test:')
const warningTest = genericStyling('button', {
    variant: 'warning',
    visualVariant: 'solid',
    contrast: 'medium'
})

console.log('Generated warning classes:')
console.log('- backgroundColor:', warningTest?.backgroundColor)
console.log('- textColor:', warningTest?.textColor)
console.log('- borderColor:', warningTest?.borderColor)

// Test danger variant
console.log('\n📘 Danger Variant Test:')
const dangerTest = genericStyling('button', {
    variant: 'danger',
    visualVariant: 'solid',
    contrast: 'medium'
})

console.log('Generated danger classes:')
console.log('- backgroundColor:', dangerTest?.backgroundColor)
console.log('- textColor:', dangerTest?.textColor)
console.log('- borderColor:', dangerTest?.borderColor)

// Test info variant
console.log('\n📘 Info Variant Test:')
const infoTest = genericStyling('button', {
    variant: 'info',
    visualVariant: 'solid',
    contrast: 'medium'
})

console.log('Generated info classes:')
console.log('- backgroundColor:', infoTest?.backgroundColor)
console.log('- textColor:', infoTest?.textColor)
console.log('- borderColor:', infoTest?.borderColor)

// Test with different contrasts to see all numbers generated
console.log('\n📘 Success with Different Contrasts:')

const successLow = genericStyling('button', {
    variant: 'success',
    visualVariant: 'solid',
    contrast: 'low'
})

const successHigh = genericStyling('button', {
    variant: 'success',
    visualVariant: 'solid',
    contrast: 'high'
})

console.log('Low contrast:', successLow?.backgroundColor)
console.log('Medium contrast:', successTest?.backgroundColor)
console.log('High contrast:', successHigh?.backgroundColor)
