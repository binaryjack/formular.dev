import { genericStyle } from './packages/design-system/dist/index.esm.js';

console.log('=== Testing Button Classes Generation ===');

const testButton = genericStyle({
    componentTypes: ['button', 'typography'],
    variant: 'primary',
    visualVariant: 'solid',
    aspect: { size: 'md' }
});

console.log('Primary Solid Button:');
console.log('- Background:', testButton.backGround);
console.log('- Text:', testButton.text);
console.log('- Borders:', testButton.borders);
console.log('- States:', testButton.states);

const testButtonOutline = genericStyle({
    componentTypes: ['button', 'typography'],
    variant: 'secondary',
    visualVariant: 'outline', 
    aspect: { size: 'lg' }
});

console.log('\nSecondary Outline Button:');
console.log('- Background:', testButtonOutline.backGround);
console.log('- Text:', testButtonOutline.text);
console.log('- Borders:', testButtonOutline.borders);
