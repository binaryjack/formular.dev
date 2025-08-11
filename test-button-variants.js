import { genericStyle } from './packages/design-system/dist/index.esm.js'

console.log('=== Typography classes for different variants ===');
['primary', 'secondary', 'success', 'warning', 'danger', 'info'].forEach(variant => {
    const result = genericStyle({
        componentTypes: ['button', 'typography'],
        variant: variant,
        visualVariant: 'solid',
        aspect: { size: 'md' }
    });
    console.log(`${variant}: text=[${result.text.join(', ')}]`);
});

console.log('\n=== Different sizes ===');
['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
    const result = genericStyle({
        componentTypes: ['button', 'typography'],
        variant: 'primary',
        visualVariant: 'solid',
        aspect: { size: size }
    });
    console.log(`${size}: text=[${result.text.join(', ')}]`);
});
