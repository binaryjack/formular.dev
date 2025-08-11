// Debug test for genericStyle class duplication

import { genericStyle } from 'formular.design.system'

// Test simple button call
const buttonStyles = genericStyle({
    componentTypes: ['button'],
    variant: 'primary',
    aspect: { size: 'sm' }
});

console.log('Button styles:')
console.log('Background:', buttonStyles.backGround)
console.log('Text:', buttonStyles.text)
console.log('Borders:', buttonStyles.borders)
console.log('States:', Object.values(buttonStyles.states))

// Test button + typography call (like in Button component)
const buttonWithTypoStyles = genericStyle({
    componentTypes: ['button', 'typography'],
    variant: 'primary',
    aspect: { size: 'sm' }
});

console.log('\nButton + Typography styles:')
console.log('Background:', buttonWithTypoStyles.backGround)
console.log('Text:', buttonWithTypoStyles.text)
console.log('Borders:', buttonWithTypoStyles.borders)
console.log('States:', Object.values(buttonWithTypoStyles.states))

// Test input call (like in BaseInput)
const inputStyles = genericStyle({
    componentTypes: ['input'],
    variant: 'primary',
    aspect: { size: 'md' }
});

console.log('\nInput styles:')
console.log('Background:', inputStyles.backGround)
console.log('Text:', inputStyles.text)
console.log('Borders:', inputStyles.borders)
console.log('States:', Object.values(inputStyles.states))
