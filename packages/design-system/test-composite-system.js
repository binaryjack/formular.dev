// Test composite style system from built output
import { compositeStyle, genericStyle } from './dist/index.esm.js'

console.log('🧪 Testing Composite Style System...')

// Test 1: Compare single button vs composite button+typography
console.log('\n📋 SINGLE BUTTON vs COMPOSITE:')
console.log(
    'Single button:',
    genericStyle({
        componentType: 'button',
        variant: 'primary',
        visualVariant: 'solid'
    })
)

const compositeStyles = compositeStyle({
    componentTypes: ['button', 'typography'],
    variant: 'primary',
    visualVariant: 'solid',
    size: 'md',
    typography: { variant: 'neutral', size: 'sm' }
})

console.log('\n🎯 COMPOSITE BUTTON + TYPOGRAPHY:')
console.log('Background Classes (Button):', compositeStyles.backgroundClasses)
console.log('Foreground Classes (Typography):', compositeStyles.foregroundClasses)
console.log('Interaction Classes:', compositeStyles.interactionClasses)
console.log('Combined:', compositeStyles.combined)

// Test 2: Typography override should prevent smart contrast conflicts
console.log('\n⚖️ CONFLICT RESOLUTION TEST:')
console.log('Expected: Button gets background/size, Typography gets explicit text styling')

export {}
