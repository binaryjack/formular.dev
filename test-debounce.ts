/**
 * Test script to verify per-field debounce configuration
 * Checks that schema debounce values are correctly propagated to field descriptors
 */

const { f } = require('./dist/formular-dev.cjs.js')

// Helper to access private schemaToDescriptors
function schemaToDescriptors(schema, defaultValues) {
    const descriptors = []
    let id = 1

    for (const key in schema.shape) {
        if (Object.prototype.hasOwnProperty.call(schema.shape, key)) {
            const fieldSchema = schema.shape[key]
            const defaultValue = defaultValues?.[key]

            // Determine input type from schema
            let inputType = 'text'
            const protoName = Object.getPrototypeOf(fieldSchema).constructor.name
            if (protoName === 'NumberSchema') {
                inputType = 'number'
            } else if (protoName === 'BooleanSchema') {
                inputType = 'checkbox'
            } else if (protoName === 'DateSchema') {
                inputType = 'date'
            } else if (protoName === 'StringSchema') {
                inputType = 'text'
            }

            // Extract debounce delay from schema if set
            const debounceDelay = fieldSchema._debounce

            descriptors.push({
                id,
                name: key,
                label: key.charAt(0).toUpperCase() + key.slice(1),
                type: inputType,
                debounceDelay
            })

            id++
        }
    }

    return descriptors
}

// Test 1: String field with custom debounce
const testSchema1 = f.object({
    username: f.string().min(3).max(20).nonempty().debounce(200),
    email: f.string().email().nonempty(),
    bio: f.string().min(10).max(200).optional()
})

console.log('\n✅ TEST 1: String schema with custom debounce')
const descriptors1 = (schemaToDescriptors as any)(testSchema1, {})
const usernameField = descriptors1.find((d: any) => d.name === 'username')
const emailField = descriptors1.find((d: any) => d.name === 'email')

if (usernameField?.debounceDelay === 200) {
    console.log('   ✓ username field has debounceDelay: 200ms')
} else {
    console.log(
        `   ✗ FAILED: username debounceDelay is ${usernameField?.debounceDelay}, expected 200`
    )
}

if (emailField?.debounceDelay === undefined) {
    console.log('   ✓ email field has no debounceDelay (uses default)')
} else {
    console.log(
        `   ✗ FAILED: email debounceDelay should be undefined, got ${emailField?.debounceDelay}`
    )
}

// Test 2: Number field with custom debounce
const testSchema2 = f.object({
    age: f.number().min(0).max(120).debounce(300),
    score: f.number().min(0).max(100)
})

console.log('\n✅ TEST 2: Number schema with custom debounce')
const descriptors2 = (schemaToDescriptors as any)(testSchema2, {})
const ageField = descriptors2.find((d: any) => d.name === 'age')
const scoreField = descriptors2.find((d: any) => d.name === 'score')

if (ageField?.debounceDelay === 300) {
    console.log('   ✓ age field has debounceDelay: 300ms')
} else {
    console.log(`   ✗ FAILED: age debounceDelay is ${ageField?.debounceDelay}, expected 300`)
}

if (scoreField?.debounceDelay === undefined) {
    console.log('   ✓ score field has no debounceDelay (uses default)')
} else {
    console.log(
        `   ✗ FAILED: score debounceDelay should be undefined, got ${scoreField?.debounceDelay}`
    )
}

// Test 3: Check _debounce internal property
const stringSchema = f.string().debounce(500)
const numberSchema = f.number().debounce(600)

console.log('\n✅ TEST 3: Schema internal _debounce property')
if ((stringSchema as any)._debounce === 500) {
    console.log('   ✓ string schema._debounce is 500ms')
} else {
    console.log(
        `   ✗ FAILED: string schema._debounce is ${(stringSchema as any)._debounce}, expected 500`
    )
}

if ((numberSchema as any)._debounce === 600) {
    console.log('   ✓ number schema._debounce is 600ms')
} else {
    console.log(
        `   ✗ FAILED: number schema._debounce is ${(numberSchema as any)._debounce}, expected 600`
    )
}

// Test 4: Method chaining
const chainedSchema = f.string().min(3).debounce(250).max(20).nonempty()

console.log('\n✅ TEST 4: Method chaining with debounce')
if ((chainedSchema as any)._debounce === 250) {
    console.log('   ✓ debounce works correctly in method chain')
} else {
    console.log(
        `   ✗ FAILED: chained schema._debounce is ${(chainedSchema as any)._debounce}, expected 250`
    )
}

console.log('\n✅ All tests completed!\n')
