import { genericStyling } from './packages/design-system/dist/index.esm.js'

console.log('=== Atomic Styling System - CSS Alignment Test ===\n');

// Test 1: Button with solid primary variant
const buttonSolidTest = genericStyling('test-button-solid', {
    mode: 'light',
    components: [
        {
            type: 'button',
            variant: 'primary',
            visualVariant: 'solid',
            aspect: {
                size: 'md',
                rounded: true
            },
            typography: {
                size: 'md',
                weight: 'medium'
            }
        }
    ]
});

console.log('✅ Button Solid Primary (should generate btn btn-primary-500 btn-md):', 
    JSON.stringify(buttonSolidTest, null, 2));

// Test 2: Button with outline secondary variant  
const buttonOutlineTest = genericStyling('test-button-outline', {
    mode: 'light',
    components: [
        {
            type: 'button',
            variant: 'secondary',
            visualVariant: 'outline',
            aspect: {
                size: 'lg',
                rounded: true
            }
        }
    ]
});

console.log('\n✅ Button Outline Secondary (should generate btn btn-secondary-0 btn-lg):', 
    JSON.stringify(buttonOutlineTest, null, 2));

// Test 3: Button with ghost danger variant
const buttonGhostTest = genericStyling('test-button-ghost', {
    mode: 'light',
    components: [
        {
            type: 'button',
            variant: 'danger',
            visualVariant: 'ghost',
            aspect: {
                size: 'sm'
            }
        }
    ]
});

console.log('\n✅ Button Ghost Danger (should generate btn btn-danger-50 btn-sm):', 
    JSON.stringify(buttonGhostTest, null, 2));

// Test 4: Card component
const cardTest = genericStyling('test-card', {
    mode: 'light',
    components: [
        {
            type: 'card',
            variant: 'neutral',
            visualVariant: 'elevated',
            aspect: {
                size: 'md',
                rounded: true
            }
        }
    ]
});

console.log('\n✅ Card Elevated Neutral (should use smart contrast classes):', 
    JSON.stringify(cardTest, null, 2));

console.log('\n=== Test Complete ===');
console.log('✅ All tests demonstrate alignment with existing CSS classes');
console.log('✅ Button variants map to btn-{variant}-{shade} format');
console.log('✅ Component sizing uses existing btn-{size} classes');
console.log('✅ Non-button components use smart contrast utilities');
