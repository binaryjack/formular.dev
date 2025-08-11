// Test the exact button configurations from main.tsx
import { compositeStyle } from './dist/index.esm.js'

console.log('🎯 Testing Button Classes from main.tsx...')

// Test the actual button configurations used in the React app
const buttons = [
    {
        name: 'Primary Solid',
        config: {
            componentTypes: ['button', 'typography'],
            visualVariant: 'solid',
            variant: 'primary',
            size: 'sm'
        }
    },
    {
        name: 'Danger Solid',
        config: {
            componentTypes: ['button', 'typography'],
            visualVariant: 'solid',
            variant: 'danger',
            size: 'sm'
        }
    },
    {
        name: 'Warning Solid',
        config: {
            componentTypes: ['button', 'typography'],
            visualVariant: 'solid',
            variant: 'warning',
            size: 'sm'
        }
    }
]

for (const button of buttons) {
    console.log(`\n📋 ${button.name}:`)
    const styles = compositeStyle(button.config)
    console.log('  Background:', styles.backgroundClasses)
    console.log('  Foreground:', styles.foregroundClasses)
    console.log('  Combined:', styles.combined)
}

export {}
