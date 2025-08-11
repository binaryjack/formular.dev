// Quick test to see what genericStyle returns  
import { genericStyle } from './packages/design-system/dist/index.esm.js'

console.log('=== Button Style Tests ===');
console.log('Primary MD Solid:', genericStyle({ componentType: 'button', visualVariant: 'solid', variant: 'primary', size: 'md' }));
console.log('Primary MD Outline:', genericStyle({ componentType: 'button', visualVariant: 'outline', variant: 'primary', size: 'md' }));
console.log('Secondary LG Solid:', genericStyle({ componentType: 'button', visualVariant: 'solid', variant: 'secondary', size: 'lg' }));
console.log('Secondary LG Outline:', genericStyle({ componentType: 'button', visualVariant: 'outline', variant: 'secondary', size: 'lg' }));
