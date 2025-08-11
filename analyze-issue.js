// Quick test to demonstrate the outlined button issue
// Since the actual lib functions aren't easily accessible from Node.js

console.log('=== OUTLINED BUTTON COLOR ISSUE DEMONSTRATION ===\n');

console.log('PROBLEM DESCRIPTION:');
console.log('You said: "outlined for the danger outlined the border and the text should have the background solid\'s color"');
console.log('');

console.log('CURRENT BEHAVIOR (from debug-outlined.js output):');
console.log('Primary outlined: !text-primary ← This works correctly');
console.log('Danger outlined:  !text-danger  ← This should use danger-500 color');
console.log('Success outlined: !text-success ← This should use success-500 color');
console.log('Warning outlined: !text-warning ← This should use warning-500 color');
console.log('');

console.log('CSS MAPPING CONFIRMED:');
console.log('!text-danger  → var(--color-danger-500)  (which is same as solid danger background)');
console.log('!text-success → var(--color-success-500) (which is same as solid success background)');
console.log('!text-warning → var(--color-warning-500) (which is same as solid warning background)');
console.log('');

console.log('EXPECTED BEHAVIOR:');
console.log('Outlined danger text should be the SAME COLOR as solid danger background');
console.log('');

console.log('ANALYSIS:');
console.log('Based on the CSS utilities we found, !text-danger already maps to danger-500,');
console.log('which IS the same color as the solid danger button background.');
console.log('');
console.log('POSSIBLE ISSUES:');
console.log('1. The CSS variable --color-danger-500 might not be defined correctly');
console.log('2. There might be other CSS overriding the text color');
console.log('3. The issue might be with a different color variant (not danger)');
console.log('4. The composite style system might not be applying the classes correctly');
console.log('');

console.log('NEXT STEPS:');
console.log('1. Check if the CSS is loading in the browser');
console.log('2. Inspect the actual computed colors in browser dev tools');
console.log('3. Verify the button component is using the composite style system');
console.log('4. Test with a minimal HTML example');
