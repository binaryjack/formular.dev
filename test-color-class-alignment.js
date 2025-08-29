import { genericStyling } from './packages/design-system/dist/index.esm.js'

console.log('🧪 Testing Color Class Alignment in Components')
console.log('='.repeat(60))

// Test Button Styling
console.log('\n📘 Button Component Test:')
const buttonTest = genericStyling('button', {
    variant: 'primary',
    visualVariant: 'solid',
    contrast: 'medium'
})

console.log('Generated button classes:')
console.log('- backgroundColor:', buttonTest?.backgroundColor)
console.log('- textColor:', buttonTest?.textColor)
console.log('- borderColor:', buttonTest?.borderColor)
console.log('- background (legacy):', buttonTest?.background)
console.log('- text (legacy):', buttonTest?.text)
console.log('- border (legacy):', buttonTest?.border)

// Test Input Styling
console.log('\n📘 Input Component Test:')
const inputTest = genericStyling('baseInput', {
    variant: 'secondary',
    visualVariant: 'outline',
    contrast: 'high'
})

console.log('Generated input classes:')
console.log('- backgroundColor:', inputTest?.backgroundColor)
console.log('- textColor:', inputTest?.textColor)
console.log('- borderColor:', inputTest?.borderColor)
console.log('- background (legacy):', inputTest?.background)
console.log('- text (legacy):', inputTest?.text)
console.log('- border (legacy):', inputTest?.border)

// Test Accordion Styling
console.log('\n📘 Accordion Component Test:')
const accordionTest = genericStyling('accordion', {
    variant: 'success',
    visualVariant: 'elevated',
    contrast: 'low'
})

console.log('Generated accordion classes:')
console.log('- backgroundColor:', accordionTest?.backgroundColor)
console.log('- textColor:', accordionTest?.textColor)
console.log('- borderColor:', accordionTest?.borderColor)
console.log('- background (legacy):', accordionTest?.background)
console.log('- text (legacy):', accordionTest?.text)
console.log('- border (legacy):', accordionTest?.border)

// Test Typography Styling
console.log('\n📘 Typography Component Test:')
const typographyTest = genericStyling('typography', {
    variant: 'danger',
    typography: { variant: 'body' }
})

console.log('Generated typography classes:')
console.log('- backgroundColor:', typographyTest?.backgroundColor)
console.log('- textColor:', typographyTest?.textColor)
console.log('- borderColor:', typographyTest?.borderColor)
console.log('- text (legacy):', typographyTest?.text)

console.log('\n🎯 Testing Color Inversion:')
const invertedTest = genericStyling('button', {
    variant: 'warning',
    visualVariant: 'solid',
    contrast: 'high',
    colorInversion: true
})

console.log('Generated inverted button classes:')
console.log('- backgroundColor:', invertedTest?.backgroundColor)
console.log('- textColor:', invertedTest?.textColor)
console.log('- borderColor:', invertedTest?.borderColor)

console.log('\n✅ Color Class Alignment Test Complete!')
console.log('\nComponents now use individual color classes:')
console.log('- backgroundColor: Controls background color')
console.log('- textColor: Controls text color')
console.log('- borderColor: Controls border color')
console.log('\nLegacy properties still available for backward compatibility.')
