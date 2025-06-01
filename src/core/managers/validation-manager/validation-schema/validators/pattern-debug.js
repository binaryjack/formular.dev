// Simple pattern verification test
console.log('🔍 Testing Actual Phone Patterns:')

// US Pattern from our validators
const usPattern = /^(\+1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/
const testNumbers = [
    '+12025551234',
    '12125551234',
    '2125551234',
    '(212) 555-1234',
    '212-555-1234',
    '+1 212 555 1234'
]

console.log('Testing US pattern:', usPattern.source)
testNumbers.forEach((num) => {
    const result = usPattern.test(num)
    console.log(`${num}: ${result ? '✅' : '❌'}`)
})

// DE Pattern
const dePattern = /^(\+49[-.\s]?)?\(?\d{3,5}\)?[-.\s]?\d{6,8}$/
const deNumbers = ['+49 30 123456', '+4930123456', '030123456', '030 123456']

console.log('\nTesting DE pattern:', dePattern.source)
deNumbers.forEach((num) => {
    const result = dePattern.test(num)
    console.log(`${num}: ${result ? '✅' : '❌'}`)
})

// CH Pattern
const chPattern = /^(\+41[-.\s]?)?\(?\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{2}[-.\s]?\d{2}$/
const chNumbers = ['+41 44 123 45 67', '+41441234567', '044 123 45 67', '0441234567']

console.log('\nTesting CH pattern:', chPattern.source)
chNumbers.forEach((num) => {
    const result = chPattern.test(num)
    console.log(`${num}: ${result ? '✅' : '❌'}`)
})
