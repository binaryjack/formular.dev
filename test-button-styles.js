// Quick test to see what generateButtonStyles returns
import { generateButtonStyles } from 'formular.design.system';

console.log('=== Button Style Tests ===');
console.log('Primary MD:', generateButtonStyles('solid', 'primary', 'md'));
console.log('Secondary LG:', generateButtonStyles('solid', 'secondary', 'lg'));
console.log('Danger SM:', generateButtonStyles('solid', 'danger', 'sm'));
console.log('Info XL:', generateButtonStyles('solid', 'info', 'xl'));
