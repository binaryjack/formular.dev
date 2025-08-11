// Test outlined button generation
import { compositeStyle, genericStyle } from './dist/index.esm.js'

console.log('🎯 Testing Outlined Button Classes...')

// Test different outlined buttons
const outlinedButtons = [
    {
        name: 'Primary Outlined',
        config: {
            componentTypes: ['button', 'typography'],
            visualVariant: 'outline',
            variant: 'primary',
            size: 'sm'
        }
    },
    {
        name: 'Danger Outlined',
        config: {
            componentTypes: ['button', 'typography'],
            visualVariant: 'outline',
            variant: 'danger',
            size: 'sm'
        }
    },
    {
        name: 'Success Outlined',
        config: {
            componentTypes: ['button', 'typography'],
            visualVariant: 'outline',
            variant: 'success',
            size: 'sm'
        }
    },
    {
        name: 'Warning Outlined',
        config: {
            componentTypes: ['button', 'typography'],
            visualVariant: 'outline',
            variant: 'warning',
            size: 'sm'
        }
    }
]

for (const button of outlinedButtons) {
    console.log(`\n📋 ${button.name}:`)
    const styles = compositeStyle(button.config)
    console.log('  Background:', styles.backgroundClasses)
    console.log('  Combined:', styles.combined)
}

// Compare with single button generation
console.log('\n🔍 Single Button Generation:')
console.log(
    'Single danger outlined:',
    genericStyle({
        componentType: 'button',
        variant: 'danger',
        visualVariant: 'outline',
        size: 'sm'
    })
)

export {}
