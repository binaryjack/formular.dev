// Debug script to reproduce the genericStyle accumulation issue
import { genericStyle } from './packages/design-system/dist/index.esm.js'

console.log('=== Testing genericStyle Accumulation Issue ===');

// Simulate Button 1 being rendered
console.log('\n--- Button 1: Primary Solid MD ---');
const button1Styles = genericStyle({
    componentTypes: ['button', 'typography'],
    variant: 'primary',
    visualVariant: 'solid',
    aspect: { size: 'md' }
});
console.log('Button 1 result:', button1Styles);

// Simulate Button 2 being rendered after Button 1
console.log('\n--- Button 2: Secondary Outline LG ---');
const button2Styles = genericStyle({
    componentTypes: ['button', 'typography'], 
    variant: 'secondary',
    visualVariant: 'outline',
    aspect: { size: 'lg' }
});
console.log('Button 2 result:', button2Styles);

// Check if Button 1 styles are being affected by Button 2
console.log('\n--- Button 1 Re-rendered (should be same as first time) ---');
const button1StylesAgain = genericStyle({
    componentTypes: ['button', 'typography'],
    variant: 'primary', 
    visualVariant: 'solid',
    aspect: { size: 'md' }
});
console.log('Button 1 re-rendered result:', button1StylesAgain);

// Check if arrays are accumulating
console.log('\n--- Array Length Check ---');
console.log('Button 1 background classes:', button1Styles.backGround?.length || 'N/A');
console.log('Button 2 background classes:', button2Styles.backGround?.length || 'N/A');
console.log('Button 1 (again) background classes:', button1StylesAgain.backGround?.length || 'N/A');
